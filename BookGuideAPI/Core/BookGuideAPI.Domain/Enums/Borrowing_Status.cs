using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Domain.Enums
{
    public enum Borrowing_Status
    {
        Pending,
        Active,
        Completed,
        Overdue,
        Canceled,
        Lost
    }
}
