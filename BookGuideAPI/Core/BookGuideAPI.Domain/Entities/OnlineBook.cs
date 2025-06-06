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
        public Guid BookId { get; set; }
        public string FileId { get; set; } = null!;

        public Book Book { get; set; } = null!;
    }
}
