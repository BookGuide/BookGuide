using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Borrowing.GetAllBorrowings
{
    public class GetAllBorrowingsQueryHandler : IRequestHandler<GetAllBorrowingsQueryRequest, GetAllBorrowingsQueryResponse>
    {
        private readonly IBorrowingReadRepository _borrowingReadRepository;

        public GetAllBorrowingsQueryHandler(IBorrowingReadRepository borrowingReadRepository)
        {
            _borrowingReadRepository = borrowingReadRepository;
        }

        public async Task<GetAllBorrowingsQueryResponse> Handle(GetAllBorrowingsQueryRequest request, CancellationToken cancellationToken)
        {
            var borrowings = await _borrowingReadRepository.GetAdminsBorrowingsAsync();

            if (borrowings == null || !borrowings.Any())
            {
                return new GetAllBorrowingsQueryResponse
                {
                    Succeeded = false,
                    Borrowings = new List<BorrowingRecordViewModel>()
                };
            }

            var borrowingViewModels = borrowings.Select(b => new BorrowingRecordViewModel
            {
                Username = b.User.Username, 
                BookName = b.Book.Title,
                StartDate = b.StartDate,
                EndDate = b.EndDate,
                Status = b.Status,
                LibraryName = b.Library.Name
            }).ToList();

            return new GetAllBorrowingsQueryResponse
            {
                Succeeded = true,
                Borrowings = borrowingViewModels
            };
        }
    }
}
