using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Domain.Entities;
using BookGuideAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Persistence.Repositories
{
    public class LibraryReadRepository : ReadRepository<Library>, ILibraryReadRepository
    {
        private BookGuideDbContext _context;
        public LibraryReadRepository(BookGuideDbContext context) : base(context)
        {
            _context = context;
        }

        DbSet<Library> Table => _context.Set<Library>();

        public Task<Guid> GetLibraryIdByNameAsync(string LibraryName)
        {
            return Table
                .Where(l => l.Name == LibraryName)
                .Select(l => l.Id)
                .FirstOrDefaultAsync();
        }
    }
}
