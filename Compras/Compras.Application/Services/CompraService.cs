using Compras.Application.DTOs;
using Compras.Application.Interfaces;
using Compras.Domain.Entities;
using Shared.Contracts;

namespace Compras.Application.Services;

public class CompraService : ICompraService
{
    private const decimal IGV_RATE = 0.18m;

    private readonly ICompraRepository _repository;
    private readonly IEventPublisher _eventPublisher;

    public CompraService(ICompraRepository repository, IEventPublisher eventPublisher)
    {
        _repository = repository;
        _eventPublisher = eventPublisher;
    }

    public async Task<int> RegistrarAsync(RegistrarCompraDto dto)
    {
        var detalles = dto.Detalles.Select(d =>
        {
            var subtotal = d.Cantidad * d.Precio;
            var igv = subtotal * IGV_RATE;
            return new CompraDet
            {
                IdProducto = d.IdProducto,
                Cantidad = d.Cantidad,
                Precio = d.Precio,
                SubTotal = subtotal,
                Igv = igv,
                Total = subtotal + igv
            };
        }).ToList();

        var compra = new CompraCab
        {
            SubTotal = detalles.Sum(x => x.SubTotal),
            Igv = detalles.Sum(x => x.Igv),
            Total = detalles.Sum(x => x.Total),
            Detalles = detalles
        };

        var creada = await _repository.RegistrarAsync(compra);

        await _eventPublisher.PublishAsync(new CompraRegistrada
        {
            IdCompraCab = creada.IdCompraCab,
            Productos = creada.Detalles.Select(d => new ProductoCompradoEvento
            {
                IdProducto = d.IdProducto,
                Cantidad = d.Cantidad,
                Costo = d.Precio
            }).ToList()
        });

        return creada.IdCompraCab;
    }

    public async Task<IEnumerable<CompraDto>> ListarAsync()
    {
        var compras = await _repository.ListarAsync();
        return compras.Select(c => new CompraDto
        {
            IdCompraCab = c.IdCompraCab,
            FecRegistro = c.FecRegistro,
            SubTotal = c.SubTotal,
            Igv = c.Igv,
            Total = c.Total,
            Detalles = c.Detalles.Select(d => new CompraDetItemDto
            {
                IdProducto = d.IdProducto,
                Cantidad = d.Cantidad,
                Precio = d.Precio
            }).ToList()
        });
    }
}