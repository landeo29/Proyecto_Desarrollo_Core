using Productos.Domain.Entities;

namespace Productos.Application.Interfaces;

public interface IProductoRepository
{
    Task<IEnumerable<Producto>> ListarAsync();
    Task<Producto?> ObtenerPorIdAsync(int id);
    Task<Producto> RegistrarAsync(Producto producto);
    Task<bool> ActualizarAsync(Producto producto);
}