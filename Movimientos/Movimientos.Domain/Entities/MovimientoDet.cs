namespace Movimientos.Domain.Entities;

public class MovimientoDet
{
    public int IdMovimientoDet { get; set; }
    public int IdMovimientoCab { get; set; }
    public int IdProducto { get; set; }    // OJO: NO es FK, el producto vive en otra BD
    public int Cantidad { get; set; }

    public MovimientoCab? MovimientoCab { get; set; }
}