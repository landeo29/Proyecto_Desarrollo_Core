using Compras.Application.Interfaces;
using Compras.Domain.Entities;
using Compras.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Compras.Infrastructure.Repositories;

public class CompraRepository : ICompraRepository
{
    private readonly AppDbContext _context;

    public CompraRepository(AppDbContext context) => _context = context;

    public async Task<CompraCab> RegistrarAsync(CompraCab compra)
    {
        compra.FecRegistro = DateTime.Now;
        _context.ComprasCab.Add(compra);
        await _context.SaveChangesAsync();
        return compra;
    }

    public async Task<IEnumerable<CompraCab>> ListarAsync()
        => await _context.ComprasCab.Include(c => c.Detalles).AsNoTracking().ToListAsync();
}