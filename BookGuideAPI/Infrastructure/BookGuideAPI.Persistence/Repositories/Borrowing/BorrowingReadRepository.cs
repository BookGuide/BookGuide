using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Domain.Entities;
using BookGuideAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Persistence.Repositories
{
    public class BorrowingReadRepository : ReadRepository<Borrowing>, IBorrowingReadRepository
    {
        public BorrowingReadRepository(BookGuideDbContext context) : base(context)
        {
        }
    }
}
