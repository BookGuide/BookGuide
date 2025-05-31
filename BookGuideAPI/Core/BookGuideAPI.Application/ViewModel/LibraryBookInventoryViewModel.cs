using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.ViewModel
{
    public class LibraryBookInventoryViewModel
    {
        public Guid LibraryBookId { get; set; }
        public Guid BookId { get; set; }

        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Category { get; set; } = null!;

        public int TotalCount { get; set; }
        public int AvailableCount { get; set; }
    }

}
