using BookGuideAPI.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Borrowing.GetLibrariesBorrowings
{
    public class GetLibrariesBorrowingsQueryResponse
    {
        public bool Succeded { get; set; }
        public List<BorrowingRecordViewModel> Borrowings { get; set; }
    }
}
