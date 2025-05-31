using BookGuideAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.ViewModel
{
    public class BookViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Description { get; set; } = null!;
        public Book_Category Category { get; set; }
        public bool IsOnline { get; set; }

        public string? FileId { get; set; }

        public List<BookLibraryInfoViewModel> Libraries { get; set; } = new();
    }
}
