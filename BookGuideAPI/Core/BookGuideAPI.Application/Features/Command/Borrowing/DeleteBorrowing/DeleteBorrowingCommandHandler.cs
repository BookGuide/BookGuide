using BookGuideAPI.Application.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Borrowing.DeleteBorrowing
{
    public class DeleteBorrowingCommandHandler : IRequestHandler<DeleteBorrowingCommandRequest, DeleteBorrowingCommandResponse>
    {
        private readonly IBorrowingReadRepository _borrowingReadRepository;
        private readonly IBorrowingWriteRepository _borrowingWriteRepository;
        private readonly ILibraryBookReadRepository _libraryBookReadRepository;
        private readonly ILibraryBookWriteRepository _libraryBookWriteRepository;

        public DeleteBorrowingCommandHandler(
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

        public async Task<DeleteBorrowingCommandResponse> Handle(DeleteBorrowingCommandRequest request, CancellationToken cancellationToken)
        {
            var borrowing = await _borrowingReadRepository.GetEntityByIdAsync(request.Id);
            if (borrowing == null)
            {
                return new DeleteBorrowingCommandResponse
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

            await _borrowingWriteRepository.DeleteAsync(borrowing.Id);
            await _borrowingWriteRepository.SaveChangesAsync();

            return new DeleteBorrowingCommandResponse
            {
                Succeeded = true,
            };
        }
    }
}
