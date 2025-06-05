using BookGuideAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Library.GetAllLibraries
{
    public class GetAllLibrariesQueryHandler : IRequestHandler<GetAllLibrariesQueryRequest, GetAllLibrariesQueryResponse>
    {
        private readonly ILibraryReadRepository _libraryReadRepository;
        public GetAllLibrariesQueryHandler(ILibraryReadRepository libraryReadRepository)
        {
            _libraryReadRepository = libraryReadRepository;
        }
        public async Task<GetAllLibrariesQueryResponse> Handle(GetAllLibrariesQueryRequest request, CancellationToken cancellationToken)
        {
            var libraries = await _libraryReadRepository.GetAllAsync();

            return new GetAllLibrariesQueryResponse
            {
                Libraries = libraries.ToList(),
                Succeeded = true
            };
        }
    }
}
