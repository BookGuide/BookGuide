using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Domain.Entities.Common;
using BookGuideAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        private readonly BookGuideDbContext _context;

        public ReadRepository(BookGuideDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public async Task<ICollection<T>> GetAllAsync() => await Table.ToListAsync();

        public async Task<T> GetEntityByIdAsync(Guid id) => await Table.FindAsync(id);
    }
}
