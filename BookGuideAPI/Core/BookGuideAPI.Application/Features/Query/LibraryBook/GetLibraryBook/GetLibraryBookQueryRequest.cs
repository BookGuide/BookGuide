using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.LibraryBook.GetLibraryBook
{
    public class GetLibraryBookQueryRequest : IRequest<GetLibraryBookQueryResponse>
    {
        public Guid LibraryBookId { get; set; }
    }
}
