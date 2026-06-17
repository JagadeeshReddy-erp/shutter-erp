
// src/components/common/AlertModal
import { useEffect } from "react";

const AlertModal = ({
  message,
  onClose,
  onConfirm,
  showCancel = false,
  title = "Alert",
}) => {
  if (!message) return null;

  // ESC key close support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <span style={styles.icon}>⚠️</span>
          <h3 style={styles.title}>{title}</h3>
        </div>

        <p style={styles.message}>{message}</p>

        <div style={styles.buttonContainer}>
          {showCancel && (
            <button onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
          )}

          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              else onClose();
            }}
            style={styles.confirmBtn}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(6px)",
    zIndex: 9999,
    padding: 16,
  },

  modal: {
    background: "#ffffff",
    width: "100%",
    maxWidth: 380,
    borderRadius: 14,
    padding: "22px 20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    textAlign: "center",
    animation: "fadeIn 0.2s ease-in-out",
  },

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  icon: {
    fontSize: 20,
  },

  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: "#222",
  },

  message: {
    fontSize: 14,
    color: "#555",
    lineHeight: "1.5",
    marginBottom: 18,
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },

  confirmBtn: {
    padding: "9px 18px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.15s ease",
  },

  cancelBtn: {
    padding: "9px 18px",
    background: "#f3f4f6",
    color: "#333",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.15s ease",
  },
};