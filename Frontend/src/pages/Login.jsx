import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Zap, ShieldCheck, RefreshCw, User, Lock } from "lucide-react";
import apiClient from "../api/apiClient";

function Login() {
    const [usuario, setUsuario] = useState("admin");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const auraRef = useRef(null);

    const moverAura = (e) => {
        if (!auraRef.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        auraRef.current.style.left = `${e.clientX - r.left}px`;
        auraRef.current.style.top = `${e.clientY - r.top}px`;
    };

    const handleLogin = async () => {
        setError("");
        setCargando(true);
        try {
            const res = await apiClient.post("/productos/api/Auth/login", { usuario, password });
            localStorage.setItem("token", res.data.token);
            navigate("/compras");
        } catch {
            setError("Usuario o contraseña incorrectos");
        } finally {
            setCargando(false);
        }
    };

    const features = [
        { Icon: Zap, txt: "Stock actualizado en tiempo real" },
        { Icon: ShieldCheck, txt: "Autenticación segura con JWT" },
        { Icon: RefreshCw, txt: "Microservicios orientados a eventos" },
    ];

    return (
        <div className="min-h-screen flex bg-[#07070c] text-white">
            <div
                onMouseMove={moverAura}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"></div>
                <div
                    ref={auraRef}
                    className="pointer-events-none absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl transition-all duration-200"
                ></div>
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-violet-700 rounded-full mix-blend-screen blur-3xl opacity-25 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen blur-3xl opacity-25 animate-blob d3"></div>

                <div className="relative z-10 flex flex-col justify-center px-16">
                    <div className="animate-fadeInUp inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-8">
                        <Package className="w-7 h-7 text-violet-400" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-5xl font-bold leading-tight mb-6 animate-fadeInUp d1">
                        Sistema de
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Compras y Ventas
            </span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-10 max-w-md animate-fadeInUp d2">
                        Gestiona tu inventario y controla el stock en tiempo real, sobre una
                        arquitectura de microservicios.
                    </p>
                    <div className="space-y-3 max-w-md">
                        {features.map(({ Icon, txt }, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 animate-fadeInUp d${i + 3} hover:border-violet-500/40 hover:bg-white/[0.06] transition`}
                            >
                                <Icon className="w-5 h-5 text-violet-400 shrink-0" strokeWidth={1.5} />
                                <span className="text-gray-200 text-sm">{txt}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="absolute top-10 right-10 w-72 h-72 bg-violet-700 rounded-full blur-3xl opacity-10 lg:hidden"></div>

                <div className="w-full max-w-sm relative z-10">
                    <h2 className="text-3xl font-bold mb-2 animate-fadeInUp">Bienvenido</h2>
                    <p className="text-gray-500 mb-8 animate-fadeInUp d1">Inicia sesión para continuar</p>

                    <div className="relative mb-5 animate-fadeInUp d2">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Usuario"
                            className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition"
                        />
                    </div>

                    <div className="relative mb-6 animate-fadeInUp d3">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            placeholder="Contraseña"
                            className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 animate-fadeInUp">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleLogin}
                        disabled={cargando}
                        className="shine-btn w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 rounded-xl font-medium hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-violet-700/30 hover:shadow-violet-600/50 animate-fadeInUp d4"
                    >
                        {cargando ? "Ingresando..." : "Ingresar"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;