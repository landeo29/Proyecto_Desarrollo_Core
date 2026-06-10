using Microsoft.EntityFrameworkCore;
using Ventas.Application.Interfaces;
using Ventas.Domain.Entities;
using Ventas.Infrastructure.Persistence;

namespace Ventas.Infrastructure.Repositories;

public class VentaRepository : IVentaRepository
{
    private readonly AppDbContext _context;

    public VentaRepository(AppDbContext context) => _context = context;

    public async Task<VentaCab> RegistrarAsync(VentaCab venta)
    {
        venta.FecRegistro = DateTime.Now;
        _context.VentasCab.Add(venta);
        await _context.SaveChangesAsync();
        return venta;
    }

    public async Task<IEnumerable<VentaCab>> ListarAsync()
        => await _context.VentasCab.Include(v => v.Detalles).AsNoTracking().ToListAsync();
}