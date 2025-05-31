using BookGuideAPI.Application.Dtos;
using BookGuideAPI.Application.Dtos.Upload;
using BookGuideAPI.Application.Services;
/*using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Upload;*/
using System;
using System.IO;
using System.Threading.Tasks;

namespace BookGuideAPI.Infrastructure.Services
{
    public class StorageService //: IStorageService
    {
        /*private readonly DriveService _driveService;

        public StorageService()
        {
            var serviceAccountFile = "service-account.json"; // TODO: Bunu Ekle
            GoogleCredential credential;

            using (var stream = new FileStream(serviceAccountFile, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                    .CreateScoped(DriveService.Scope.Drive);
            }

            _driveService = new DriveService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "BookGuideAPI"
            });
        }

        public async Task<UploadResult> UploadAsync(Upload upload)
        {
            /*byte[] fileBytes = Convert.FromBase64String(upload.FileBytes);

            var fileMetadata = new Google.Apis.Drive.v3.Data.File
            {
                Name = upload.FileName
                // Parent klasör belirtmek istersek: Parents = new[] { "FOLDER_ID" }
            };

            using (var stream = new MemoryStream(fileBytes))
            {
                var request = _driveService.Files.Create(fileMetadata, stream, upload.ContentType);
                request.Fields = "id";
                await request.UploadAsync();

                var file = request.ResponseBody;

                return new UploadResult
                {
                    FilePath = file.Id,
                    FileName = upload.FileName,
                    ContentType = upload.ContentType,
                    FileSize = fileBytes.Length
                };
            }
        }

        public async Task<byte[]> GetAsync(string fileId)
        {
            var request = _driveService.Files.Get(fileId);
            var stream = new MemoryStream();
            await request.DownloadAsync(stream);
            return stream.ToArray();
        }

        public async Task<bool> DeleteAsync(string fileId)
        {
            try
            {
                await _driveService.Files.Delete(fileId).ExecuteAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }*/
    }
}
