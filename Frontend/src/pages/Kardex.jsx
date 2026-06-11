import { useState, useEffect } from "react";
import { Package, Eye, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import productoService from "../api/productoService";
import movimientoService from "../api/movimientoService";
import Modal from "../components/Modal";

function Kardex() {
    const [filas, setFilas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [movimientos, setMovimientos] = useState([]);
    const [productoSel, setProductoSel] = useState(null);

    const cargarKardex = async () => {
        setCargando(true);
        const productos = await productoService.listar();
        const filasConStock = await Promise.all(
            productos.map(async (p) => {
                const stock = await movimientoService.obtenerStock(p.idProducto);
                return {
                    idProducto: p.idProducto,
                    nombreProducto: p.nombreProducto,
                    stockActual: stock.stockActual,
                    costo: p.costo,
                    precioVenta: p.precioVenta,
                };
            })
        );
        setFilas(filasConStock);
        setCargando(false);
    };

    useEffect(() => {
        cargarKardex();
    }, []);

    const verMovimientos = async (producto) => {
        setProductoSel(producto);
        setModalAbierto(true);
        const data = await movimientoService.listarPorProducto(producto.idProducto);
        setMovimientos(data);
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10">
                    <Package className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Kardex de Productos</h1>
                    <p className="text-gray-500 text-sm">Stock actual y movimientos por producto</p>
                </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
                {cargando ? (
                    <p className="text-center text-gray-500 py-12">Cargando...</p>
                ) : (
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-white/[0.08]">
                            <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-gray-500">ID</th>
                            <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Producto</th>
                            <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Stock</th>
                            <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Costo</th>
                            <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Precio Venta</th>
                            <th className="text-center px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Movimientos</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filas.map((f) => (
                            <tr key={f.idProducto} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                                <td className="px-5 py-3 text-gray-400">{f.idProducto}</td>
                                <td className="px-5 py-3 text-gray-200">{f.nombreProducto}</td>
                                <td className="text-right px-5 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-medium ${
                        f.stockActual > 0
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {f.stockActual}
                    </span>
                                </td>
                                <td className="text-right px-5 py-3 text-gray-300">S/ {f.costo.toFixed(2)}</td>
                                <td className="text-right px-5 py-3 text-gray-300">S/ {f.precioVenta.toFixed(2)}</td>
                                <td className="text-center px-5 py-3">
                                    <button onClick={() => verMovimientos(f)}
                                            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 text-gray-200 px-3 py-1.5 rounded-lg text-sm hover:bg-white/[0.1] hover:text-white transition">
                                        <Eye className="w-4 h-4" strokeWidth={1.5} /> Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} titulo={`Movimientos: ${productoSel?.nombreProducto ?? ""}`}>
                {movimientos.length === 0 ? (
                    <p className="text-center text-gray-500 py-6">Sin movimientos</p>
                ) : (
                    <div className="max-h-80 overflow-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-white/[0.08]">
                                <th className="text-left px-3 py-2 text-xs uppercase tracking-wider text-gray-500">Fecha</th>
                                <th className="text-left px-3 py-2 text-xs uppercase tracking-wider text-gray-500">Tipo</th>
                                <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">Cantidad</th>
                            </tr>
                            </thead>
                            <tbody>
                            {movimientos.map((m, i) => (
                                <tr key={i} className="border-b border-white/[0.04]">
                                    <td className="px-3 py-2.5 text-sm text-gray-300">{new Date(m.fecRegistro).toLocaleDateString()}</td>
                                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                          m.tipoMovimiento === "Entrada" ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {m.tipoMovimiento === "Entrada"
                            ? <ArrowDownCircle className="w-4 h-4" strokeWidth={1.5} />
                            : <ArrowUpCircle className="w-4 h-4" strokeWidth={1.5} />}
                          {m.tipoMovimiento}
                      </span>
                                    </td>
                                    <td className="text-right px-3 py-2.5 text-gray-200">{m.cantidad}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Kardex;