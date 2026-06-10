using MassTransit;
using Movimientos.Application.DTOs;
using Movimientos.Application.Interfaces;
using Shared.Contracts;

namespace Movimientos.Application.Consumers;

public class CompraRegistradaConsumer : IConsumer<CompraRegistrada>
{
    private readonly IMovimientoService _service;

    public CompraRegistradaConsumer(IMovimientoService service)
        => _service = service;

    public async Task Consume(ConsumeContext<CompraRegistrada> context)
    {
        var dto = new RegistrarMovimientoDto
        {
            IdTipoMovimiento = 1,
            IdDocumentoOrigen = context.Message.IdCompraCab,
            Detalles = context.Message.Productos.Select(p => new MovimientoDetDto
            {
                IdProducto = p.IdProducto,
                Cantidad = p.Cantidad
            }).ToList()
        };

        await _service.RegistrarMovimientoAsync(dto);
    }
}
