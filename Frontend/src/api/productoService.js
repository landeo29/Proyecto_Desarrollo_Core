import apiClient from "./apiClient";

const productoService = {
    listar: async () => {
        const res = await apiClient.get("/productos/api/Producto");
        return res.data;
    },

    obtenerPorId: async (id) => {
        const res = await apiClient.get(`/productos/api/Producto/${id}`);
        return res.data;
    },

    registrar: async (producto) => {
        const res = await apiClient.post("/productos/api/Producto", producto);
        return res.data;
    },
};

export default productoService;