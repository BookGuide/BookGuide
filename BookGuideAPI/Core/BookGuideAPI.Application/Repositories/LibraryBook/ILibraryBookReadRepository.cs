using BookGuideAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Repositories
{
    public interface ILibraryBookReadRepository : IReadRepository<LibraryBook>
    {
        Task<bool> ExistsAsync(Guid bookId, Guid libraryId);
        Task<List<LibraryBook>> GetBooksByLibraryIdAsync(Guid libraryId);
    }
}
