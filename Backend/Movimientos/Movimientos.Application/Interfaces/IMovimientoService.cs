using Movimientos.Application.DTOs;

namespace Movimientos.Application.Interfaces;

public interface IMovimientoService
{
    Task<int> RegistrarMovimientoAsync(RegistrarMovimientoDto dto);
    Task<StockDto> ObtenerStockAsync(int idProducto);
    Task<IEnumerable<MovimientoConsultaDto>> ListarPorProductoAsync(int idProducto);
    Task<IEnumerable<int>> ObtenerIdsProductosConMovimientoAsync();
}