import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      {/* Modal Content */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg w-[90vw] max-w-[500px] max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          className="absolute top-3.5 right-3.5 bg-white p-1 rounded-full shadow hover:bg-orange-100"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
