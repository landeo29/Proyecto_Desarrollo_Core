function Modal({ abierto, onCerrar, titulo, children }) {
    if (!abierto) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{titulo}</h2>
                    <button
                        onClick={onCerrar}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;