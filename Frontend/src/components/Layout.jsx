import { NavLink, useNavigate, Outlet } from "react-router-dom";

function Layout() {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`;

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-gray-900 flex flex-col">
                <div className="px-6 py-5 border-b border-gray-700">
                    <h1 className="text-white text-lg font-bold">Sistema C&V</h1>
                    <p className="text-gray-400 text-xs mt-1">Compras y Ventas</p>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    <NavLink to="/compras" className={linkClass}>
                        <span>🛒</span> Compras
                    </NavLink>
                    <NavLink to="/ventas" className={linkClass}>
                        <span>💰</span> Ventas
                    </NavLink>
                    <NavLink to="/kardex" className={linkClass}>
                        <span>📦</span> Kardex
                    </NavLink>
                </nav>

                <div className="px-3 py-4 border-t border-gray-700">
                    <button
                        onClick={cerrarSesion}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-gray-700 transition"
                    >
                        <span>🚪</span> Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;