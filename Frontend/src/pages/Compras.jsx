import { useState, useEffect } from "react";
import productoService from "../api/productoService";
import compraService from "../api/compraService";
import Modal from "../components/Modal";

function Compras() {
    const [productos, setProductos] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [precio, setPrecio] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);

    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoLote, setNuevoLote] = useState("");
    const [nuevoCosto, setNuevoCosto] = useState(0);

    const cargarProductos = async () => {
        const data = await productoService.listar();
        setProductos(data);
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const agregarDetalle = () => {
        if (!idProducto) {
            setMensaje("Selecciona un producto");
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
        setMensaje("");
    };

    const quitarDetalle = (index) => {
        setDetalles(detalles.filter((_, i) => i !== index));
    };

    const totalCompra = detalles.reduce(
        (acc, d) => acc + d.cantidad * d.precio,
        0
    );

    const registrarCompra = async () => {
        if (detalles.length === 0) {
            setMensaje("Agrega al menos un producto");
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
            setMensaje("Compra registrada correctamente");
            setDetalles([]);
        } catch {
            setMensaje("Error al registrar la compra");
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
            setMensaje("Producto creado");
        } catch {
            setMensaje("Error al crear el producto");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Registrar Compra</h1>

            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <div className="flex gap-3 items-end flex-wrap">
                    <div className="flex-1 min-w-40">
                        <label className="block text-sm text-gray-600 mb-1">Producto</label>
                        <select
                            value={idProducto}
                            onChange={(e) => setIdProducto(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">-- Selecciona --</option>
                            {productos.map((p) => (
                                <option key={p.idProducto} value={p.idProducto}>
                                    {p.nombreProducto}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-24">
                        <label className="block text-sm text-gray-600 mb-1">Cantidad</label>
                        <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="w-28">
                        <label className="block text-sm text-gray-600 mb-1">Costo</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>
                    <button
                        onClick={agregarDetalle}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Agregar
                    </button>
                    <button
                        onClick={() => setModalAbierto(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        + Producto
                    </button>
                </div>
            </div>

            <table className="w-full bg-white rounded-xl shadow overflow-hidden mb-4">
                <thead className="bg-gray-100">
                <tr>
                    <th className="text-left px-4 py-2 text-sm text-gray-600">Producto</th>
                    <th className="text-right px-4 py-2 text-sm text-gray-600">Cantidad</th>
                    <th className="text-right px-4 py-2 text-sm text-gray-600">Costo</th>
                    <th className="text-right px-4 py-2 text-sm text-gray-600">Subtotal</th>
                    <th className="px-4 py-2"></th>
                </tr>
                </thead>
                <tbody>
                {detalles.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center text-gray-400 py-4">
                            Sin productos agregados
                        </td>
                    </tr>
                ) : (
                    detalles.map((d, i) => (
                        <tr key={i} className="border-t">
                            <td className="px-4 py-2">{d.nombre}</td>
                            <td className="text-right px-4 py-2">{d.cantidad}</td>
                            <td className="text-right px-4 py-2">{d.precio.toFixed(2)}</td>
                            <td className="text-right px-4 py-2">
                                {(d.cantidad * d.precio).toFixed(2)}
                            </td>
                            <td className="text-center px-4 py-2">
                                <button
                                    onClick={() => quitarDetalle(i)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Quitar
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            <div className="flex justify-between items-center bg-white rounded-xl shadow p-4">
        <span className="text-lg font-bold text-gray-800">
          Total: S/ {totalCompra.toFixed(2)}
        </span>
                <button
                    onClick={registrarCompra}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Registrar Compra
                </button>
            </div>

            {mensaje && (
                <p className="mt-4 text-center font-medium text-gray-700">{mensaje}</p>
            )}

            <Modal
                abierto={modalAbierto}
                onCerrar={() => setModalAbierto(false)}
                titulo="Nuevo Producto"
            >
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Número de lote"
                        value={nuevoLote}
                        onChange={(e) => setNuevoLote(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Costo"
                        value={nuevoCosto}
                        onChange={(e) => setNuevoCosto(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <button
                        onClick={crearProducto}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                        Crear Producto
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Compras;