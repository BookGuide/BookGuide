using BookGuideAPI.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Services
{
    public interface IStorageService
    {
        Task<UploadResult> UploadAsync(Upload upload);
        Task<byte[]> GetAsync(string fileId);
        Task<bool> DeleteAsync(string fileId);
    }
}
