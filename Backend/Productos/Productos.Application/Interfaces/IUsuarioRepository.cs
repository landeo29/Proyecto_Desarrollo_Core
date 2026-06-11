using Productos.Domain.Entities;

namespace Productos.Application.Interfaces;

public interface IUsuarioRepository
{
    Task<Usuario?> ObtenerPorNombreAsync(string nombreUsuario);
}