using Movimientos.Domain.Enums;

namespace Movimientos.Domain.Entities;

public class MovimientoCab
{
    public int IdMovimientoCab { get; set; }
    public DateTime FecRegistro { get; set; }
    public TipoMovimiento IdTipoMovimiento { get; set; }
    public int IdDocumentoOrigen { get; set; }   

    public ICollection<MovimientoDet> Detalles { get; set; } = new List<MovimientoDet>();
}