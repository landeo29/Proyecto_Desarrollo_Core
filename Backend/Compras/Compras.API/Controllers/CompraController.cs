using Compras.Application.DTOs;
using Compras.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Compras.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CompraController : ControllerBase
{
    private readonly ICompraService _service;

    public CompraController(ICompraService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] RegistrarCompraDto dto)
    {
        var id = await _service.RegistrarAsync(dto);
        return Ok(new { idCompraCab = id });
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
        => Ok(await _service.ListarAsync());
}


