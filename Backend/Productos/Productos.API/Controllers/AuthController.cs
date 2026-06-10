using Microsoft.AspNetCore.Mvc;
using Productos.Application.Interfaces;

namespace Productos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;

    public AuthController(ITokenService tokenService) => _tokenService = tokenService;

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (request.Usuario == "admin" && request.Password == "123456")
            return Ok(new { token = _tokenService.GenerarToken(request.Usuario) });

        return Unauthorized(new { mensaje = "Credenciales inválidas" });
    }
}

public record LoginRequest(string Usuario, string Password);