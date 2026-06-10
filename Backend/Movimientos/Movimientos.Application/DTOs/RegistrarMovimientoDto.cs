namespace Movimientos.Application.DTOs;

public class RegistrarMovimientoDto
{
    public int IdTipoMovimiento { get; set; }      // 1 = Entrada, 2 = Salida
    public int IdDocumentoOrigen { get; set; }      // Id de la CompraCab o VentaCab
    public List<MovimientoDetDto> Detalles { get; set; } = new();
}

public class MovimientoDetDto
{
    public int IdProducto { get; set; }
    public int Cantidad { get; set; }
}