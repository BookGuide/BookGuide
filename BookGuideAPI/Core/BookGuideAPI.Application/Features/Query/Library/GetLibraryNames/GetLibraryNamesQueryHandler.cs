using BookGuideAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Library.GetLibraryNames
{
    public class GetLibraryNamesQueryHandler : IRequestHandler<GetLibraryNamesQueryRequest, GetLibraryNamesQueryResponse>
    {
        private readonly ILibraryReadRepository _libraryReadRepository;
        public GetLibraryNamesQueryHandler(ILibraryReadRepository libraryReadRepository)
        {
            _libraryReadRepository = libraryReadRepository;
        }
        public async Task<GetLibraryNamesQueryResponse> Handle(GetLibraryNamesQueryRequest request, CancellationToken cancellationToken)
        {
            return new GetLibraryNamesQueryResponse
            {
                Names = await _libraryReadRepository.GetLibraryNamesAsync(),
                Succeeded = true,
            };
        }
    }
}
