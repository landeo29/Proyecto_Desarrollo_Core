import apiClient from "./apiClient";

const compraService = {
    registrar: async (compra) => {
        const res = await apiClient.post("/compras/api/Compra", compra);
        return res.data;
    },

    listar: async () => {
        const res = await apiClient.get("/compras/api/Compra");
        return res.data;
    },
};

export default compraService;