using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.ViewModel
{
    public class BorrowingRecordViewModel
    {
        public string Username { get; set; } = null!;
        public string BookName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = null!;
        public string LibraryName { get; set; } = null!;
    }
}
