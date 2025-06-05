using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Library.GetLibraryNames
{
    public class GetLibraryNamesQueryResponse
    {
        public List<string> Names { get; set; }
        public bool Succeeded { get; set; }
    }
}
