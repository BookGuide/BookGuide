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
    public class BookReadRepository : ReadRepository<Book>, IBookReadRepository
    {
        private BookGuideDbContext _context;
        public BookReadRepository(BookGuideDbContext context) : base(context)
        {
            _context = context;
        }

        DbSet<Book> Table => _context.Set<Book>();

        public async Task<List<Book>> GetAllBooksAsync()
        {
            return await _context.Books
                .Include(b => b.OnlineBook)
                .ToListAsync();
        }
    }
}
