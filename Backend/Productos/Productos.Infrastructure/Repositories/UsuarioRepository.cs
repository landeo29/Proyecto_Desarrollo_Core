using Microsoft.EntityFrameworkCore;
using Productos.Application.Interfaces;
using Productos.Domain.Entities;
using Productos.Infrastructure.Persistence;

namespace Productos.Infrastructure.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDbContext _context;

    public UsuarioRepository(AppDbContext context) => _context = context;

    public async Task<Usuario?> ObtenerPorNombreAsync(string nombreUsuario)
        => await _context.Usuarios
            .FirstOrDefaultAsync(u => u.NombreUsuario == nombreUsuario);
}