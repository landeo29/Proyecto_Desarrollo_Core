import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Compras from "./pages/Compras";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/compras" element={<Compras />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;