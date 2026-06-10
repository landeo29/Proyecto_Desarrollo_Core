namespace Shared.Contracts;

public record VentaRegistrada
{
    public int IdVentaCab { get; init; }
    public List<ProductoVendidoEvento> Productos { get; init; } = new();
}

public record ProductoVendidoEvento
{
    public int IdProducto { get; init; }
    public int Cantidad { get; init; }
}