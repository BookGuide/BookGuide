﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.LibraryBook.AddLibraryBook
{
    public class AddLibraryBookCommandRequest : IRequest<AddLibraryBookCommandResponse>
    {
        public Guid BookId { get; set; }
        public Guid LibraryId { get; set; }
        public int TotalCount { get; set; }
        public int AvailableCount { get; set; }
    }
}
