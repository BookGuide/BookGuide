using BookGuideAPI.Application.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.AI.GetResponse
{
    public class GetResponseQueryHandler : IRequestHandler<GetResponseQueryRequest, GetResponseQueryResponse>
    {
        private readonly IAIService _aiService;
        public GetResponseQueryHandler(IAIService aIService)
        {
            _aiService = aIService;
        }
        public async Task<GetResponseQueryResponse> Handle(GetResponseQueryRequest request, CancellationToken cancellationToken)
        {
            var response = await _aiService.GetBookRecommendationAsync(request.Prompt);

            if(response == null) return new GetResponseQueryResponse { Succeeded = false };
            return new GetResponseQueryResponse
            {
                Succeeded = true,
                Message = response
            };
        }
    }
}
