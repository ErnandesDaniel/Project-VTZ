namespace VTZProject.Backend.Tools.Services
{
    public interface IAuthService
    {
        Task<string> AuthenticateAsync(string username, string password);
    }
}
