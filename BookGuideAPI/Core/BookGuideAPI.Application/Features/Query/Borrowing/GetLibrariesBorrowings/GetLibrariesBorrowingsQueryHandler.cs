using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Borrowing.GetLibrariesBorrowings
{
    public class GetLibrariesBorrowingsQueryHandler : IRequestHandler<GetLibrariesBorrowingsQueryRequest, GetLibrariesBorrowingsQueryResponse>
    {
        private readonly IBorrowingReadRepository _borrowingReadRepository;
        public GetLibrariesBorrowingsQueryHandler(IBorrowingReadRepository borrowingReadRepository)
        {
            _borrowingReadRepository = borrowingReadRepository;
        }
        public async Task<GetLibrariesBorrowingsQueryResponse> Handle(GetLibrariesBorrowingsQueryRequest request, CancellationToken cancellationToken)
        {
            var libraryId = Guid.NewGuid();// TODO : Take This From Token

            var borrowings = await _borrowingReadRepository.GetLibrariesBorrowingsAsync(libraryId);

            var borrowingViewModels = borrowings.Select(b => new BorrowingRecordViewModel
            {
                Username = b.User.Username,
                BookName = b.Book.Title,
                StartDate = b.StartDate,
                EndDate = b.EndDate,
                Status = b.Status.ToString(),
                LibraryName = b.Library.Name
            }).ToList();

            return new GetLibrariesBorrowingsQueryResponse
            {
                Borrowings = borrowingViewModels,
                Succeded = true,
            };
        }
    }
}
