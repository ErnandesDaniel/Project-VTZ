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

// Добавляем сервисы контроллеров и эндпоинтов с настройкой сериализации JSON для обработки циклических ссылок
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve; // Для обработки циклических ссылок
    });
builder.Services.AddEndpointsApiExplorer();

// Настройка Swagger для документации
builder.Services.AddSwaggerGen(config =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    config.IncludeXmlComments(xmlPath);

    // Настройка авторизации через Bearer Token в Swagger
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

// Конфигурация JWT
builder.Services.Configure<JWTSettings>(builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JWTSettings>();
var secretKey = jwtSettings.SecretKey;
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

// Добавляем аутентификацию с использованием JWT
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

// Добавляем контекст базы данных
builder.Services.AddDbContext<ApplicationContext>(
    options => options.UseNpgsql("Host=localhost;Username=postgres;Password=1234;Database=VTZ1")
);

// Добавляем AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Регистрируем репозитории и сервисы
builder.Services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IRepository<TaskVTZ>, TaskVTZRepository>();
builder.Services.AddTransient<ITaskVTZDtoService, TaskVTZDtoService>();
builder.Services.AddTransient<ITaskVTZService, TaskVTZService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Регистрируем TaskVTZFilterService
builder.Services.AddScoped<TaskVTZFilterService>();

// Добавляем регистрацию HistoryService
builder.Services.AddScoped<HistoryService>();  // Регистрируем HistoryService

// Настроим приложение
var app = builder.Build();

// Добавление Swagger UI для разработки
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(config =>
    {
        config.RoutePrefix = "swagger";
        config.SwaggerEndpoint("/swagger/v1/swagger.json", "VTZProject API v1");
    });
}

// Применяем миграции при старте приложения
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationContext>();
        context.Database.Migrate(); // Применяем миграции
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while creating the database.");
    }
}

// Настройка пайплайна запросов
app.UseHttpsRedirection();
app.UseAuthentication();  // Использование аутентификации
app.UseAuthorization();   // Использование авторизации

app.MapControllers();  // Маршрутизация контроллеров

app.Run();  // Запуск приложения