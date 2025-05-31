using BookGuideAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Library.AddLibrary
{
    public class AddLibraryCommandHandler : IRequestHandler<AddLibraryCommandRequest, AddLibraryCommandResponse>
    {
        private readonly ILibraryWriteRepository _libraryWriteRepository;
        public AddLibraryCommandHandler(ILibraryWriteRepository libraryWriteRepository)
        {
            _libraryWriteRepository = libraryWriteRepository;
        }
        public async Task<AddLibraryCommandResponse> Handle(AddLibraryCommandRequest request, CancellationToken cancellationToken)
        {
            await _libraryWriteRepository.AddAsync(new Domain.Entities.Library
            {
                Id = Guid.NewGuid(),
                Address = request.Address,
                Name = request.Name,
                CreatedAt = DateTime.UtcNow,
            });
            return new AddLibraryCommandResponse
            {
                Succeeded = await _libraryWriteRepository.SaveChangesAsync() > 0
            };
        }
    }
}
