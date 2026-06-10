using Microsoft.EntityFrameworkCore;
using Productos.Domain.Entities;

namespace Productos.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Producto> Productos => Set<Producto>();

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
    }
}