using BookGuideAPI.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Book.GetBook
{
    public class GetBookQueryResponse
    {
        public bool Succeeded { get; set; }
        public BookViewModel BookInfo { get; set; }
    }
}
