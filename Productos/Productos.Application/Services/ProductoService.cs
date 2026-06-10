using Productos.Application.DTOs;
using Productos.Application.Interfaces;
using Productos.Domain.Entities;

namespace Productos.Application.Services;

public class ProductoService : IProductoService
{
    private readonly IProductoRepository _repository;

    public ProductoService(IProductoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProductoDto>> ListarAsync()
    {
        var productos = await _repository.ListarAsync();
        return productos.Select(MapToDto);
    }

    public async Task<ProductoDto?> ObtenerPorIdAsync(int id)
    {
        var producto = await _repository.ObtenerPorIdAsync(id);
        return producto is null ? null : MapToDto(producto);
    }

    public async Task<ProductoDto> RegistrarAsync(CrearProductoDto dto)
    {
        var producto = new Producto
        {
            NombreProducto = dto.NombreProducto,
            NroLote = dto.NroLote,
            Costo = dto.Costo,
            PrecioVenta = dto.PrecioVenta
        };

        var creado = await _repository.RegistrarAsync(producto);
        return MapToDto(creado);
    }

    public async Task<bool> ActualizarAsync(ActualizarProductoDto dto)
    {
        var producto = await _repository.ObtenerPorIdAsync(dto.IdProducto);
        if (producto is null) return false;

        producto.NombreProducto = dto.NombreProducto;
        producto.NroLote = dto.NroLote;
        producto.Costo = dto.Costo;
        producto.PrecioVenta = dto.PrecioVenta;

        return await _repository.ActualizarAsync(producto);
    }

    private static ProductoDto MapToDto(Producto p) => new()
    {
        IdProducto = p.IdProducto,
        NombreProducto = p.NombreProducto,
        NroLote = p.NroLote,
        FecRegistro = p.FecRegistro,
        Costo = p.Costo,
        PrecioVenta = p.PrecioVenta
    };
}