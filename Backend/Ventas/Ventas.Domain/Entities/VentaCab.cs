namespace Ventas.Domain.Entities;

public class VentaCab
{
    public int IdVentaCab { get; set; }
    public DateTime FecRegistro { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Igv { get; set; }
    public decimal Total { get; set; }

    public ICollection<VentaDet> Detalles { get; set; } = new List<VentaDet>();
}