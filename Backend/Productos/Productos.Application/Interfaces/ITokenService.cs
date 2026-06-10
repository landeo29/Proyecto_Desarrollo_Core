namespace Productos.Application.Interfaces;

public interface ITokenService
{
    string GenerarToken(string usuario);
}