using BookGuideAPI.Application.Repositories;
using MediatR;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Borrowing.DeleteBorrowing
{
    public class UpdateBorrowingCommandHandler : IRequestHandler<UpdateBorrowingCommandRequest, UpdateBorrowingCommandResponse>
    {
        private readonly IBorrowingReadRepository _borrowingReadRepository;
        private readonly IBorrowingWriteRepository _borrowingWriteRepository;
        private readonly ILibraryBookReadRepository _libraryBookReadRepository;
        private readonly ILibraryBookWriteRepository _libraryBookWriteRepository;

        public UpdateBorrowingCommandHandler(
            IBorrowingWriteRepository borrowingWriteRepository,
            IBorrowingReadRepository borrowingReadRepository,
            ILibraryBookReadRepository libraryBookReadRepository,
            ILibraryBookWriteRepository libraryBookWriteRepository)
        {
            _borrowingWriteRepository = borrowingWriteRepository;
            _borrowingReadRepository = borrowingReadRepository;
            _libraryBookReadRepository = libraryBookReadRepository;
            _libraryBookWriteRepository = libraryBookWriteRepository;
        }

        public async Task<UpdateBorrowingCommandResponse> Handle(UpdateBorrowingCommandRequest request, CancellationToken cancellationToken)
        {
            var borrowing = await _borrowingReadRepository.GetEntityByIdAsync(request.Id);
            if (borrowing == null)
            {
                return new UpdateBorrowingCommandResponse
                {
                    Succeeded = false,
                };
            }

            var libraryBook = await _libraryBookReadRepository.Table
                .FirstOrDefaultAsync(lb => lb.BookId == borrowing.BookId && lb.LibraryId == borrowing.LibraryId, cancellationToken);

            if (libraryBook != null)
            {
                libraryBook.AvailableCount += 1;
                await _libraryBookWriteRepository.SaveChangesAsync();
            }

            borrowing.Status = Domain.Enums.Borrowing_Status.Completed;

            await _borrowingWriteRepository.UpdateAsync(borrowing);
            await _borrowingWriteRepository.SaveChangesAsync();

            return new UpdateBorrowingCommandResponse
            {
                Succeeded = true,
            };
        }
    }
}
