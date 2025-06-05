using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Book.DeleteBook
{
    public class DeleteBookCommandRequest : IRequest<DeleteBookCommandResponse>
    {
        public Guid BookId { get; set; }
    }
}
