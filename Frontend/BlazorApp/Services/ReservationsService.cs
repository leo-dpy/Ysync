using BlazorApp.Models;

namespace BlazorApp.Services;

public class ReservationsService
{
    private readonly ApiService _api;

    public ReservationsService(ApiService api)
    {
        _api = api;
    }

    public async Task<List<ReservationDto>> GetAllAsync(int? salleId = null, int? materielId = null)
    {
        var query = "reservations";
        var parms = new List<string>();
        if (salleId.HasValue) parms.Add($"salleId={salleId}");
        if (materielId.HasValue) parms.Add($"materielId={materielId}");
        if (parms.Count > 0) query += "?" + string.Join("&", parms);

        return await _api.GetAsync<List<ReservationDto>>(query) ?? new();
    }

    public async Task<List<ReservationDto>> GetMesReservationsAsync()
    {
        return await _api.GetAsync<List<ReservationDto>>("reservations/mes-reservations") ?? new();
    }

    public async Task<ReservationDto?> CreateAsync(ReservationCreateDto dto)
    {
        return await _api.PostAsync<ReservationDto>("reservations", dto);
    }

    public async Task DeleteAsync(int id)
    {
        await _api.DeleteAsync($"reservations/{id}");
    }
}
