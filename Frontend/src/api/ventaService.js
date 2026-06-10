import apiClient from "./apiClient";

const ventaService = {
    registrar: async (venta) => {
        const res = await apiClient.post("/ventas/api/Venta", venta);
        return res.data;
    },

    listar: async () => {
        const res = await apiClient.get("/ventas/api/Venta");
        return res.data;
    },
};

export default ventaService;