using BookGuideAPI.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Borrowing.GetAllBorrowings
{
    public class GetAllBorrowingsQueryResponse
    {
        public bool Succeeded { get; set; }
        public List<BorrowingRecordViewModel> Borrowings { get; set; }
    }
}
