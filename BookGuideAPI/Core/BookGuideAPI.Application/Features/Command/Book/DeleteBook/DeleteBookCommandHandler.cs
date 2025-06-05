using BookGuideAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Book.DeleteBook
{
    public class DeleteBookCommandHandler : IRequestHandler<DeleteBookCommandRequest, DeleteBookCommandResponse>
    {
        private readonly IBookWriteRepository _bookWriteRepository;
        public DeleteBookCommandHandler(IBookWriteRepository bookWriteRepository)
        {
            _bookWriteRepository = bookWriteRepository;
        }
        public async Task<DeleteBookCommandResponse> Handle(DeleteBookCommandRequest request, CancellationToken cancellationToken)
        {
            await _bookWriteRepository.DeleteAsync(request.BookId);
            await _bookWriteRepository.SaveChangesAsync();

            return new DeleteBookCommandResponse
            {
                Succeeded = true
            };
        }
    }
}
