using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using VTZProject.Backend.BD;
using VTZProject.Backend.Models;
using VTZProject.Backend.Repositories;
using VTZProject.Backend.Tools.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using VTZProject.Backend.Models.DTO;
using VTZProject.Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// ��������� ������� ������������ � ���������� � ���������� ������������ JSON ��� ��������� ����������� ������
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve; // ��� ��������� ����������� ������
    });
builder.Services.AddEndpointsApiExplorer();

// ��������� Swagger ��� ������������
builder.Services.AddSwaggerGen(config =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    config.IncludeXmlComments(xmlPath);

    // ��������� ����������� ����� Bearer Token � Swagger
    config.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter Bearer token",
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    config.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// ������������ JWT
builder.Services.Configure<JWTSettings>(builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JWTSettings>();
var secretKey = jwtSettings.SecretKey;
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

// ��������� �������������� � �������������� JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = signingKey
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

// ��������� �������� ���� ������
builder.Services.AddDbContext<ApplicationContext>(
    options => options.UseNpgsql("Host=vtz-db-postgres;Username=postgres;Password=1331;Database=postgres")
);

// ��������� AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// ������������ ����������� � �������
builder.Services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IRepository<TaskVTZ>, TaskVTZRepository>();
builder.Services.AddTransient<ITaskVTZDtoService, TaskVTZDtoService>();
builder.Services.AddTransient<ITaskVTZService, TaskVTZService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// ������������ TaskVTZFilterService
builder.Services.AddScoped<TaskVTZFilterService>();

// ��������� ����������� HistoryService
builder.Services.AddScoped<HistoryService>();  // ������������ HistoryService

// �������� ����������
var app = builder.Build();

// ���������� Swagger UI ��� ����������
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(config =>
    {
        config.RoutePrefix = "swagger";
        config.SwaggerEndpoint("/swagger/v1/swagger.json", "VTZProject API v1");
    });
}

// ��������� �������� ��� ������ ����������
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationContext>();
        //context.Database.Migrate(); // ��������� ��������
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while creating the database.");
    }
}

//��������� � CORS-�������� ��� �������
app.UseCors("AllowAll");

// ��������� ��������� ��������
app.UseHttpsRedirection();
app.UseAuthentication();  // ������������� ��������������
app.UseAuthorization();   // ������������� �����������

app.MapControllers();  // ������������� ������������

app.Run();  // ������ ����������