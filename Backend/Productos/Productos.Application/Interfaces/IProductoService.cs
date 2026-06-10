using Productos.Application.DTOs;

namespace Productos.Application.Interfaces;

public interface IProductoService
{
    Task<IEnumerable<ProductoDto>> ListarAsync();
    Task<ProductoDto?> ObtenerPorIdAsync(int id);
    Task<ProductoDto> RegistrarAsync(CrearProductoDto dto);
    Task<bool> ActualizarAsync(ActualizarProductoDto dto);
}