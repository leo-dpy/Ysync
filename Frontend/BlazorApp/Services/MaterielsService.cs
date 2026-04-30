using BlazorApp.Models;

namespace BlazorApp.Services;

public class MaterielsService
{
    private readonly ApiService _api;

    public MaterielsService(ApiService api)
    {
        _api = api;
    }

    public async Task<List<MaterielDto>> GetAllAsync()
    {
        return await _api.GetAsync<List<MaterielDto>>("materiels") ?? new();
    }

    public async Task<MaterielDto?> GetByIdAsync(int id)
    {
        return await _api.GetAsync<MaterielDto>($"materiels/{id}");
    }

    public async Task<MaterielDto?> CreateAsync(MaterielCreateDto dto)
    {
        return await _api.PostAsync<MaterielDto>("materiels", dto);
    }

    public async Task<MaterielDto?> UpdateAsync(int id, MaterielUpdateDto dto)
    {
        return await _api.PatchAsync<MaterielDto>($"materiels/{id}", dto);
    }

    public async Task DeleteAsync(int id)
    {
        await _api.DeleteAsync($"materiels/{id}");
    }
}
