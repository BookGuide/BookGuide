using BookGuideAPI.Application.Dtos;
using BookGuideAPI.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Infrastructure.Services
{
    public class StorageService : IStorageService
    {
        private readonly string _mediaRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "media");

        public StorageService()
        {
            if (!Directory.Exists(_mediaRootPath))
                Directory.CreateDirectory(_mediaRootPath);
        }

        public async Task<UploadResult> UploadAsync(Upload upload)
        {
            byte[] fileBytes;

            try
            {
                fileBytes = Convert.FromBase64String(upload.FileBytes);
            }
            catch (FormatException)
            {
                throw new ArgumentException("Geçersiz base64 dosya verisi.");
            }

            string subFolder = GetMediaSubFolder(upload.ContentType);
            string fullFolderPath = Path.Combine(_mediaRootPath, subFolder);

            if (!Directory.Exists(fullFolderPath))
                Directory.CreateDirectory(fullFolderPath);

            string filePath = Path.Combine(fullFolderPath, upload.FileName);

            await File.WriteAllBytesAsync(filePath, fileBytes);

            return new UploadResult
            {
                FilePath = $"/media/{subFolder}/{upload.FileName}",
                FileName = upload.FileName,
                ContentType = upload.ContentType,
                FileSize = fileBytes.Length
            };
        }


        public async Task<byte[]> GetAsync(string fileName)
        {
            var allSubFolders = new[] { "photos", "videos", "audios" };

            foreach (var folder in allSubFolders)
            {
                var path = Path.Combine(_mediaRootPath, folder, fileName);
                if (File.Exists(path))
                {
                    return await File.ReadAllBytesAsync(path);
                }
            }

            throw new FileNotFoundException("Dosya bulunamadı", fileName);
        }

        public Task<bool> DeleteAsync(string fileName)
        {
            var allSubFolders = new[] { "photos", "videos", "audios" };

            foreach (var folder in allSubFolders)
            {
                var path = Path.Combine(_mediaRootPath, folder, fileName);
                if (File.Exists(path))
                {
                    File.Delete(path);
                    return Task.FromResult(true);
                }
            }

            return Task.FromResult(false);
        }

        private string GetMediaSubFolder(string contentType)
        {
            if (contentType.StartsWith("image/"))
                return "photos";
            else if (contentType.StartsWith("video/"))
                return "videos";
            else if (contentType.StartsWith("audio/"))
                return "audios";
            else
                throw new NotSupportedException($"Desteklenmeyen içerik türü: {contentType}");
        }
    }
}
