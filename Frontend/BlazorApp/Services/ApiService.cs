using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Blazored.LocalStorage;

namespace BlazorApp.Services;

public class ApiService
{
    private readonly HttpClient _http;
    private readonly ILocalStorageService _localStorage;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        NumberHandling = JsonNumberHandling.AllowReadingFromString,
    };

    public ApiService(HttpClient http, ILocalStorageService localStorage)
    {
        _http = http;
        _localStorage = localStorage;
    }

    private async Task SetAuthHeaderAsync()
    {
        var token = await _localStorage.GetItemAsStringAsync("jwt_token");
        if (!string.IsNullOrWhiteSpace(token))
        {
            token = token.Trim('"');
            _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }
    }

    public async Task<T?> GetAsync<T>(string url)
    {
        await SetAuthHeaderAsync();
        var response = await _http.GetAsync(url);
        await EnsureSuccess(response);
        return await response.Content.ReadFromJsonAsync<T>(JsonOptions);
    }

    public async Task<T?> PostAsync<T>(string url, object data)
    {
        await SetAuthHeaderAsync();
        var response = await _http.PostAsJsonAsync(url, data);
        await EnsureSuccess(response);
        return await response.Content.ReadFromJsonAsync<T>(JsonOptions);
    }

    public async Task<T?> PatchAsync<T>(string url, object data)
    {
        await SetAuthHeaderAsync();
        var request = new HttpRequestMessage(HttpMethod.Patch, url)
        {
            Content = JsonContent.Create(data)
        };
        var response = await _http.SendAsync(request);
        await EnsureSuccess(response);
        return await response.Content.ReadFromJsonAsync<T>(JsonOptions);
    }

    public async Task DeleteAsync(string url)
    {
        await SetAuthHeaderAsync();
        var response = await _http.DeleteAsync(url);
        await EnsureSuccess(response);
    }

    public async Task<T?> PostNoAuthAsync<T>(string url, object data)
    {
        var response = await _http.PostAsJsonAsync(url, data);
        await EnsureSuccess(response);
        return await response.Content.ReadFromJsonAsync<T>(JsonOptions);
    }

    private static async Task EnsureSuccess(HttpResponseMessage response)
    {
        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync();
            string message;
            try
            {
                var doc = JsonDocument.Parse(body);
                message = doc.RootElement.TryGetProperty("message", out var msg)
                    ? msg.ToString()
                    : body;
            }
            catch
            {
                message = body;
            }
            throw new ApiException((int)response.StatusCode, message);
        }
    }
}

public class ApiException : Exception
{
    public int StatusCode { get; }

    public ApiException(int statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }
}
