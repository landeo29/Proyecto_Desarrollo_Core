using Microsoft.EntityFrameworkCore;
using Movimientos.Domain.Entities;

namespace Movimientos.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<MovimientoCab> MovimientosCab => Set<MovimientoCab>();
    public DbSet<MovimientoDet> MovimientosDet => Set<MovimientoDet>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MovimientoCab>(entity =>
        {
            entity.ToTable("MovimientoCab");
            entity.HasKey(m => m.IdMovimientoCab);

            entity.Property(m => m.IdMovimientoCab).HasColumnName("Id_MovimientoCab");
            entity.Property(m => m.FecRegistro).HasColumnName("Fec_registro");
            entity.Property(m => m.IdTipoMovimiento).HasColumnName("Id_TipoMovimiento").HasConversion<int>();
            entity.Property(m => m.IdDocumentoOrigen).HasColumnName("Id_DocumentoOrigen");

            entity.HasMany(m => m.Detalles)
                .WithOne(d => d.MovimientoCab)
                .HasForeignKey(d => d.IdMovimientoCab);
        });

        modelBuilder.Entity<MovimientoDet>(entity =>
        {
            entity.ToTable("MovimientoDet");
            entity.HasKey(d => d.IdMovimientoDet);

            entity.Property(d => d.IdMovimientoDet).HasColumnName("Id_MovimientoDet");
            entity.Property(d => d.IdMovimientoCab).HasColumnName("Id_movimientocab");
            entity.Property(d => d.IdProducto).HasColumnName("Id_Producto");
            entity.Property(d => d.Cantidad).HasColumnName("Cantidad");
        });
    }
}