using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.LibraryBook.GetLibraryBooks
{
    public class GetLibraryBooksQueryRequest : IRequest<GetLibraryBooksQueryResponse>
    {
        public Guid LibraryId { get; set; }
    }
}
