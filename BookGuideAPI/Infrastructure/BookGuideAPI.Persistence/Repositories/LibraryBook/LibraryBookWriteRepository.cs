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
    public class LibraryBookWriteRepository : WriteRepository<LibraryBook>, ILibraryBookWriteRepository
    {
        public LibraryBookWriteRepository(BookGuideDbContext context) : base(context)
        {
        }
    }
}
