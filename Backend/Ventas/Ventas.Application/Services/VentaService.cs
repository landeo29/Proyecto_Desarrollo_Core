using Ventas.Application.DTOs;
using Ventas.Application.Interfaces;
using Ventas.Domain.Entities;
using Shared.Contracts;

namespace Ventas.Application.Services;

public class VentaService : IVentaService
{
    private const decimal IGV_RATE = 0.18m;

    private readonly IVentaRepository _repository;
    private readonly IStockService _stockService;
    private readonly IEventPublisher _eventPublisher;

    public VentaService(
        IVentaRepository repository,
        IStockService stockService,
        IEventPublisher eventPublisher)
    {
        _repository = repository;
        _stockService = stockService;
        _eventPublisher = eventPublisher;
    }

    public async Task<int> RegistrarAsync(RegistrarVentaDto dto, string token)
    {
        // vañidar stock
        foreach (var item in dto.Detalles)
        {
            var stock = await _stockService.ObtenerStockAsync(item.IdProducto, token);
            if (item.Cantidad > stock)
                throw new InvalidOperationException(
                    $"Stock insuficiente para el producto {item.IdProducto}. Disponible: {stock}, solicitado: {item.Cantidad}.");
        }

        // calculo d totales
        var detalles = dto.Detalles.Select(d =>
        {
            var subtotal = d.Cantidad * d.Precio;
            var igv = subtotal * IGV_RATE;
            return new VentaDet
            {
                IdProducto = d.IdProducto,
                Cantidad = d.Cantidad,
                Precio = d.Precio,
                SubTotal = subtotal,
                Igv = igv,
                Total = subtotal + igv
            };
        }).ToList();

        var venta = new VentaCab
        {
            SubTotal = detalles.Sum(x => x.SubTotal),
            Igv = detalles.Sum(x => x.Igv),
            Total = detalles.Sum(x => x.Total),
            Detalles = detalles
        };

        var creada = await _repository.RegistrarAsync(venta);

        // eventi de publicciom aasincrono
        await _eventPublisher.PublishAsync(new VentaRegistrada
        {
            IdVentaCab = creada.IdVentaCab,
            Productos = creada.Detalles.Select(d => new ProductoVendidoEvento
            {
                IdProducto = d.IdProducto,
                Cantidad = d.Cantidad
            }).ToList()
        });

        return creada.IdVentaCab;
    }

    public async Task<IEnumerable<VentaDto>> ListarAsync()
    {
        var ventas = await _repository.ListarAsync();
        return ventas.Select(v => new VentaDto
        {
            IdVentaCab = v.IdVentaCab,
            FecRegistro = v.FecRegistro,
            SubTotal = v.SubTotal,
            Igv = v.Igv,
            Total = v.Total,
            Detalles = v.Detalles.Select(d => new VentaDetItemDto
            {
                IdProducto = d.IdProducto,
                Cantidad = d.Cantidad,
                Precio = d.Precio
            }).ToList()
        });
    }
}