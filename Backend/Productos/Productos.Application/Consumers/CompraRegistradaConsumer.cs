using MassTransit;
using Productos.Application.Interfaces;
using Shared.Contracts;

namespace Productos.Application.Consumers;

public class CompraRegistradaConsumer : IConsumer<CompraRegistrada>
{
    private readonly IProductoRepository _repository;

    public CompraRegistradaConsumer(IProductoRepository repository)
        => _repository = repository;

    public async Task Consume(ConsumeContext<CompraRegistrada> context)
    {
        foreach (var item in context.Message.Productos)
        {
            await _repository.ActualizarCostoYPrecioAsync(item.IdProducto, item.Costo);
        }
    }
}