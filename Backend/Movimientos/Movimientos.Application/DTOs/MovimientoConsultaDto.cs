namespace Movimientos.Application.DTOs;

public class MovimientoConsultaDto
{
    public int IdMovimientoCab { get; set; }
    public DateTime FecRegistro { get; set; }
    public string TipoMovimiento { get; set; } = string.Empty;  // "Entrada" / "Salida"
    public int Cantidad { get; set; }
}