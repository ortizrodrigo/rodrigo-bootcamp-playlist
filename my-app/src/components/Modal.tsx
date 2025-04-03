import { ReactNode } from "react";
import type React from "react"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-30">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                {title && (<h2 className="text-xl font-bold text-white mb-4">{title}</h2>)}
                <div>{children}</div>
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
                >
                    Close
                </button>
            </div>
        </div>
    );
}