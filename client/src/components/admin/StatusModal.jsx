import { Check, AlertCircle, AlertTriangle, X } from 'lucide-react';

const StatusModal = ({ isOpen, onClose, type = 'success', title, message, onConfirm }) => {
    if (!isOpen) return null;

    const styles = {
        success: {
            bg: 'bg-green-50',
            border: 'border-green-100',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            btnBg: 'bg-green-600',
            btnHover: 'hover:bg-green-700',
            icon: Check
        },
        error: {
            bg: 'bg-red-50',
            border: 'border-red-100',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            btnBg: 'bg-red-600',
            btnHover: 'hover:bg-red-700',
            icon: AlertCircle
        },
        confirm: {
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
            btnBg: 'bg-orange-600',
            btnHover: 'hover:bg-orange-700',
            icon: AlertTriangle
        }
    };

    const style = styles[type] || styles.success;
    const Icon = style.icon;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={type !== 'confirm' ? onClose : undefined}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Pattern */}
                <div className={`h-2 w-full ${style.btnBg}`} />

                <div className="p-6 text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${style.iconBg} ${style.iconColor} ring-4 ring-white shadow-sm`}>
                        <Icon size={32} strokeWidth={2.5} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {message}
                    </p>

                    <div className="flex gap-3 justify-center">
                        {type === 'confirm' && (
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors w-full"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                onClose();
                            }}
                            className={`px-5 py-2.5 rounded-xl text-white font-semibold shadow-lg shadow-gray-200 transition-all transform active:scale-95 w-full ${style.btnBg} ${style.btnHover}`}
                        >
                            {type === 'confirm' ? 'Confirm' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusModal;
