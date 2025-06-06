using BookGuideAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Repositories
{
    public interface IUserReadRepository : IReadRepository<User>
    {
        public Task<User> CheckLoginCredentialsAsync(string username);
        public Task<bool> ChechkUsernameAndEmailAsync(string username, string email);
    }
}
