namespace Ventas.Domain.Entities;

public class VentaDet
{
    public int IdVentaDet { get; set; }
    public int IdVentaCab { get; set; }
    public int IdProducto { get; set; }
    public int Cantidad { get; set; }
    public decimal Precio { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Igv { get; set; }
    public decimal Total { get; set; }

    public VentaCab? VentaCab { get; set; }
}