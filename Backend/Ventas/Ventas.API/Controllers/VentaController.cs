using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ventas.Application.DTOs;
using Ventas.Application.Interfaces;

namespace Ventas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VentaController : ControllerBase
{
    private readonly IVentaService _service;

    public VentaController(IVentaService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] RegistrarVentaDto dto)
    {
        var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        try
        {
            var id = await _service.RegistrarAsync(dto, token);
            return Ok(new { idVentaCab = id });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
        => Ok(await _service.ListarAsync());
}