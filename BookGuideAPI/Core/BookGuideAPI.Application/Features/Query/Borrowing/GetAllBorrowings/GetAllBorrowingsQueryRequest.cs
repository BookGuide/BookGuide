using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Borrowing.GetAllBorrowings
{
    public class GetAllBorrowingsQueryRequest : IRequest<GetAllBorrowingsQueryResponse>
    {
    }
}
