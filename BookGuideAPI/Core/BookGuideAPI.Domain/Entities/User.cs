using BookGuideAPI.Domain.Entities.Common;
using BookGuideAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string HashedPassword { get; set; } = null!;
        public User_Role Role { get; set; }

        public Guid? LibraryId { get; set; }
        public Library? Library { get; set; }

        public ICollection<Borrowing> Borrowings { get; set; } = new List<Borrowing>();
    }

}
