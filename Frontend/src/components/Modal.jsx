function Modal({ abierto, onCerrar, titulo, children }) {
    if (!abierto) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-white">{titulo}</h2>
                    <button onClick={onCerrar} className="text-gray-500 hover:text-white text-2xl leading-none transition">
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;