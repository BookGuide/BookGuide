using BookGuideAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Library.DeleteLibrary
{
    public class DeleteLibraryCommandHandler : IRequestHandler<DeleteLibraryCommandRequest, DeleteLibraryCommandResponse>
    {
        private readonly ILibraryWriteRepository _libraryWriteRepository;
        public DeleteLibraryCommandHandler(ILibraryWriteRepository libraryWriteRepository)
        {
            _libraryWriteRepository = libraryWriteRepository;
        }
        public async Task<DeleteLibraryCommandResponse> Handle(DeleteLibraryCommandRequest request, CancellationToken cancellationToken)
        {
            await _libraryWriteRepository.DeleteAsync(request.LibraryId);
            await _libraryWriteRepository.SaveChangesAsync();

            return new DeleteLibraryCommandResponse
            {
                Succeeded = true
            };
        }
    }
}
