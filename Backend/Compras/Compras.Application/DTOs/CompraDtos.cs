namespace Compras.Application.DTOs;

public class RegistrarCompraDto
{
    public List<CompraDetItemDto> Detalles { get; set; } = new();
}

public class CompraDetItemDto
{
    public int IdProducto { get; set; }
    public int Cantidad { get; set; }
    public decimal Precio { get; set; }   // costo de compra
}

public class CompraDto
{
    public int IdCompraCab { get; set; }
    public DateTime FecRegistro { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Igv { get; set; }
    public decimal Total { get; set; }
    public List<CompraDetItemDto> Detalles { get; set; } = new();
}