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
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;

        public ICollection<LibraryBook> LibraryBooks { get; set; } = new List<LibraryBook>();
        public ICollection<Borrowing> Borrowings { get; set; } = new List<Borrowing>();
    }
}
