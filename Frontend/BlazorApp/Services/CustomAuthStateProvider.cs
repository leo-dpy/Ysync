using System.Security.Claims;
using System.Text.Json;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Authorization;

namespace BlazorApp.Services;

public class CustomAuthStateProvider : AuthenticationStateProvider
{
    private readonly ILocalStorageService _localStorage;

    public CustomAuthStateProvider(ILocalStorageService localStorage)
    {
        _localStorage = localStorage;
    }

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        var token = await _localStorage.GetItemAsStringAsync("jwt_token");

        if (string.IsNullOrWhiteSpace(token))
        {
            return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity()));
        }

        token = token.Trim('"');

        var claims = ParseClaimsFromJwt(token);
        if (claims == null)
        {
            return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity()));
        }

        // Check expiration
        var expClaim = claims.FirstOrDefault(c => c.Type == "exp");
        if (expClaim != null && long.TryParse(expClaim.Value, out var exp))
        {
            var expDate = DateTimeOffset.FromUnixTimeSeconds(exp);
            if (expDate < DateTimeOffset.UtcNow)
            {
                await _localStorage.RemoveItemAsync("jwt_token");
                return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity()));
            }
        }

        var identity = new ClaimsIdentity(claims, "jwt");
        var user = new ClaimsPrincipal(identity);
        return new AuthenticationState(user);
    }

    public void NotifyAuthenticationStateChanged()
    {
        NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
    }

    private static IEnumerable<Claim>? ParseClaimsFromJwt(string jwt)
    {
        try
        {
            var parts = jwt.Split('.');
            if (parts.Length != 3) return null;

            var payload = parts[1];
            var jsonBytes = ParseBase64WithoutPadding(payload);
            var keyValuePairs = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonBytes);

            if (keyValuePairs == null) return null;

            var claims = new List<Claim>();
            foreach (var kvp in keyValuePairs)
            {
                var claimType = kvp.Key switch
                {
                    "sub" => ClaimTypes.NameIdentifier,
                    "role" => ClaimTypes.Role,
                    _ => kvp.Key
                };
                claims.Add(new Claim(claimType, kvp.Value.ToString()!));
            }
            return claims;
        }
        catch
        {
            return null;
        }
    }

    private static byte[] ParseBase64WithoutPadding(string base64)
    {
        switch (base64.Length % 4)
        {
            case 2: base64 += "=="; break;
            case 3: base64 += "="; break;
        }
        return Convert.FromBase64String(base64.Replace('-', '+').Replace('_', '/'));
    }
}
