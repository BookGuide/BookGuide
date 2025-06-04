using BookGuideAPI.Application.Features.Command.Borrowing.AddBorrowing;
using BookGuideAPI.Application.Features.Command.Borrowing.DeleteBorrowing;
using BookGuideAPI.Application.Features.Query.Borrowing.GetAllBorrowings;
using BookGuideAPI.Application.Features.Query.Borrowing.GetLibrariesBorrowings;
using BookGuideAPI.Application.Features.Query.Borrowing.GetUsersBorrowing;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookGuideAPI.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BorrowingController : ControllerBase
    {
        private readonly IMediator _mediator;
        public BorrowingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> AddBorrowing([FromBody] AddBorrowingCommandRequest request)
        {
            AddBorrowingCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateBorrowing([FromBody] UpdateBorrowingCommandRequest request)
        {
            UpdateBorrowingCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBorrowings([FromQuery] GetAllBorrowingsQueryRequest request)
        {
            GetAllBorrowingsQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetLibrariesBorrowing([FromQuery] GetLibrariesBorrowingsQueryRequest request)
        {
            GetLibrariesBorrowingsQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsersBorrowing([FromQuery] GetUsersBorrowingQueryRequest request)
        {
            GetUsersBorrowingQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}
