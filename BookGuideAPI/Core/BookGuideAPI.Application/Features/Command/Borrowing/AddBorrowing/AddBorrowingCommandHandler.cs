using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Domain.Entities;
using BookGuideAPI.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookGuideAPI.Application.Features.Command.Borrowing.AddBorrowing
{
    public class AddBorrowingCommandHandler : IRequestHandler<AddBorrowingCommandRequest, AddBorrowingCommandResponse>
    {
        private readonly IBorrowingWriteRepository _borrowingWriteRepository;
        private readonly IBookReadRepository _bookReadRepository;
        private readonly IBookWriteRepository _bookWriteRepository;

        public AddBorrowingCommandHandler(
            IBorrowingWriteRepository borrowingWriteRepository,
            IBookReadRepository bookReadRepository,
            IBookWriteRepository bookWriteRepository)
        {
            _borrowingWriteRepository = borrowingWriteRepository;
            _bookReadRepository = bookReadRepository;
            _bookWriteRepository = bookWriteRepository;
        }

        public async Task<AddBorrowingCommandResponse> Handle(AddBorrowingCommandRequest request, CancellationToken cancellationToken)
        {
            var book = await _bookReadRepository.GetEntityByIdAsync(request.BookId);

            if (book == null)
            {
                return new AddBorrowingCommandResponse
                {
                    Succeeded = false,
                };
            }

            var libraryBook = book.LibraryBooks
                .FirstOrDefault(lb => lb.LibraryId == request.LibraryId);

            if (libraryBook == null)
            {
                return new AddBorrowingCommandResponse
                {
                    Succeeded = false,
                };
            }

            if (libraryBook.AvailableCount <= 0)
            {
                return new AddBorrowingCommandResponse
                {
                    Succeeded = false,
                };
            }

            libraryBook.AvailableCount -= 1;

            var borrowing = new Domain.Entities.Borrowing
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                BookId = request.BookId,
                LibraryId = request.LibraryId,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Status = Borrowing_Status.Active
            };

            await _borrowingWriteRepository.AddAsync(borrowing);
            await _bookWriteRepository.SaveChangesAsync();

            return new AddBorrowingCommandResponse
            {
                Succeeded = true,
            };
        }
    }
}
