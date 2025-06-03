using BookGuideAPI.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Borrowing.GetUsersBorrowing
{
    public class GetUsersBorrowingQueryResponse
    {
        public List<BorrowingViewModel> Borrowings { get; set; }
        public bool Succeeded { get; set; }
    }
}
