namespace BlazorApp.Models;

public class SalleDto
{
    public int Id { get; set; }
    public string Nom { get; set; } = string.Empty;
    public string Categorie { get; set; } = string.Empty;
    public int? Capacite { get; set; }
}

public class SalleCreateDto
{
    public string Nom { get; set; } = string.Empty;
    public string Categorie { get; set; } = string.Empty;
    public int Capacite { get; set; }
}

public class SalleUpdateDto
{
    public string? Nom { get; set; }
    public string? Categorie { get; set; }
    public int? Capacite { get; set; }
}
