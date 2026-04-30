using BlazorApp.Models;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Authorization;

namespace BlazorApp.Services;

public class AuthService
{
    private readonly ApiService _api;
    private readonly ILocalStorageService _localStorage;
    private readonly CustomAuthStateProvider _authStateProvider;

    public AuthService(ApiService api, ILocalStorageService localStorage, AuthenticationStateProvider authStateProvider)
    {
        _api = api;
        _localStorage = localStorage;
        _authStateProvider = (CustomAuthStateProvider)authStateProvider;
    }

    public async Task<LoginResponse?> LoginAsync(string email, string motDePasse)
    {
        var response = await _api.PostNoAuthAsync<LoginResponse>("auth/login", new LoginRequest
        {
            Email = email,
            MotDePasse = motDePasse
        });

        if (response?.Access_token != null)
        {
            await _localStorage.SetItemAsStringAsync("jwt_token", response.Access_token);
            _authStateProvider.NotifyAuthenticationStateChanged();
        }

        return response;
    }

    public async Task<UserDto?> RegisterAsync(string nom, string email, string motDePasse, string role)
    {
        return await _api.PostNoAuthAsync<UserDto>("auth/register", new RegisterRequest
        {
            Nom = nom,
            Email = email,
            MotDePasse = motDePasse,
            Role = role
        });
    }

    public async Task<UserDto?> GetCurrentUserAsync()
    {
        return await _api.GetAsync<UserDto>("auth/me");
    }

    public async Task LogoutAsync()
    {
        await _localStorage.RemoveItemAsync("jwt_token");
        _authStateProvider.NotifyAuthenticationStateChanged();
    }
}
