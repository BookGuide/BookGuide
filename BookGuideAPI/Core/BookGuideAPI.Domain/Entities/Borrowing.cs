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
        public Guid UserId { get; set; }
        public Guid BookId { get; set; }
        public Guid LibraryId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Borrowing_Status Status { get; set; }

        public User User { get; set; } = null!;
        public Book Book { get; set; } = null!;
        public Library Library { get; set; } = null!;
    }
}
