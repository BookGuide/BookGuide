using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.Services;
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
        private readonly IUserContext _userContext;
        public GetLibrariesBorrowingsQueryHandler(IBorrowingReadRepository borrowingReadRepository, IUserContext userContext)
        {
            _borrowingReadRepository = borrowingReadRepository;
            _userContext = userContext;
        }
        public async Task<GetLibrariesBorrowingsQueryResponse> Handle(GetLibrariesBorrowingsQueryRequest request, CancellationToken cancellationToken)
        {
            var libraryId = _userContext.LibraryId;
            if(libraryId == null) { return new GetLibrariesBorrowingsQueryResponse { Succeded = false }; }

            var borrowings = await _borrowingReadRepository.GetLibrariesBorrowingsAsync((Guid)libraryId);

            var borrowingViewModels = borrowings.Select(b => new BorrowingRecordViewModel
            {
                Username = b.User.Username,
                BookName = b.Book.Title,
                StartDate = b.StartDate,
                EndDate = b.EndDate,
                Status = b.Status,
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
