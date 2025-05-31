using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Borrowing.DeleteBorrowing
{
    public class DeleteBorrowingCommandRequest : IRequest<DeleteBorrowingCommandResponse>
    {
        public Guid Id { get; set; }
    }
}
