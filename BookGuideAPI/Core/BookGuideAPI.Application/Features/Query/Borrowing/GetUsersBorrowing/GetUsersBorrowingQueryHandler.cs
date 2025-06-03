using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.Services;
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
        private readonly IUserContext _userContext;

        public GetUsersBorrowingQueryHandler(IBorrowingReadRepository borrowingReadRepository, IUserContext userContext)
        {
            _borrowingReadRepository = borrowingReadRepository;
            _userContext = userContext;
        }

        public async Task<GetUsersBorrowingQueryResponse> Handle(GetUsersBorrowingQueryRequest request, CancellationToken cancellationToken)
        {
            var userId = _userContext.UserId;

            if (userId == null) return new GetUsersBorrowingQueryResponse { Succeeded = false };

            var borrowings = await _borrowingReadRepository.GetUsersBorrowingAsync((Guid)userId);

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
