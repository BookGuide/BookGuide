using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Dtos
{
    public class UploadRequest
    {
        public IFormFile File { get; set; }
    }
}
