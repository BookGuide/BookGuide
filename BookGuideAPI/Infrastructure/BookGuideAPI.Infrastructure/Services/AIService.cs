using BookGuideAPI.Application.Services;
using System.Text;
using System.Text.Json;

public class AIService : IAIService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://api.deepseek.com/v1/chat/completions"; // API endpointini kontrol et

    public AIService(string apiKey)
    {
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
    }

    public async Task<string> GetResponseAsync(string prompt)
    {
        var requestBody = new
        {
            model = "deepseek-chat", // Kullanmak istediğin model
            messages = new[]
            {
                new
                {
                    role = "user",
                    content = prompt
                }
            },
            temperature = 0.7,
            max_tokens = 1000
        };

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(BaseUrl, content);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();
        var responseObject = JsonSerializer.Deserialize<DeepSeekResponse>(responseJson);

        return responseObject?.Choices?[0].Message.Content ?? "Cevap alınamadı";
    }

    private class DeepSeekResponse
    {
        public List<Choice> Choices { get; set; }

        public class Choice
        {
            public Message Message { get; set; }
        }

        public class Message
        {
            public string Content { get; set; }
        }
    }
}