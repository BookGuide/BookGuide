using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Book.GetBooks
{
    public class GetBooksQueryHandler : IRequestHandler<GetBooksQueryRequest, GetBooksQueryResponse>
    {
        private readonly IBookReadRepository _bookReadRepository;
        public GetBooksQueryHandler(IBookReadRepository bookReadRepository)
        {
            _bookReadRepository = bookReadRepository;
        }
        public async Task<GetBooksQueryResponse> Handle(GetBooksQueryRequest request, CancellationToken cancellationToken)
        {
            var books = await _bookReadRepository.GetAllBooksAsync();

            if (books == null || !books.Any())
            {
                return new GetBooksQueryResponse
                {
                    Succeeded = false,
                };
            }

            var bookViewModels = books.Select(book => new BooksViewModel
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                Category = book.Category,
                Is_Online = book.IsOnline,
                FileId = book.IsOnline && book.OnlineBook != null ? book.OnlineBook.FileId : null
            }).ToList();


            return new GetBooksQueryResponse
            {
                Succeeded = true,
                Books = bookViewModels
            };
        }

    }
}
