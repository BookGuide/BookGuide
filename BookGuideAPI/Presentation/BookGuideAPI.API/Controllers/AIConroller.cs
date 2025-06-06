using BookGuideAPI.Application.Features.Query.AI.GetResponse;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookGuideAPI.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AIConroller : ControllerBase
    {
        private readonly IMediator _mediator;
        public AIConroller(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> PostResponse([FromBody] GetResponseQueryRequest request)
        {
            GetResponseQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }

    }
}
