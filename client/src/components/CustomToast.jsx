import React, { useEffect } from "react";

const CustomToast = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-close after 3s
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`px-4 py-2 rounded shadow-lg text-white mb-2 animate-slideIn 
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
        >
            {message}
        </div>
    );
};

export default CustomToast;
