using Compras.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Compras.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<CompraCab> ComprasCab => Set<CompraCab>();
    public DbSet<CompraDet> ComprasDet => Set<CompraDet>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CompraCab>(e =>
        {
            e.ToTable("CompraCab");
            e.HasKey(c => c.IdCompraCab);
            e.Property(c => c.IdCompraCab).HasColumnName("Id_CompraCab");
            e.Property(c => c.FecRegistro).HasColumnName("FecRegistro");
            e.Property(c => c.SubTotal).HasColumnName("SubTotal").HasColumnType("decimal(18,2)");
            e.Property(c => c.Igv).HasColumnName("Igv").HasColumnType("decimal(18,2)");
            e.Property(c => c.Total).HasColumnName("Total").HasColumnType("decimal(18,2)");
            e.HasMany(c => c.Detalles).WithOne(d => d.CompraCab).HasForeignKey(d => d.IdCompraCab);
        });

        modelBuilder.Entity<CompraDet>(e =>
        {
            e.ToTable("CompraDet");
            e.HasKey(d => d.IdCompraDet);
            e.Property(d => d.IdCompraDet).HasColumnName("Id_CompraDet");
            e.Property(d => d.IdCompraCab).HasColumnName("Id_CompraCab");
            e.Property(d => d.IdProducto).HasColumnName("Id_producto");
            e.Property(d => d.Cantidad).HasColumnName("Cantidad");
            e.Property(d => d.Precio).HasColumnName("Precio").HasColumnType("decimal(18,2)");
            e.Property(d => d.SubTotal).HasColumnName("Sub_Total").HasColumnType("decimal(18,2)");
            e.Property(d => d.Igv).HasColumnName("Igv").HasColumnType("decimal(18,2)");
            e.Property(d => d.Total).HasColumnName("Total").HasColumnType("decimal(18,2)");
        });
    }
}