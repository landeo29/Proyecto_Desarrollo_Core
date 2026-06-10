using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Productos.Application.DTOs;
using Productos.Application.Interfaces;

namespace Productos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductoController : ControllerBase
{
    private readonly IProductoService _service;

    public ProductoController(IProductoService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> Listar()
        => Ok(await _service.ListarAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> ObtenerPorId(int id)
    {
        var producto = await _service.ObtenerPorIdAsync(id);
        return producto is null ? NotFound() : Ok(producto);
    }

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] CrearProductoDto dto)
    {
        var creado = await _service.RegistrarAsync(dto);
        return CreatedAtAction(nameof(ObtenerPorId), new { id = creado.IdProducto }, creado);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Actualizar(int id, [FromBody] ActualizarProductoDto dto)
    {
        if (id != dto.IdProducto) return BadRequest(new { mensaje = "El id no coincide" });
        var actualizado = await _service.ActualizarAsync(dto);
        return actualizado ? NoContent() : NotFound();
    }
}