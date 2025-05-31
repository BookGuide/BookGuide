using BookGuideAPI.Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.LibraryBook.GetLibraryBook
{
    public class GetLibraryBookQueryResponse
    {
        public bool Succeeded { get; set; }
        public LibraryBookWithBorrowingsViewModel? Book { get; set; }
    }
}
