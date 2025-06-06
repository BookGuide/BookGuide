using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Dtos.Token
{
    public class TokenOptions
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public int ExpireMinutes { get; set; }
    }
}
