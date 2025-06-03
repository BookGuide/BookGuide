using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Borrowing.GetUsersBorrowing
{
    public class GetUsersBorrowingQueryHandler : IRequestHandler<GetUsersBorrowingQueryRequest, GetUsersBorrowingQueryResponse>
    {
        private readonly IBorrowingReadRepository _borrowingReadRepository;

        public GetUsersBorrowingQueryHandler(IBorrowingReadRepository borrowingReadRepository)
        {
            _borrowingReadRepository = borrowingReadRepository;
        }

        public async Task<GetUsersBorrowingQueryResponse> Handle(GetUsersBorrowingQueryRequest request, CancellationToken cancellationToken)
        {
            var userId = Guid.NewGuid(); // TODO: replace with actual userId

            var borrowings = await _borrowingReadRepository.GetUsersBorrowingAsync(userId);

            var borrowingViewModels = borrowings.Select(b => new BorrowingViewModel
            {
                BookName = b.Book.Title,
                LibraryName = b.Library.Name,
                StartDate = b.StartDate,
                EndDate = b.EndDate,
                Status = b.Status
            }).ToList();

            return new GetUsersBorrowingQueryResponse
            {
                Borrowings = borrowingViewModels,
                Succeeded = true,
            };
        }
    }
}
