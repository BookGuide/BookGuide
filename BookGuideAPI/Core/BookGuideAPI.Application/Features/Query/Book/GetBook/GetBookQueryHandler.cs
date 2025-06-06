using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookGuideAPI.Application.Features.Query.Book.GetBook
{
    public class GetBookQueryHandler : IRequestHandler<GetBookQueryRequest, GetBookQueryResponse>
    {
        private readonly IBookReadRepository _bookReadRepository;

        public GetBookQueryHandler(IBookReadRepository bookReadRepository)
        {
            _bookReadRepository = bookReadRepository;
        }

        public async Task<GetBookQueryResponse> Handle(GetBookQueryRequest request, CancellationToken cancellationToken)
        {
            var book = await _bookReadRepository.GetBookWithRelationsByIdAsync(request.BookId);


            if (book == null)
            {
                return new GetBookQueryResponse
                {
                    Succeeded = false,
                };
            }

            var viewModel = new BookViewModel
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                Category = book.Category,
                IsOnline = book.IsOnline,
                FileId = book.OnlineBook?.FileId,
                Libraries = book.LibraryBooks.Select(lb => new BookLibraryInfoViewModel
                {
                    LibraryId = lb.Library.Id,
                    LibraryName = lb.Library.Name,
                    LibraryAddress = lb.Library.Address,
                    AvailableCount = lb.AvailableCount
                }).ToList()
            };

            return new GetBookQueryResponse
            {
                Succeeded = true,
                BookInfo = viewModel
            };
        }
    }
}
