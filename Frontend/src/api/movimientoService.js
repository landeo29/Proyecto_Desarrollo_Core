import apiClient from "./apiClient";

const movimientoService = {
    obtenerStock: async (idProducto) => {
        const res = await apiClient.get(`/movimientos/api/Movimiento/stock/${idProducto}`);
        return res.data;
    },

    listarPorProducto: async (idProducto) => {
        const res = await apiClient.get(`/movimientos/api/Movimiento/producto/${idProducto}`);
        return res.data;
    },

    productosConMovimiento: async () => {
        const res = await apiClient.get(`/movimientos/api/Movimiento/productos-con-movimiento`);
        return res.data;
    },
};

export default movimientoService;