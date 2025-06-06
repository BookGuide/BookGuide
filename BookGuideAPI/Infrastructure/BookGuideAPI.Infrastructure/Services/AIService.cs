using BookGuideAPI.Application.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BookGuideAPI.Infrastructure.Services
{
    public class AIService : IAIService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public AIService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetBookRecommendationAsync(string prompt)
        {
            try
            {
                var apiKey = _configuration["DeepSeek:ApiKey"];
                var baseUrl = _configuration["DeepSeek:BaseUrl"];
                var model = _configuration["DeepSeek:DefaultModel"];
                var timeout = _configuration.GetValue<int>("DeepSeek:Timeout");

                _httpClient.Timeout = TimeSpan.FromMilliseconds(timeout);
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
                _httpClient.DefaultRequestHeaders.Add("HTTP-Referer", _configuration["DeepSeek:HttpReferer"]);
                _httpClient.DefaultRequestHeaders.Add("X-Title", _configuration["DeepSeek:XTitle"]);

                var systemMessage = "Sen bir kitap tavsiye uzmanısın. Kullanıcının tercihlerine göre kitap önerileri yap. Her öneri için kitap adı, yazar adı ve kısa bir açıklama ver.";
                var userMessage = $"Kitap tavsiyesi istiyorum: {prompt}";

                var requestBody = new
                {
                    model = model,
                    messages = new[]
                    {
                        new { role = "system", content = systemMessage },
                        new { role = "user", content = userMessage }
                    },
                    max_tokens = 1000,
                    temperature = 0.7
                };

                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(baseUrl, content);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"API isteği başarısız: {response.StatusCode} - {errorContent}");
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                var responseData = JsonSerializer.Deserialize<JsonElement>(responseContent);

                if (responseData.TryGetProperty("choices", out var choices) && choices.GetArrayLength() > 0)
                {
                    var firstChoice = choices[0];
                    if (firstChoice.TryGetProperty("message", out var message) &&
                        message.TryGetProperty("content", out var messageContent))
                    {
                        return messageContent.GetString() ?? "Tavsiye alınamadı.";
                    }
                }

                return "Tavsiye alınamadı.";
            }
            catch (Exception ex)
            {
                return $"Hata oluştu: {ex.Message}";
            }
        }
    }
}