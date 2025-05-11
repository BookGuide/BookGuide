using BookGuideAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Entities
{
    public class Book : BaseEntity
    {
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string Description { get; set; }
        public required Book_Category Category { get; set; }
        public required bool Is_Online { get; set; }

        public ICollection<LibraryBook> LibraryBooks { get; set; }
        public ICollection<Borrowing> Borrowings { get; set; }
        public OnlineBook OnlineBook { get; set; }
    }
}
