using BookGuideAPI.Application.Features.Command.Book.AddBook;
using BookGuideAPI.Application.Features.Command.Book.DeleteBook;
using BookGuideAPI.Application.Features.Query.Book.GetBook;
using BookGuideAPI.Application.Features.Query.Book.GetBooks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookGuideAPI.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IMediator _mediator;
        public BookController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] AddBookCommandRequest request)
        {
            AddBookCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GetBook([FromQuery] GetBookQueryRequest request)
        {
            GetBookQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks([FromQuery] GetBooksQueryRequest request)
        {
            GetBooksQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBook([FromBody] DeleteBookCommandRequest request)
        {
            DeleteBookCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }

    }
}
