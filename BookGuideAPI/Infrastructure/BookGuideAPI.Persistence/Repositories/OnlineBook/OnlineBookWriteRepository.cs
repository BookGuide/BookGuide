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
    public class OnlineBookWriteRepository : WriteRepository<OnlineBook>, IOnlineBookWriteRepository
    {
        public OnlineBookWriteRepository(BookGuideDbContext context) : base(context)
        {
        }
    }
}
