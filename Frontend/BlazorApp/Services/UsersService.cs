using BlazorApp.Models;

namespace BlazorApp.Services;

public class UsersService
{
    private readonly ApiService _api;

    public UsersService(ApiService api)
    {
        _api = api;
    }

    public Task<List<UserListDto>?> GetAllAsync()
        => _api.GetAsync<List<UserListDto>>("users");

    public Task<UserListDto?> UpdateRoleAsync(int id, string role)
        => _api.PatchAsync<UserListDto>($"users/{id}/role", new { role });

    public Task DeleteAsync(int id)
        => _api.DeleteAsync($"users/{id}");
}
