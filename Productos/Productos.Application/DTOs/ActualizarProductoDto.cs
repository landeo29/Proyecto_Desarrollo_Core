namespace Productos.Application.DTOs;

public class ActualizarProductoDto
{
    public int IdProducto { get; set; }
    public string NombreProducto { get; set; } = string.Empty;
    public string? NroLote { get; set; }
    public decimal Costo { get; set; }
    public decimal PrecioVenta { get; set; }
}