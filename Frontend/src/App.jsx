import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Compras from "./pages/Compras";
import Ventas from "./pages/Ventas";
import Kardex from "./pages/Kardex.jsx";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/compras" element={<Compras />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/kardex" element={<Kardex />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;