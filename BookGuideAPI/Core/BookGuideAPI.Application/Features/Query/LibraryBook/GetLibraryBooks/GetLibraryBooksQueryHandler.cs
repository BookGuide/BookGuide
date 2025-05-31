using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookGuideAPI.Application.Features.Query.LibraryBook.GetLibraryBooks
{
    public class GetLibraryBooksQueryHandler : IRequestHandler<GetLibraryBooksQueryRequest, GetLibraryBooksQueryResponse>
    {
        private readonly ILibraryBookReadRepository _libraryBookReadRepository;

        public GetLibraryBooksQueryHandler(ILibraryBookReadRepository libraryBookReadRepository)
        {
            _libraryBookReadRepository = libraryBookReadRepository;
        }

        public async Task<GetLibraryBooksQueryResponse> Handle(GetLibraryBooksQueryRequest request, CancellationToken cancellationToken)
        {
            var libraryBooks = await _libraryBookReadRepository.GetBooksByLibraryIdAsync(request.LibraryId);

            var viewModels = libraryBooks.Select(lb => new LibraryBookInventoryViewModel
            {
                LibraryBookId = lb.Id,
                BookId = lb.BookId,
                Title = lb.Book.Title,
                Author = lb.Book.Author,
                Category = lb.Book.Category.ToString(),
                TotalCount = lb.TotalCount,
                AvailableCount = lb.AvailableCount
            }).ToList();

            return new GetLibraryBooksQueryResponse
            {
                Succeeded = true,
                Books = viewModels
            };
        }
    }
}
