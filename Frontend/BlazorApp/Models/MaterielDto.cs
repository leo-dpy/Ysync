namespace BlazorApp.Models;

public class MaterielDto
{
    public int Id { get; set; }
    public string Nom { get; set; } = string.Empty;
    public string? Marque { get; set; }
    public decimal? Caution { get; set; }
    public string? TagQrCode { get; set; }
    public bool EstActif { get; set; } = true;
}

public class MaterielCreateDto
{
    public string Nom { get; set; } = string.Empty;
    public string? Marque { get; set; }
    public decimal? Caution { get; set; }
}

public class MaterielUpdateDto
{
    public string? Nom { get; set; }
    public string? Marque { get; set; }
    public decimal? Caution { get; set; }
}
