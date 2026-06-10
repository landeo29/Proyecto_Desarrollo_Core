using Movimientos.Application.DTOs;
using Movimientos.Application.Interfaces;
using Movimientos.Domain.Entities;
using Movimientos.Domain.Enums;

namespace Movimientos.Application.Services;

public class MovimientoService : IMovimientoService
{
    private readonly IMovimientoRepository _repository;

    public MovimientoService(IMovimientoRepository repository) => _repository = repository;

    public async Task<int> RegistrarMovimientoAsync(RegistrarMovimientoDto dto)
    {
        var movimiento = new MovimientoCab
        {
            IdTipoMovimiento = (TipoMovimiento)dto.IdTipoMovimiento,
            IdDocumentoOrigen = dto.IdDocumentoOrigen,
            Detalles = dto.Detalles.Select(d => new MovimientoDet
            {
                IdProducto = d.IdProducto,
                Cantidad = d.Cantidad
            }).ToList()
        };

        var creado = await _repository.RegistrarAsync(movimiento);
        return creado.IdMovimientoCab;
    }

    public async Task<StockDto> ObtenerStockAsync(int idProducto)
    {
        var stock = await _repository.ObtenerStockProductoAsync(idProducto);
        return new StockDto { IdProducto = idProducto, StockActual = stock };
    }

    public async Task<IEnumerable<MovimientoConsultaDto>> ListarPorProductoAsync(int idProducto)
    {
        var movimientos = await _repository.ListarPorProductoAsync(idProducto);

        return movimientos.SelectMany(cab => cab.Detalles
            .Where(d => d.IdProducto == idProducto)
            .Select(d => new MovimientoConsultaDto
            {
                IdMovimientoCab = cab.IdMovimientoCab,
                FecRegistro = cab.FecRegistro,
                TipoMovimiento = cab.IdTipoMovimiento.ToString(),
                Cantidad = d.Cantidad
            }));
    }

    public Task<IEnumerable<int>> ObtenerIdsProductosConMovimientoAsync()
        => _repository.ObtenerIdsProductosConMovimientoAsync();
}