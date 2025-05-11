using BookGuideAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Repositories
{
    public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
    {
        Task AddAsync(T model);
        Task<int> SaveChangesAsync();
        Task DeleteAsync(Guid id);
        Task<T> UpdateAsync(T model);
    }
}
