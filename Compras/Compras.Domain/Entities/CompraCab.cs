namespace Compras.Domain.Entities;

public class CompraCab
{
    public int IdCompraCab { get; set; }
    public DateTime FecRegistro { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Igv { get; set; }
    public decimal Total { get; set; }

    public ICollection<CompraDet> Detalles { get; set; } = new List<CompraDet>();
}