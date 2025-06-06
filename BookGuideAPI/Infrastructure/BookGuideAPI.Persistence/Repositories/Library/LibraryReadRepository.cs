using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Domain.Entities;
using BookGuideAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        public DbSet<Library> Table => _context.Set<Library>();

        public async Task<Library> GetLibraryIdByNameAsync(string libraryName)
        {
            return await Table
                .Where(lb => lb.Name == libraryName)
                .FirstOrDefaultAsync();
        }

        public async Task<List<string>> GetLibraryNamesAsync()
        {
            return await Table
                .AsNoTracking()
                .Select(library => library.Name)
                .ToListAsync();
        }
    }
}