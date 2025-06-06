using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Book.AddBook
{
    public class AddBookCommandHandler : IRequestHandler<AddBookCommandRequest, AddBookCommandResponse>
    {
        private readonly IBookWriteRepository _bookWriteRepository;

        public AddBookCommandHandler(IBookWriteRepository bookWriteRepository)
        {
            _bookWriteRepository = bookWriteRepository;
        }

        public async Task<AddBookCommandResponse> Handle(AddBookCommandRequest request, CancellationToken cancellationToken)
        {
            var book = new Domain.Entities.Book
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Author = request.Author,
                Description = request.Description,
                Category = request.Category,
                IsOnline = request.IsOnline,
                LibraryBooks = new List<Domain.Entities.LibraryBook>(),
                Borrowings = new List<Domain.Entities.Borrowing>()
            };

            if (request.IsOnline && !string.IsNullOrEmpty(request.FileId))
            {
                book.OnlineBook = new OnlineBook
                {
                    Id = Guid.NewGuid(),
                    BookId = book.Id,
                    FileId = request.FileId
                };
            }

            await _bookWriteRepository.AddAsync(book);
            await _bookWriteRepository.SaveChangesAsync();

            return new AddBookCommandResponse
            {
                Succeeded = true,
            };
        }
    }
}
