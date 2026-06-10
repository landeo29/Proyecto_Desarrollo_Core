using Ventas.Application.DTOs;

namespace Ventas.Application.Interfaces;

public interface IVentaService
{
    Task<int> RegistrarAsync(RegistrarVentaDto dto, string token);
    Task<IEnumerable<VentaDto>> ListarAsync();
}