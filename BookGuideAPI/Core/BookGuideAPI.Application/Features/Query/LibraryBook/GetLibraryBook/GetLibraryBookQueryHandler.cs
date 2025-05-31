using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookGuideAPI.Application.Features.Query.LibraryBook.GetLibraryBook
{
    public class GetLibraryBookQueryHandler : IRequestHandler<GetLibraryBookQueryRequest, GetLibraryBookQueryResponse>
    {
        private readonly ILibraryBookReadRepository _libraryBookReadRepository;

        public GetLibraryBookQueryHandler(ILibraryBookReadRepository libraryBookReadRepository)
        {
            _libraryBookReadRepository = libraryBookReadRepository;
        }

        public async Task<GetLibraryBookQueryResponse> Handle(GetLibraryBookQueryRequest request, CancellationToken cancellationToken)
        {
            var libraryBook = await _libraryBookReadRepository.GetEntityByIdAsync(request.LibraryBookId);

            if (libraryBook == null)
            {
                return new GetLibraryBookQueryResponse
                {
                    Succeeded = false,
                };
            }

            var book = libraryBook.Book;

            var result = new LibraryBookWithBorrowingsViewModel
            {
                BookId = book.Id,
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                Category = book.Category,
                IsOnline = book.IsOnline,
                FileId = book.OnlineBook?.FileId,
                Stock = new LibraryStockViewModel
                {
                    LibraryId = libraryBook.LibraryId,
                    LibraryName = libraryBook.Library.Name,
                    TotalCount = libraryBook.TotalCount,
                    AvailableCount = libraryBook.AvailableCount
                },
                Borrowings = book.Borrowings
                    .Where(br => br.LibraryId == libraryBook.LibraryId && br.BookId == libraryBook.BookId)
                    .Select(br => new BookBorrowingRecordViewModel
                    {
                        UserId = br.UserId,
                        Username = br.User.Username,
                        StartDate = br.StartDate,
                        EndDate = br.EndDate,
                        Status = br.Status.ToString(),
                        LibraryName = br.Library.Name
                    }).ToList()
            };

            return new GetLibraryBookQueryResponse
            {
                Succeeded = true,
                Book = result
            };
        }
    }
}
