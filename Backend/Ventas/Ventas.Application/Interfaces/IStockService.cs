namespace Ventas.Application.Interfaces;

public interface IStockService
{
    Task<int> ObtenerStockAsync(int idProducto, string token);
}