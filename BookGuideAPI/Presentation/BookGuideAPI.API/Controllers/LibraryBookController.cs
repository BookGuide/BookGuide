using BookGuideAPI.Application.Features.Command.LibraryBook.AddLibraryBook;
using BookGuideAPI.Application.Features.Command.LibraryBook.UpdateLibraryBook;
using BookGuideAPI.Application.Features.Query.LibraryBook.GetLibraryBook;
using BookGuideAPI.Application.Features.Query.LibraryBook.GetLibraryBooks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookGuideAPI.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LibraryBookController : ControllerBase
    {
        private readonly IMediator _mediator;
        public LibraryBookController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> AddLibraryBook([FromBody] AddLibraryBookCommandRequest request)
        {
            AddLibraryBookCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateLibraryBook([FromBody] UpdateLibraryBookCommandRequest request)
        {
            UpdateLibraryBookCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GetLibraryBooks([FromQuery] GetLibraryBooksQueryRequest request)
        {
            GetLibraryBooksQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetLibraryBook([FromQuery] GetLibraryBookQueryRequest request)
        {
            GetLibraryBookQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}
