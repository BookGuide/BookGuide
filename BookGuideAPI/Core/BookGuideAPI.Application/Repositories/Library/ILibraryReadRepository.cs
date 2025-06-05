using BookGuideAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Repositories
{
    public interface ILibraryReadRepository : IReadRepository<Library>
    {
        public Task<List<string>> GetLibraryNamesAsync();
    }
}
