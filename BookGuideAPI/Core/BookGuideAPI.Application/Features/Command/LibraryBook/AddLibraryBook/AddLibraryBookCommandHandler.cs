using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.Services;
using BookGuideAPI.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookGuideAPI.Application.Features.Command.LibraryBook.AddLibraryBook
{
    public class AddLibraryBookCommandHandler : IRequestHandler<AddLibraryBookCommandRequest, AddLibraryBookCommandResponse>
    {
        private readonly ILibraryBookWriteRepository _libraryBookWriteRepository;
        private readonly ILibraryBookReadRepository _libraryBookReadRepository;
        private readonly IUserContext _userContext;

        public AddLibraryBookCommandHandler(
            ILibraryBookWriteRepository libraryBookWriteRepository,
            ILibraryBookReadRepository libraryBookReadRepository,
            IUserContext userContext)
        {
            _libraryBookWriteRepository = libraryBookWriteRepository;
            _libraryBookReadRepository = libraryBookReadRepository;
            _userContext = userContext;
        }

        public async Task<AddLibraryBookCommandResponse> Handle(AddLibraryBookCommandRequest request, CancellationToken cancellationToken)
        {
            var libraryId = _userContext.LibraryId;
            if(libraryId == null) return new AddLibraryBookCommandResponse { Succeeded = false };

            if (await _libraryBookReadRepository.ExistsAsync(request.BookId, (Guid)libraryId))
            {
                return new AddLibraryBookCommandResponse
                {
                    Succeeded = false,
                };
            }

            var libraryBook = new Domain.Entities.LibraryBook
            {
                Id = Guid.NewGuid(),
                BookId = request.BookId,
                LibraryId = (Guid)libraryId,
                TotalCount = request.TotalCount,
                AvailableCount = request.AvailableCount
            };

            await _libraryBookWriteRepository.AddAsync(libraryBook);
            await _libraryBookWriteRepository.SaveChangesAsync();

            return new AddLibraryBookCommandResponse
            {
                Succeeded = true,
            };
        }
    }
}
