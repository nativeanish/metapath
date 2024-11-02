import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ">
      <div className="bg-white border-4 border-black w-full max-w-2xl transform transition-all">
        <div className="bg-red-500 p-4 flex justify-between items-center">
          <h2 className="text-4xl font-bold uppercase">{title}</h2>
          <button
            onClick={onClose}
            className="bg-black text-white text-2xl font-bold w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            X
          </button>
        </div>
        <div className="p-8 bg-yellow-300">{children}</div>
        <div className="bg-blue-500 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-black text-white text-xl font-bold py-2 px-6 border-4 border-black hover:bg-white hover:text-black transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
