import { useState, useEffect } from "react";
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
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Kardex de Productos</h1>

            {cargando ? (
                <p className="text-center text-gray-400 py-8">Cargando...</p>
            ) : (
                <table className="w-full bg-white rounded-xl shadow overflow-hidden">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2 text-sm text-gray-600">ID</th>
                        <th className="text-left px-4 py-2 text-sm text-gray-600">Producto</th>
                        <th className="text-right px-4 py-2 text-sm text-gray-600">Stock</th>
                        <th className="text-right px-4 py-2 text-sm text-gray-600">Costo</th>
                        <th className="text-right px-4 py-2 text-sm text-gray-600">Precio Venta</th>
                        <th className="text-center px-4 py-2 text-sm text-gray-600">Movimientos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filas.map((f) => (
                        <tr key={f.idProducto} className="border-t">
                            <td className="px-4 py-2">{f.idProducto}</td>
                            <td className="px-4 py-2">{f.nombreProducto}</td>
                            <td className="text-right px-4 py-2">
                  <span className={f.stockActual > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {f.stockActual}
                  </span>
                            </td>
                            <td className="text-right px-4 py-2">S/ {f.costo.toFixed(2)}</td>
                            <td className="text-right px-4 py-2">S/ {f.precioVenta.toFixed(2)}</td>
                            <td className="text-center px-4 py-2">
                                <button
                                    onClick={() => verMovimientos(f)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                                >
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <Modal
                abierto={modalAbierto}
                onCerrar={() => setModalAbierto(false)}
                titulo={`Movimientos: ${productoSel?.nombreProducto ?? ""}`}
            >
                {movimientos.length === 0 ? (
                    <p className="text-center text-gray-400 py-4">Sin movimientos</p>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-3 py-2 text-sm text-gray-600">Fecha</th>
                            <th className="text-left px-3 py-2 text-sm text-gray-600">Tipo</th>
                            <th className="text-right px-3 py-2 text-sm text-gray-600">Cantidad</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movimientos.map((m, i) => (
                            <tr key={i} className="border-t">
                                <td className="px-3 py-2 text-sm">
                                    {new Date(m.fecRegistro).toLocaleDateString()}
                                </td>
                                <td className="px-3 py-2">
                    <span
                        className={
                            m.tipoMovimiento === "Entrada"
                                ? "text-green-600 text-sm font-medium"
                                : "text-red-600 text-sm font-medium"
                        }
                    >
                      {m.tipoMovimiento}
                    </span>
                                </td>
                                <td className="text-right px-3 py-2">{m.cantidad}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </Modal>
        </div>
    );
}

export default Kardex;