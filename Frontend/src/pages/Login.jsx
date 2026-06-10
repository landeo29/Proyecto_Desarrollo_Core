import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

function Login() {
    const [usuario, setUsuario] = useState("admin");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        setCargando(true);
        try {
            const res = await apiClient.post("/productos/api/Auth/login", {
                usuario,
                password,
            });
            localStorage.setItem("token", res.data.token);
            navigate("/compras");
        } catch (err) {
            setError("Usuario o contraseña incorrectos");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Iniciar sesión
                </h1>

                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Usuario
                </label>
                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <button
                    onClick={handleLogin}
                    disabled={cargando}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {cargando ? "Ingresando..." : "Ingresar"}
                </button>
            </div>
        </div>
    );
}

export default Login;