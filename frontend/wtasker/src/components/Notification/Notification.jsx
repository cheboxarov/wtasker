// Notification.js
import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = ({ message, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    return (
        <div className={`notification ${visible ? "show" : ""}`}>
            {message}
        </div>
    );
};

export default Notification;
