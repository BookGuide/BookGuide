using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Services
{
    public interface IAIService
    {
        public Task<string> GetBookRecommendationAsync(string prompt);
    }
}
