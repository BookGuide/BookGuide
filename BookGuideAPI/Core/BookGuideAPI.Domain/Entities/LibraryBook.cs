using BookGuideAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Entities
{
    public class LibraryBook : BaseEntity
    {
        public Guid BookId { get; set; }
        public Guid LibraryId { get; set; }
        public int TotalCount { get; set; }
        public int AvailableCount { get; set; }

        public Book Book { get; set; }
        public Library Library { get; set; }
    }
}
