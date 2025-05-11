using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Persistence.Contexts
{
    public class BookGuideDbContextFactory : IDesignTimeDbContextFactory<BookGuideDbContext>
    {
        public BookGuideDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddUserSecrets<BookGuideDbContext>()
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<BookGuideDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new BookGuideDbContext(optionsBuilder.Options);
        }
    }
}
