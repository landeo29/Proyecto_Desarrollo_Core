using Microsoft.EntityFrameworkCore;
using Productos.Domain.Entities;

namespace Productos.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Producto> Productos => Set<Producto>();
    public DbSet<Usuario> Usuarios => Set<Usuario>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Producto>(entity =>
        {
            entity.ToTable("Producto");
            entity.HasKey(p => p.IdProducto);
            entity.Property(p => p.IdProducto).HasColumnName("Id_producto");
            entity.Property(p => p.NombreProducto).HasColumnName("Nombre_producto").HasMaxLength(150).IsRequired();
            entity.Property(p => p.NroLote).HasColumnName("NroLote").HasMaxLength(50);
            entity.Property(p => p.FecRegistro).HasColumnName("Fec_registro");
            entity.Property(p => p.Costo).HasColumnName("Costo").HasColumnType("decimal(18,2)");
            entity.Property(p => p.PrecioVenta).HasColumnName("PrecioVenta").HasColumnType("decimal(18,2)");
        }); 

        modelBuilder.Entity<Usuario>(entity =>  
        {
            entity.ToTable("Usuario");
            entity.HasKey(u => u.IdUsuario);
            entity.Property(u => u.IdUsuario).HasColumnName("Id_Usuario");
            entity.Property(u => u.NombreUsuario).HasColumnName("Nombre_Usuario").HasMaxLength(100).IsRequired();
            entity.Property(u => u.PasswordHash).HasColumnName("Password_Hash").IsRequired();
            
        });
    }
}