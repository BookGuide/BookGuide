using BookGuideAPI.Application.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.LibraryBook.UpdateLibraryBook
{
    public class UpdateLibraryBookCommandHandler : IRequestHandler<UpdateLibraryBookCommandRequest, UpdateLibraryBookCommandResponse>
    {
        private readonly ILibraryBookReadRepository _libraryBookReadRepository;
        private readonly ILibraryBookWriteRepository _libraryBookWriteRepository;

        public UpdateLibraryBookCommandHandler(
            ILibraryBookWriteRepository libraryBookWriteRepository,
            ILibraryBookReadRepository libraryBookReadRepository)
        {
            _libraryBookReadRepository = libraryBookReadRepository;
            _libraryBookWriteRepository = libraryBookWriteRepository;
        }

        public async Task<UpdateLibraryBookCommandResponse> Handle(UpdateLibraryBookCommandRequest request, CancellationToken cancellationToken)
        {
            var libraryBook = await _libraryBookReadRepository.GetEntityByIdAsync(request.Id);

            if (libraryBook == null)
            {
                return new UpdateLibraryBookCommandResponse
                {
                    Succeeded = false,
                };
            }

            libraryBook.TotalCount = request.TotalCount;
            libraryBook.AvailableCount = request.AvailableCount;

            await _libraryBookWriteRepository.SaveChangesAsync();

            return new UpdateLibraryBookCommandResponse
            {
                Succeeded = true,
            };
        }
    }
}
