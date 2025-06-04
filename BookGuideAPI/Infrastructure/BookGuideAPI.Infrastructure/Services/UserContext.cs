using BookGuideAPI.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Infrastructure.Services
{
    public class UserContext : IUserContext
    {
        public Guid? UserId { get; set; }
        public string? Username { get; set; }
        public string? Role { get; set; }
        public Guid? LibraryId { get; set; }
    }
}
