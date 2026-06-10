using Microsoft.EntityFrameworkCore;
using Ventas.Domain.Entities;

namespace Ventas.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<VentaCab> VentasCab => Set<VentaCab>();
    public DbSet<VentaDet> VentasDet => Set<VentaDet>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<VentaCab>(e =>
        {
            e.ToTable("VentaCab");
            e.HasKey(v => v.IdVentaCab);
            e.Property(v => v.IdVentaCab).HasColumnName("Id_VentaCab");
            e.Property(v => v.FecRegistro).HasColumnName("fecRegistro");
            e.Property(v => v.SubTotal).HasColumnName("SubTotal").HasColumnType("decimal(18,2)");
            e.Property(v => v.Igv).HasColumnName("Igv").HasColumnType("decimal(18,2)");
            e.Property(v => v.Total).HasColumnName("Total").HasColumnType("decimal(18,2)");
            e.HasMany(v => v.Detalles).WithOne(d => d.VentaCab).HasForeignKey(d => d.IdVentaCab);
        });

        modelBuilder.Entity<VentaDet>(e =>
        {
            e.ToTable("VentaDet");
            e.HasKey(d => d.IdVentaDet);
            e.Property(d => d.IdVentaDet).HasColumnName("Id_VentaDet");
            e.Property(d => d.IdVentaCab).HasColumnName("Id_VentaCab");
            e.Property(d => d.IdProducto).HasColumnName("Id_producto");
            e.Property(d => d.Cantidad).HasColumnName("Cantidad");
            e.Property(d => d.Precio).HasColumnName("Precio").HasColumnType("decimal(18,2)");
            e.Property(d => d.SubTotal).HasColumnName("Sub_Total").HasColumnType("decimal(18,2)");
            e.Property(d => d.Igv).HasColumnName("Igv").HasColumnType("decimal(18,2)");
            e.Property(d => d.Total).HasColumnName("Total").HasColumnType("decimal(18,2)");
        });
    }
}