using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.AI.GetResponse
{
    public class GetResponseQueryRequest : IRequest<GetResponseQueryResponse>
    {
        public string Prompt { get; set; }
    }
}
