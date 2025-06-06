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
    public class BorrowingReadRepository : ReadRepository<Borrowing>, IBorrowingReadRepository
    {
        private readonly BookGuideDbContext _context;
        public BorrowingReadRepository(BookGuideDbContext context) : base(context)
        {
            _context = context;
        }

        DbSet<Borrowing> Table => _context.Set<Borrowing>();

        public Task<List<Borrowing>> GetAdminsBorrowingsAsync()
        {
            return Table
                .Include(b => b.User)
                .Include(b => b.Book)
                .Include(b => b.Library)
                .ToListAsync();
        }

        public Task<List<Borrowing>> GetLibrariesBorrowingsAsync(Guid libraryId)
        {
            return Table
                .Include(b => b.User)
                .Include(b => b.Book)
                .Include(b => b.Library)
                .Where(b => b.LibraryId == libraryId)
                .ToListAsync();
        }

        public Task<List<Borrowing>> GetUsersBorrowingAsync(Guid userId)
        {
            return Table
                .Include(b => b.Book)
                .Include(b => b.Library)
                .Where(b => b.UserId == userId)
                .ToListAsync();
        }
    }
}
