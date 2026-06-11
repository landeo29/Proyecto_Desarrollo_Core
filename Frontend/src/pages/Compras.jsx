import { useState, useEffect } from "react";
import { Plus, Trash2, PackagePlus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import productoService from "../api/productoService";
import compraService from "../api/compraService";
import Modal from "../components/Modal";

function Compras() {
    const [productos, setProductos] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [precio, setPrecio] = useState(0);
    const [modalAbierto, setModalAbierto] = useState(false);

    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoLote, setNuevoLote] = useState("");
    const [nuevoCosto, setNuevoCosto] = useState(0);

    const cargarProductos = async () => {
        const data = await productoService.listar();
        setProductos(data);
    };

    useEffect(() => {
        let activo = true;
        productoService.listar().then((data) => {
            if (activo) {
                setProductos(data);
            }
        });
        return () => {
            activo = false;
        };
    }, []);

    const agregarDetalle = () => {
        if (!idProducto) {
            toast.error("Selecciona un producto");
            return;
        }
        const prod = productos.find((p) => p.idProducto === parseInt(idProducto));
        setDetalles([
            ...detalles,
            {
                idProducto: parseInt(idProducto),
                nombre: prod?.nombreProducto ?? "",
                cantidad: parseInt(cantidad),
                precio: parseFloat(precio),
            },
        ]);
        setIdProducto("");
        setCantidad(1);
        setPrecio(0);
    };

    const quitarDetalle = (index) =>
        setDetalles(detalles.filter((_, i) => i !== index));

    const totalCompra = detalles.reduce(
        (acc, d) => acc + d.cantidad * d.precio,
        0
    );

    const registrarCompra = async () => {
        if (detalles.length === 0) {
            toast.error("Agrega al menos un producto");
            return;
        }
        try {
            await compraService.registrar({
                detalles: detalles.map((d) => ({
                    idProducto: d.idProducto,
                    cantidad: d.cantidad,
                    precio: d.precio,
                })),
            });
            toast.success("Compra registrada correctamente");
            setDetalles([]);
        } catch {
            toast.error("Error al registrar la compra");
        }
    };

    const crearProducto = async () => {
        try {
            await productoService.registrar({
                nombreProducto: nuevoNombre,
                nroLote: nuevoLote,
                costo: parseFloat(nuevoCosto),
                precioVenta: parseFloat(nuevoCosto) * 1.35,
            });
            setModalAbierto(false);
            setNuevoNombre("");
            setNuevoLote("");
            setNuevoCosto(0);
            await cargarProductos();
            toast.success("Producto creado");
        } catch {
            toast.error("Error al crear el producto");
        }
    };

    const inputDark =
        "bg-white/[0.03] border border-white/10 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition placeholder-gray-600";

    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10">
                    <ShoppingCart className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Registrar Compra</h1>
                    <p className="text-gray-500 text-sm">Agrega productos y registra el ingreso de stock</p>
                </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-6 backdrop-blur-sm">
                <div className="flex gap-3 items-end flex-wrap">
                    <div className="flex-1 min-w-40">
                        <label className="block text-sm text-gray-400 mb-1.5">Producto</label>
                        <select
                            value={idProducto}
                            onChange={(e) => setIdProducto(e.target.value)}
                            className={`w-full ${inputDark}`}
                        >
                            <option value="" className="bg-[#0b0b12]">-- Selecciona --</option>
                            {productos.map((p) => (
                                <option key={p.idProducto} value={p.idProducto} className="bg-[#0b0b12]">
                                    {p.nombreProducto}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-24">
                        <label className="block text-sm text-gray-400 mb-1.5">Cantidad</label>
                        <input type="number" min="1" value={cantidad}
                               onChange={(e) => setCantidad(e.target.value)} className={`w-full ${inputDark}`} />
                    </div>
                    <div className="w-28">
                        <label className="block text-sm text-gray-400 mb-1.5">Costo</label>
                        <input type="number" min="0" step="0.01" value={precio}
                               onChange={(e) => setPrecio(e.target.value)} className={`w-full ${inputDark}`} />
                    </div>
                    <button onClick={agregarDetalle}
                            className="flex items-center gap-2 bg-white/[0.06] border border-white/10 text-white px-4 py-2.5 rounded-xl hover:bg-white/[0.1] transition">
                        <Plus className="w-4 h-4" strokeWidth={2} /> Agregar
                    </button>
                    <button onClick={() => setModalAbierto(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-700/30">
                        <PackagePlus className="w-4 h-4" strokeWidth={2} /> Producto
                    </button>
                </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden mb-6">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-white/[0.08]">
                        <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Producto</th>
                        <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Cantidad</th>
                        <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Costo</th>
                        <th className="text-right px-5 py-3 text-xs uppercase tracking-wider text-gray-500">Subtotal</th>
                        <th className="px-5 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {detalles.length === 0 ? (
                        <tr><td colSpan="5" className="text-center text-gray-600 py-8">Sin productos agregados</td></tr>
                    ) : (
                        detalles.map((d, i) => (
                            <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                                <td className="px-5 py-3 text-gray-200">{d.nombre}</td>
                                <td className="text-right px-5 py-3 text-gray-300">{d.cantidad}</td>
                                <td className="text-right px-5 py-3 text-gray-300">{d.precio.toFixed(2)}</td>
                                <td className="text-right px-5 py-3 text-white font-medium">{(d.cantidad * d.precio).toFixed(2)}</td>
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
                    <span className="text-gray-500 text-sm">Total de la compra</span>
                    <p className="text-2xl font-bold text-white">S/ {totalCompra.toFixed(2)}</p>
                </div>
                <button onClick={registrarCompra}
                        className="shine-btn bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-700/30">
                    Registrar Compra
                </button>
            </div>

            <Modal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} titulo="Nuevo Producto">
                <div className="space-y-3">
                    <input type="text" placeholder="Nombre del producto" value={nuevoNombre}
                           onChange={(e) => setNuevoNombre(e.target.value)} className={`w-full ${inputDark}`} />
                    <input type="text" placeholder="Número de lote" value={nuevoLote}
                           onChange={(e) => setNuevoLote(e.target.value)} className={`w-full ${inputDark}`} />
                    <input type="number" placeholder="Costo" value={nuevoCosto}
                           onChange={(e) => setNuevoCosto(e.target.value)} className={`w-full ${inputDark}`} />
                    <button onClick={crearProducto}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2.5 rounded-xl font-medium hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-700/30">
                        Crear Producto
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Compras;