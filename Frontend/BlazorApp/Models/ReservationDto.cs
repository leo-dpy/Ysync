using System.Text.Json.Serialization;

namespace BlazorApp.Models;

public class ReservationDto
{
    public int Id { get; set; }
    public int UtilisateurId { get; set; }
    public int? SalleId { get; set; }
    public int? MaterielId { get; set; }
    public DateTime DateDebut { get; set; }
    public DateTime DateFin { get; set; }
    public string Statut { get; set; } = string.Empty;
    public ReservationUserDto? Utilisateur { get; set; }
    public SalleDto? Salle { get; set; }
    public MaterielDto? Materiel { get; set; }
}

public class ReservationUserDto
{
    public string Nom { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class ReservationCreateDto
{
    public string DateDebut { get; set; } = string.Empty;
    public string DateFin { get; set; } = string.Empty;
    public int? SalleId { get; set; }
    public int? MaterielId { get; set; }
}
