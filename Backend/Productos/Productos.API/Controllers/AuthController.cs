using Microsoft.AspNetCore.Mvc;
using Productos.Application.Interfaces;

namespace Productos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly ITokenService _tokenService;

    public AuthController(IUsuarioRepository usuarioRepository, ITokenService tokenService)
    {
        _usuarioRepository = usuarioRepository;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var usuario = await _usuarioRepository.ObtenerPorNombreAsync(request.Usuario);

        if (usuario is null || !BCrypt.Net.BCrypt.Verify(request.Password, usuario.PasswordHash))
            return Unauthorized(new { mensaje = "Credenciales inválidas" });

        var token = _tokenService.GenerarToken(usuario.NombreUsuario);
        return Ok(new { token });
    }
}

public record LoginRequest(string Usuario, string Password);