using BookGuideAPI.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Book.AddBook
{
    public class AddBookCommandRequest : IRequest<AddBookCommandResponse>
    {
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Description { get; set; } = null!;
        public Book_Category Category { get; set; }
        public bool IsOnline { get; set; }
        public string? FileId { get; set; }
    }
}
