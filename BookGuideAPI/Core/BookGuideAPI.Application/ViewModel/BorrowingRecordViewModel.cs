using BookGuideAPI.Domain.Enums;
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
        public Borrowing_Status Status { get; set; }
        public string LibraryName { get; set; } = null!;
    }
}
