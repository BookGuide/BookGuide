using BookGuideAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Entities
{
    public class Library : BaseEntity
    {
        public required string Name { get; set; }
        public required string Address { get; set; }

        public ICollection<LibraryBook> LibraryBooks { get; set; }
        public ICollection<Borrowing> Borrowings { get; set; }
    }
}
