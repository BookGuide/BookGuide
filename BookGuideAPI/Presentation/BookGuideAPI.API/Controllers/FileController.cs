using BookGuideAPI.Application.Dtos;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BookGuideAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FileController : ControllerBase
    {
        private readonly DriveService _driveService;

        public FileController()
        {
            var credentialPath = "service-account.json";

            GoogleCredential credential;
            using (var stream = new FileStream(credentialPath, FileMode.Open, FileAccess.Read))
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

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload([FromForm] UploadRequest request)
        {
            var file = request.File;

            if (file == null || file.Length == 0)
                return BadRequest("Dosya eksik.");

            try
            {
                var fileMetadata = new Google.Apis.Drive.v3.Data.File
                {
                    Name = file.FileName,
                    MimeType = file.ContentType,
                    Parents = new[] { "1ZIMKIL1vagdb3vC4cYGQBgF4FZM5iOkD" }
                };

                using var stream = file.OpenReadStream();
                var requestDrive = _driveService.Files.Create(fileMetadata, stream, file.ContentType);
                requestDrive.Fields = "id";
                await requestDrive.UploadAsync();

                var uploadedFile = requestDrive.ResponseBody;

                var permission = new Permission
                {
                    Role = "reader",
                    Type = "anyone"
                };
                await _driveService.Permissions.Create(permission, uploadedFile.Id).ExecuteAsync();

                string fileUrl = $"https://drive.google.com/file/d/{uploadedFile.Id}/preview";

                return Ok(new
                {
                    fileId = uploadedFile.Id,
                    fileName = file.FileName,
                    fileUrl = fileUrl
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Yükleme hatası: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var file = await _driveService.Files.Get(id).ExecuteAsync();

                string fileUrl = $"https://drive.google.com/file/d/{file.Id}/preview";
                return Ok(new
                {
                    fileId = file.Id,
                    fileName = file.Name,
                    fileUrl = fileUrl
                });
            }
            catch (Exception ex)
            {
                return NotFound($"Dosya alınamadı: {ex.Message}");
            }
        }
    }
}
