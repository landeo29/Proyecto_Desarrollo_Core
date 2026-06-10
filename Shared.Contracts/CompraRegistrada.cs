namespace Shared.Contracts;

public record CompraRegistrada
{
    public int IdCompraCab { get; init; }
    public List<ProductoCompradoEvento> Productos { get; init; } = new();
}

public record ProductoCompradoEvento
{
    public int IdProducto { get; init; }
    public int Cantidad { get; init; }
    public decimal Costo { get; init; }
}