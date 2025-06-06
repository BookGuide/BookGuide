using BookGuideAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Repositories
{
    public interface IBorrowingReadRepository : IReadRepository<Borrowing>
    {
        public Task<List<Borrowing>> GetAdminsBorrowingsAsync();
        public Task<List<Borrowing>> GetUsersBorrowingAsync(Guid userId);
        public Task<List<Borrowing>> GetLibrariesBorrowingsAsync(Guid libraryId);
    }
}
