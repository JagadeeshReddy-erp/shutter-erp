//src/components/common/AppToast.jsx

import { useEffect } from "react";

export default function AppToast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      padding: "12px 16px",
      borderRadius: 8,
      color: "#fff",
      background: type === "success" ? "green" : "red",
      zIndex: 9999
    }}>
      {message}
    </div>
  );
}