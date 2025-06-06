using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.LibraryBook.UpdateLibraryBook
{
    public class UpdateLibraryBookCommandRequest : IRequest<UpdateLibraryBookCommandResponse>
    {
        public Guid Id { get; set; }
        public int TotalCount { get; set; }
        public int AvailableCount { get; set; }
    }
}
