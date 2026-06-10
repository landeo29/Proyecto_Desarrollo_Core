using Compras.Application.DTOs;

namespace Compras.Application.Interfaces;

public interface ICompraService
{
    Task<int> RegistrarAsync(RegistrarCompraDto dto);
    Task<IEnumerable<CompraDto>> ListarAsync();
}