using BookGuideAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.ViewModel
{
    public class LibraryBookWithBorrowingsViewModel
    {
        public Guid BookId { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Description { get; set; } = null!;
        public Book_Category Category { get; set; }
        public bool IsOnline { get; set; }
        public string? FileId { get; set; }

        public LibraryStockViewModel Stock { get; set; } = null!;
        public List<BookBorrowingRecordViewModel> Borrowings { get; set; } = new();
    }
}
