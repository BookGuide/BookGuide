using BookGuideAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Entities
{
    public class User : BaseEntity
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string HashedPassword { get; set; }
        public required User_Role Role { get; set; }

        public ICollection<Borrowing> Borrowings { get; set; }
    }
}
