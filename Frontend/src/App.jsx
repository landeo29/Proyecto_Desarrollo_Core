import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Compras from "./pages/Compras";
import Ventas from "./pages/Ventas";
import Kardex from "./pages/Kardex";
import Layout from "./components/Layout";

function RutaProtegida({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#12121a",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.1)",
                    },
                    success: { iconTheme: { primary: "#34d399", secondary: "#12121a" } },
                    error: { iconTheme: { primary: "#f87171", secondary: "#12121a" } },
                }}
            />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    element={
                        <RutaProtegida>
                            <Layout />
                        </RutaProtegida>
                    }
                >
                    <Route path="/compras" element={<Compras />} />
                    <Route path="/ventas" element={<Ventas />} />
                    <Route path="/kardex" element={<Kardex />} />
                </Route>
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;