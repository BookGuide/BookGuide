using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.ViewModel
{
    public class LibraryStockViewModel
    {
        public Guid LibraryId { get; set; }
        public string LibraryName { get; set; } = null!;
        public int TotalCount { get; set; }
        public int AvailableCount { get; set; }
    }
}
