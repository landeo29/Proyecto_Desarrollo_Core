using Ventas.Domain.Entities;

namespace Ventas.Application.Interfaces;

public interface IVentaRepository
{
    Task<VentaCab> RegistrarAsync(VentaCab venta);
    Task<IEnumerable<VentaCab>> ListarAsync();
}