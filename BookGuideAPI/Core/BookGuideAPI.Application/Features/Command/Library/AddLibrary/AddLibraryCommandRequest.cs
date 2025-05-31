using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.Library.AddLibrary
{
    public class AddLibraryCommandRequest : IRequest<AddLibraryCommandResponse> 
    {
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
