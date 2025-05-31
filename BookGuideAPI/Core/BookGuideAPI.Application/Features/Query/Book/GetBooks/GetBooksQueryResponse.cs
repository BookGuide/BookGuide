using BookGuideAPI.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Book.GetBooks
{
    public class GetBooksQueryResponse
    {
        public List<BooksViewModel> Books { get; set; }
        public bool Succeeded { get; set; }
    }
}
