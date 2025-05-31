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
    public class UserReadRepository : ReadRepository<User>, IUserReadRepository
    {
        private readonly BookGuideDbContext _context;
        public UserReadRepository(BookGuideDbContext context) : base(context)
        {
            _context = context;
        }

        public DbSet<User> Table => _context.Set<User>();

        public async Task<User> CheckLoginCredentialsAsync(string username, string hashedPassword)
        {
            return await Table.FirstOrDefaultAsync(u => u.Username == username && u.HashedPassword == hashedPassword);
        }

        public async Task<bool> ChechkUsernameAndEmailAsync(string username, string email)
        {
            return await Table.AnyAsync(u => u.Username == username || u.Email == email);
        }
    }
}
