import { useState, useEffect } from "react";
import productoService from "../api/productoService";
import movimientoService from "../api/movimientoService";
import ventaService from "../api/ventaService";

function Ventas() {
    const [productos, setProductos] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [stockDisponible, setStockDisponible] = useState(null);
    const [precioVenta, setPrecioVenta] = useState(0);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        productoService.listar().then(setProductos);
    }, []);

    const seleccionarProducto = async (id) => {
        setIdProducto(id);
        setStockDisponible(null);
        setMensaje("");
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
            setMensaje("Selecciona un producto");
            return;
        }
        const cant = parseInt(cantidad);
        if (cant > stockDisponible) {
            setMensaje(`La cantidad no debe ser mayor al stock (disponible: ${stockDisponible})`);
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
        setMensaje("");
    };

    const quitarDetalle = (index) => {
        setDetalles(detalles.filter((_, i) => i !== index));
    };

    const totalGeneral = detalles.reduce((acc, d) => acc + d.total, 0);

    const registrarVenta = async () => {
        if (detalles.length === 0) {
            setMensaje("Agrega al menos un producto");
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
            setMensaje("Venta registrada correctamente");
            setDetalles([]);
        } catch (err) {
            const msg = err.response?.data?.mensaje ?? "Error al registrar la venta";
            setMensaje(`${msg}`);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Registrar Venta</h1>

            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <div className="flex gap-3 items-end flex-wrap">
                    <div className="flex-1 min-w-40">
                        <label className="block text-sm text-gray-600 mb-1">Producto</label>
                        <select
                            value={idProducto}
                            onChange={(e) => seleccionarProducto(e.target.value)}
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
                    <button
                        onClick={agregarDetalle}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Agregar
                    </button>
                </div>

                {idProducto && (
                    <div className="mt-3 flex gap-6 text-sm">
            <span className="text-gray-600">
              Precio venta: <b className="text-gray-800">S/ {precioVenta.toFixed(2)}</b>
            </span>
                        <span className="text-gray-600">
              Stock disponible:{" "}
                            <b className={stockDisponible > 0 ? "text-green-600" : "text-red-600"}>
                {stockDisponible ?? "..."}
              </b>
            </span>
                    </div>
                )}
            </div>

            <table className="w-full bg-white rounded-xl shadow overflow-hidden mb-4">
                <thead className="bg-gray-100">
                <tr>
                    <th className="text-left px-4 py-2 text-sm text-gray-600">Producto</th>
                    <th className="text-right px-4 py-2 text-sm text-gray-600">Cant.</th>
                    <th className="text-right px-4 py-2 text-sm text-gray-600">Precio</th>
                    <th className="text-right px-4 py-2 text-sm text-gray-600">Subtotal</th>
                    <th className="text-right px-4 py-2 text-sm text-gray-600">IGV</th>
                    <th className="text-right px-4 py-2 text-sm text-gray-600">Total</th>
                    <th className="px-4 py-2"></th>
                </tr>
                </thead>
                <tbody>
                {detalles.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center text-gray-400 py-4">
                            Sin productos agregados
                        </td>
                    </tr>
                ) : (
                    detalles.map((d, i) => (
                        <tr key={i} className="border-t">
                            <td className="px-4 py-2">{d.nombre}</td>
                            <td className="text-right px-4 py-2">{d.cantidad}</td>
                            <td className="text-right px-4 py-2">{d.precio.toFixed(2)}</td>
                            <td className="text-right px-4 py-2">{d.subtotal.toFixed(2)}</td>
                            <td className="text-right px-4 py-2">{d.igv.toFixed(2)}</td>
                            <td className="text-right px-4 py-2 font-medium">{d.total.toFixed(2)}</td>
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
          Total: S/ {totalGeneral.toFixed(2)}
        </span>
                <button
                    onClick={registrarVenta}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Registrar Venta
                </button>
            </div>

            {mensaje && (
                <p className="mt-4 text-center font-medium text-gray-700">{mensaje}</p>
            )}
        </div>
    );
}

export default Ventas;