namespace Ventas.Application.DTOs;

public class RegistrarVentaDto
{
    public List<VentaDetItemDto> Detalles { get; set; } = new();
}

public class VentaDetItemDto
{
    public int IdProducto { get; set; }
    public int Cantidad { get; set; }
    public decimal Precio { get; set; }   // prec venta
}

public class VentaDto
{
    public int IdVentaCab { get; set; }
    public DateTime FecRegistro { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Igv { get; set; }
    public decimal Total { get; set; }
    public List<VentaDetItemDto> Detalles { get; set; } = new();
}