import { useState, useEffect } from "react";
import { Plus, Trash2, DollarSign } from "lucide-react";
import productoService from "../api/productoService";
import movimientoService from "../api/movimientoService";
import ventaService from "../api/ventaService";
import toast from "react-hot-toast";

function Ventas() {
    const [productos, setProductos] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [stockDisponible, setStockDisponible] = useState(null);
    const [precioVenta, setPrecioVenta] = useState(0);

    useEffect(() => {
        productoService.listar().then(setProductos);
    }, []);

    const seleccionarProducto = async (id) => {
        setIdProducto(id);
        setStockDisponible(null);
        if (!id) {
            setPrecioVenta(0);
            return;
        }
        const prod = productos.find((p) => p.idProducto === parseInt(id));
        setPrecioVenta(prod?.precioVenta ?? 0);
        const stock = await movimientoService.obtenerStock(parseInt(id));
        setStockDisponible(stock.stockActual);
    };

    const agregarDetalle = () => {
        if (!idProducto) {
            toast.error("Selecciona un producto");
            return;
        }
        const cant = parseInt(cantidad);
        if (cant > stockDisponible) {
            toast.error(
                `La cantidad no debe ser mayor al stock (disponible: ${stockDisponible})`
            );
            return;
        }
        const prod = productos.find((p) => p.idProducto === parseInt(idProducto));
        const subtotal = cant * precioVenta;
        const igv = subtotal * 0.18;
        setDetalles([
            ...detalles,
            {
                idProducto: parseInt(idProducto),
                nombre: prod?.nombreProducto ?? "",
                cantidad: cant,
                precio: precioVenta,
                subtotal,
                igv,
                total: subtotal + igv,
            },
        ]);
        setIdProducto("");
        setCantidad(1);
        setStockDisponible(null);
        setPrecioVenta(0);
    };

    const quitarDetalle = (index) =>
        setDetalles(detalles.filter((_, i) => i !== index));

    const totalGeneral = detalles.reduce((acc, d) => acc + d.total, 0);

    const registrarVenta = async () => {
        if (detalles.length === 0) {
            toast.error("Agrega al menos un producto");
            return;
        }
        try {
            await ventaService.registrar({
                detalles: detalles.map((d) => ({
                    idProducto: d.idProducto,
                    cantidad: d.cantidad,
                    precio: d.precio,
                })),
            });
            toast.success("Venta registrada correctamente");
            setDetalles([]);
        } catch (err) {
            const msg = err.response?.data?.mensaje ?? "Error al registrar la venta";
            toast.error(msg);
        }
    };

    const inputDark =
        "bg-white/[0.03] border border-white/10 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition placeholder-gray-600";
    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10">
                    <DollarSign className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Registrar Venta</h1>
                    <p className="text-gray-500 text-sm">Vende productos validando el stock disponible</p>
                </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-6">
                <div className="flex gap-3 items-end flex-wrap">
                    <div className="flex-1 min-w-40">
                        <label className="block text-sm text-gray-400 mb-1.5">Producto</label>
                        <select value={idProducto} onChange={(e) => seleccionarProducto(e.target.value)} className={`w-full ${inputDark}`}>
                            <option value="" className="bg-[#0b0b12]">-- Selecciona --</option>
                            {productos.map((p) => (
                                <option key={p.idProducto} value={p.idProducto} className="bg-[#0b0b12]">{p.nombreProducto}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-24">
                        <label className="block text-sm text-gray-400 mb-1.5">Cantidad</label>
                        <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className={`w-full ${inputDark}`} />
                    </div>
                    <button onClick={agregarDetalle}
                            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-700/30">
                        <Plus className="w-4 h-4" strokeWidth={2} /> Agregar
                    </button>
                </div>

                {idProducto && (
                    <div className="mt-4 flex gap-3 flex-wrap">
                        <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                            <span className="text-xs text-gray-500">Precio venta</span>
                            <p className="text-white font-medium">S/ {precioVenta.toFixed(2)}</p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                            <span className="text-xs text-gray-500">Stock disponible</span>
                            <p className={`font-medium ${stockDisponible > 0 ? "text-emerald-400" : "text-red-400"}`}>
                                {stockDisponible ?? "..."}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden mb-6">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-white/[0.08]">
                        <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Producto</th>
                        <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Cant.</th>
                        <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Precio</th>
                        <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Subtotal</th>
                        <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">IGV</th>
                        <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Total</th>
                        <th className="px-5 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {detalles.length === 0 ? (
                        <tr><td colSpan="7" className="text-center text-gray-600 py-8">Sin productos agregados</td></tr>
                    ) : (
                        detalles.map((d, i) => (
                            <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                                <td className="px-5 py-3 text-gray-200">{d.nombre}</td>
                                <td className="text-right px-5 py-3 text-gray-300">{d.cantidad}</td>
                                <td className="text-right px-5 py-3 text-gray-300">{d.precio.toFixed(2)}</td>
                                <td className="text-right px-5 py-3 text-gray-300">{d.subtotal.toFixed(2)}</td>
                                <td className="text-right px-5 py-3 text-gray-400">{d.igv.toFixed(2)}</td>
                                <td className="text-right px-5 py-3 text-white font-medium">{d.total.toFixed(2)}</td>
                                <td className="text-center px-5 py-3">
                                    <button onClick={() => quitarDetalle(i)} className="text-gray-500 hover:text-red-400 transition">
                                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                <div>
                    <span className="text-gray-500 text-sm">Total de la venta</span>
                    <p className="text-2xl font-bold text-white">S/ {totalGeneral.toFixed(2)}</p>
                </div>
                <button onClick={registrarVenta}
                        className="shine-btn bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-700/30">
                    Registrar Venta
                </button>
            </div>


        </div>
    );
}

export default Ventas;