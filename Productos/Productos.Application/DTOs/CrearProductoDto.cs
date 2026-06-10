namespace Productos.Application.DTOs;

public class CrearProductoDto
{
    public string NombreProducto { get; set; } = string.Empty;
    public string? NroLote { get; set; }
    public decimal Costo { get; set; }
    public decimal PrecioVenta { get; set; }
}