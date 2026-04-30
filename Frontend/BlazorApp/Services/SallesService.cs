using BlazorApp.Models;

namespace BlazorApp.Services;

public class SallesService
{
    private readonly ApiService _api;

    public SallesService(ApiService api)
    {
        _api = api;
    }

    public async Task<List<SalleDto>> GetAllAsync()
    {
        return await _api.GetAsync<List<SalleDto>>("salles") ?? new();
    }

    public async Task<SalleDto?> GetByIdAsync(int id)
    {
        return await _api.GetAsync<SalleDto>($"salles/{id}");
    }

    public async Task<SalleDto?> CreateAsync(SalleCreateDto dto)
    {
        return await _api.PostAsync<SalleDto>("salles", dto);
    }

    public async Task<SalleDto?> UpdateAsync(int id, SalleUpdateDto dto)
    {
        return await _api.PatchAsync<SalleDto>($"salles/{id}", dto);
    }

    public async Task DeleteAsync(int id)
    {
        await _api.DeleteAsync($"salles/{id}");
    }
}
