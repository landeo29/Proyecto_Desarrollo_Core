namespace Compras.Domain.Entities;

public class CompraDet
{
    public int IdCompraDet { get; set; }
    public int IdCompraCab { get; set; }
    public int IdProducto { get; set; }
    public int Cantidad { get; set; }
    public decimal Precio { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Igv { get; set; }
    public decimal Total { get; set; }

    public CompraCab? CompraCab { get; set; }
}