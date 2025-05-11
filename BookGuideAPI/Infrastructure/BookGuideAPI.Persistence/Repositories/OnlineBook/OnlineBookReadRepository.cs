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
    public class OnlineBookReadRepository : ReadRepository<OnlineBook>, IOnlineBookReadRepository
    {
        public OnlineBookReadRepository(BookGuideDbContext context) : base(context)
        {
        }
    }
}
