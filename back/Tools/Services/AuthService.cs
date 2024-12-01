using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VTZProject.Backend.BD;
using VTZProject.Backend.Models;

namespace VTZProject.Backend.Tools.Services
{
    public class AuthService : IAuthService
    {
        private readonly JWTSettings _jwtSettings;
        private readonly ApplicationContext _context;

        public AuthService(IOptions<JWTSettings> jwtSettings, ApplicationContext context)
        {
            _jwtSettings = jwtSettings.Value;
            _context = context;
        }

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            var user = await _context.Admins
                .FirstOrDefaultAsync(u => u.Login == username);

            if (user == null || user.HashPassword != password)
            {
                throw new UnauthorizedAccessException("Invalid username or password");
            }

            return GenerateJwtToken(user);  
        }

        private string GenerateJwtToken(Admins user)
        {
            if (string.IsNullOrEmpty(_jwtSettings.SecretKey))
            {
                throw new InvalidOperationException("JWT SecretKey is not configured.");
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: new[]
                {
                new Claim(ClaimTypes.Name, user.Login),  // Используем user.Login
                new Claim("AdminId", user.Id.ToString())  // Используем user.Id
                },
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}