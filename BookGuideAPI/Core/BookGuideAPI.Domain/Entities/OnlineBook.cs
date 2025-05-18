using BookGuideAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Entities
{
    public class OnlineBook : BaseEntity
    {
        public required Guid BookId { get; set; }
        public required string FileId { get; set; }

        public Book Book { get; set; }
    }
}
