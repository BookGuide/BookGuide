using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Borrowing.GetLibrariesBorrowings
{
    public class GetLibrariesBorrowingsQueryRequest : IRequest<GetLibrariesBorrowingsQueryResponse>
    {
    }
}
