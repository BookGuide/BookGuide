using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Helper
{
    public class HashPassword
    {
        public Task<string> HashPasswordAsync(string password)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return Task.FromResult(hashedPassword);
        }

        public Task<bool> VerifyPasswordAsync(string password, string hashedPassword)
        {
            bool isValid = BCrypt.Net.BCrypt.Verify(password, hashedPassword);
            return Task.FromResult(isValid);
        }
    }
}
