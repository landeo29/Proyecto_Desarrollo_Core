using Microsoft.EntityFrameworkCore;
using Productos.Application.Interfaces;
using Productos.Domain.Entities;
using Productos.Infrastructure.Persistence;

namespace Productos.Infrastructure.Repositories;

public class ProductoRepository : IProductoRepository
{
    private readonly AppDbContext _context;

    public ProductoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Producto>> ListarAsync()
        => await _context.Productos.AsNoTracking().ToListAsync();

    public async Task<Producto?> ObtenerPorIdAsync(int id)
        => await _context.Productos.FindAsync(id);

    public async Task<Producto> RegistrarAsync(Producto producto)
    {
        producto.FecRegistro = DateTime.Now;
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
        return producto;
    }

    public async Task<bool> ActualizarAsync(Producto producto)
    {
        _context.Productos.Update(producto);
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task ActualizarCostoYPrecioAsync(int idProducto, decimal costo)
    {
        var producto = await _context.Productos.FindAsync(idProducto);
        if (producto is null) return;

        producto.Costo = costo;
        producto.PrecioVenta = costo * 1.35m;   // regla de precioventa
        await _context.SaveChangesAsync();
    }
}