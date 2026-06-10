using Movimientos.Domain.Entities;

namespace Movimientos.Application.Interfaces;

public interface IMovimientoRepository
{
    Task<MovimientoCab> RegistrarAsync(MovimientoCab movimiento);
    Task<int> ObtenerStockProductoAsync(int idProducto);
    Task<IEnumerable<MovimientoCab>> ListarPorProductoAsync(int idProducto);
    Task<IEnumerable<int>> ObtenerIdsProductosConMovimientoAsync();
}