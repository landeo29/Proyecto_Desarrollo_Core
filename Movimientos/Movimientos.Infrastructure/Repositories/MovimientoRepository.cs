using Microsoft.EntityFrameworkCore;
using Movimientos.Application.Interfaces;
using Movimientos.Domain.Entities;
using Movimientos.Domain.Enums;
using Movimientos.Infrastructure.Persistence;

namespace Movimientos.Infrastructure.Repositories;

public class MovimientoRepository : IMovimientoRepository
{
    private readonly AppDbContext _context;

    public MovimientoRepository(AppDbContext context) => _context = context;

    public async Task<MovimientoCab> RegistrarAsync(MovimientoCab movimiento)
    {
        movimiento.FecRegistro = DateTime.Now;
        _context.MovimientosCab.Add(movimiento);
        await _context.SaveChangesAsync();
        return movimiento;
    }

    public async Task<int> ObtenerStockProductoAsync(int idProducto)
    {
        var entradas = await _context.MovimientosDet
            .Where(d => d.IdProducto == idProducto &&
                        d.MovimientoCab!.IdTipoMovimiento == TipoMovimiento.Entrada)
            .SumAsync(d => (int?)d.Cantidad) ?? 0;

        var salidas = await _context.MovimientosDet
            .Where(d => d.IdProducto == idProducto &&
                        d.MovimientoCab!.IdTipoMovimiento == TipoMovimiento.Salida)
            .SumAsync(d => (int?)d.Cantidad) ?? 0;

        return entradas - salidas;
    }

    public async Task<IEnumerable<MovimientoCab>> ListarPorProductoAsync(int idProducto)
    {
        return await _context.MovimientosCab
            .Include(m => m.Detalles)
            .Where(m => m.Detalles.Any(d => d.IdProducto == idProducto))
            .OrderByDescending(m => m.FecRegistro)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<int>> ObtenerIdsProductosConMovimientoAsync()
    {
        return await _context.MovimientosDet
            .Select(d => d.IdProducto)
            .Distinct()
            .ToListAsync();
    }
}