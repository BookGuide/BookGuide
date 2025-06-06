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
    public class LibraryBookReadRepository : ReadRepository<LibraryBook>, ILibraryBookReadRepository
    {
        private readonly BookGuideDbContext _context;
        public LibraryBookReadRepository(BookGuideDbContext context) : base(context)
        {
            _context = context;
        }

        public DbSet<LibraryBook> Table => _context.Set<LibraryBook>();

        public async Task<bool> ExistsAsync(Guid bookId, Guid libraryId)
        {
            return await Table
                .AnyAsync(lb => lb.BookId == bookId && lb.LibraryId == libraryId);
        }

        public async Task<List<LibraryBook>> GetBooksByLibraryIdAsync(Guid libraryId)
        {
            return await _context.LibraryBooks
                .Include(lb => lb.Book)
                .Where(lb => lb.LibraryId == libraryId)
                .ToListAsync();
        }
    }
}
