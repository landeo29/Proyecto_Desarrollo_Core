using Compras.Domain.Entities;

namespace Compras.Application.Interfaces;

public interface ICompraRepository
{
    Task<CompraCab> RegistrarAsync(CompraCab compra);
    Task<IEnumerable<CompraCab>> ListarAsync();
}