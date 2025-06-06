using BookGuideAPI.Domain.Entities.Common;
using BookGuideAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Entities
{
    public class Book : BaseEntity
    {
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Description { get; set; } = null!;
        public Book_Category Category { get; set; }
        public bool IsOnline { get; set; }

        public ICollection<LibraryBook> LibraryBooks { get; set; } = new List<LibraryBook>();
        public ICollection<Borrowing> Borrowings { get; set; } = new List<Borrowing>();
        public OnlineBook? OnlineBook { get; set; }
    }
}
