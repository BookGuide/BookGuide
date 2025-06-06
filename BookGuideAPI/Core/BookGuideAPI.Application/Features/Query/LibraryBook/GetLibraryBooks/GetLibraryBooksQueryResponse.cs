using BookGuideAPI.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.LibraryBook.GetLibraryBooks
{
    public class GetLibraryBooksQueryResponse
    {
        public bool Succeeded { get; set; }
        public List<LibraryBookInventoryViewModel>? Books { get; set; }
    }
}
