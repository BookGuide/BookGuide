using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Library.DeleteLibrary
{
    public class DeleteLibraryCommandRequest : IRequest<DeleteLibraryCommandResponse>
    {
        public Guid LibraryId { get; set; }
    }
}
