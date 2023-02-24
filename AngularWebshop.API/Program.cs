using AngularWebshop.API.DbContexts;
using AngularWebshop.API.Services;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace AngularWebshop.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Configuring serilog to log into console and into a file
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.Console()
                .WriteTo.File("logs/angularwebshop.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();

            var builder = WebApplication.CreateBuilder(args);

            builder.Host.UseSerilog();

            // Added support for xml (application/xml)
            // default is json
            builder.Services.AddControllers(options => {
                options.ReturnHttpNotAcceptable = true;
            }).AddNewtonsoftJson()
            .AddXmlDataContractSerializerFormatters();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSingleton<FileExtensionContentTypeProvider>();

            //transient for lightweight and stateless services
            #if DEBUG
            builder.Services.AddTransient<IMailService, LocalMailService>();
            #else
            builder.Services.AddTransient<IMailService, CloudMailService>();
            #endif

            //registering dbcontext
            builder.Services.AddDbContext<AngularWebshopContext>(
                dbContextOptions => dbContextOptions.UseSqlite(
                    builder.Configuration["ConnectionStrings:AngularWebshopDBConnectionString"]));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Run();
        }
    }
}