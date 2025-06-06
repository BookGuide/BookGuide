using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Persistence.Contexts;
using BookGuideAPI.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Persistence
{
    public static class ServiceRegistiration
    {
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddUserSecrets<BookGuideDbContextFactory>()
                .Build();

            services.AddDbContext<BookGuideDbContext>(options => options.UseSqlServer("Server=my-mssql,1433;Database=BookGuide;User Id=sa;Password=Sifre0134;TrustServerCertificate=True"), ServiceLifetime.Scoped);


            services.AddScoped<IUserReadRepository, UserReadRepository>();
            services.AddScoped<IUserWriteRepository, UserWriteRepository>();

            services.AddScoped<IBookReadRepository, BookReadRepository>();
            services.AddScoped<IBookWriteRepository, BookWriteRepository>();

            services.AddScoped<IBorrowingReadRepository, BorrowingReadRepository>();
            services.AddScoped<IBorrowingWriteRepository, BorrowingWriteRepository>();

            services.AddScoped<ILibraryReadRepository, LibraryReadRepository>();
            services.AddScoped<ILibraryWriteRepository, LibraryWriteRepository>();

            services.AddScoped<ILibraryBookReadRepository, LibraryBookReadRepository>();
            services.AddScoped<ILibraryBookWriteRepository, LibraryBookWriteRepository>();

            services.AddScoped<IOnlineBookReadRepository, OnlineBookReadRepository>();
            services.AddScoped<IOnlineBookWriteRepository, OnlineBookWriteRepository>();


        }
    }
}
