import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { ShoppingCart, DollarSign, Package, LogOut, Boxes } from "lucide-react";

function Layout() {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-700/30"
                : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
        }`;

    const items = [
        { to: "/compras", Icon: ShoppingCart, label: "Compras" },
        { to: "/ventas", Icon: DollarSign, label: "Ventas" },
        { to: "/kardex", Icon: Package, label: "Kardex" },
    ];

    return (
        <div className="min-h-screen flex bg-[#0b0b12]">
            <aside className="w-64 bg-[#07070c] border-r border-white/[0.06] flex flex-col">
                <div className="px-6 py-5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10">
                            <Boxes className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h1 className="text-white text-sm font-bold leading-tight">Sistema C&V</h1>
                            <p className="text-gray-500 text-xs">Compras y Ventas</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-5 space-y-1">
                    <p className="px-4 text-[11px] uppercase tracking-wider text-gray-600 mb-2">
                        Menú
                    </p>
                    {items.map(({ to, Icon, label }) => (
                        <NavLink key={to} to={to} className={linkClass}>
                            <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="px-3 py-4 border-t border-white/[0.06]">
                    <button
                        onClick={cerrarSesion}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-auto bg-[#0b0b12]">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;