using BookGuideAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.ViewModel
{
    public class BooksViewModel
    {
        public required Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string Description { get; set; }
        public required Book_Category Category { get; set; }
        public required bool Is_Online { get; set; }
    }
}
