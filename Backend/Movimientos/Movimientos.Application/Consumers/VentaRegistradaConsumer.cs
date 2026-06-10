using MassTransit;
using Movimientos.Application.DTOs;
using Movimientos.Application.Interfaces;
using Shared.Contracts;

namespace Movimientos.Application.Consumers;

public class VentaRegistradaConsumer : IConsumer<VentaRegistrada>
{
    private readonly IMovimientoService _service;

    public VentaRegistradaConsumer(IMovimientoService service)
        => _service = service;

    public async Task Consume(ConsumeContext<VentaRegistrada> context)
    {
        var dto = new RegistrarMovimientoDto
        {
            IdTipoMovimiento = 2,   //salida o resta de stoc
            IdDocumentoOrigen = context.Message.IdVentaCab,
            Detalles = context.Message.Productos.Select(p => new MovimientoDetDto
            {
                IdProducto = p.IdProducto,
                Cantidad = p.Cantidad
            }).ToList()
        };

        await _service.RegistrarMovimientoAsync(dto);
    }
}