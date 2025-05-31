using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Dtos.Upload
{
    public class Upload
    {
        public string FileBytes { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
    }
}
