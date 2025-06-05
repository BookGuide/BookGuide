using BookGuideAPI.Application.Features.Command.Library.AddLibrary;
using BookGuideAPI.Application.Features.Command.Library.DeleteLibrary;
using BookGuideAPI.Application.Features.Query.Library.GetAllLibraries;
using BookGuideAPI.Application.Features.Query.Library.GetLibraryNames;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace BookGuideAPI.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public LibraryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> AddLibrary([FromBody] AddLibraryCommandRequest request)
        {
            AddLibraryCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetLibraryNames([FromQuery] GetLibraryNamesQueryRequest request)
        {
            GetLibraryNamesQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetLibraries([FromQuery] GetAllLibrariesQueryRequest request)
        {
            GetAllLibrariesQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLibrary([FromBody] DeleteLibraryCommandRequest request)
        {
            DeleteLibraryCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}