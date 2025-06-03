using BookGuideAPI.Domain.Entities;
using BookGuideAPI.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Borrowing.AddBorrowing
{
    public class AddBorrowingCommandRequest : IRequest<AddBorrowingCommandResponse>
    {
        public Guid BookId { get; set; }
        public Guid LibraryId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
