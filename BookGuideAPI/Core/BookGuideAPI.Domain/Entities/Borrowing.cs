using BookGuideAPI.Domain.Entities.Common;
using BookGuideAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Entities
{
    public class Borrowing : BaseEntity
    {
        public required Guid UserId { get; set; }
        public required Guid BookId { get; set; }
        public required Guid LibraryId { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
        public Borrowing_Status Status { get; set; }

        public User User { get; set; }
        public Book Book { get; set; }
        public Library Library { get; set; }
    }
}
