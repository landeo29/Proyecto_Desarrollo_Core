using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Movimientos.Application.DTOs;
using Movimientos.Application.Interfaces;

namespace Movimientos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MovimientoController : ControllerBase
{
    private readonly IMovimientoService _service;

    public MovimientoController(IMovimientoService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] RegistrarMovimientoDto dto)
    {
        var id = await _service.RegistrarMovimientoAsync(dto);
        return Ok(new { idMovimientoCab = id });
    }

    [HttpGet("stock/{idProducto:int}")]
    public async Task<IActionResult> ObtenerStock(int idProducto)
        => Ok(await _service.ObtenerStockAsync(idProducto));

    [HttpGet("producto/{idProducto:int}")]
    public async Task<IActionResult> ListarPorProducto(int idProducto)
        => Ok(await _service.ListarPorProductoAsync(idProducto));

    [HttpGet("productos-con-movimiento")]
    public async Task<IActionResult> ProductosConMovimiento()
        => Ok(await _service.ObtenerIdsProductosConMovimientoAsync());
}