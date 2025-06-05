using BookGuideAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Query.Library.GetAllLibraries
{
    public class GetAllLibrariesQueryResponse
    {
        public bool Succeeded { get; set; }
        public List<Domain.Entities.Library> Libraries { get; set; }
    }
}
