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

            var connectionString = "Server=my-mssql,1433;Database=BookGuide;User Id=sa;Password=Sifre0134;TrustServerCertificate=True";

            var optionsBuilder = new DbContextOptionsBuilder<BookGuideDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new BookGuideDbContext(optionsBuilder.Options);
        }
    }
}
