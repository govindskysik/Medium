import { X } from 'lucide-react';


const Modal = ({ show, onClose, children }: { show: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
            <div className=" bg-white w-1/3 h-auto flex flex-col p-6 rounded-lg shadow-lg">
                <button
                    className='w-full flex justify-end'
                    onClick={onClose}
                    title="Close modal"
                    aria-label="Close modal"
                >
                    <X className="h-6 w-6 text-neutral-500 hover:text-neutral-700 hover:cursor-pointer" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
