import { useState } from "react";
import { createItem } from "../../../services/itemService";
import { useNavigate } from "react-router-dom";

import AlertModal from "../../../components/common/AlertModal";
import AppToast from "../../../components/common/AppToast";

const ITEM_NAMES = [
  "PATTI",
  "MOTOR",
  "SPRING",
  "LOCK",
  "GUIDE",
  "BEARING",
  "SHAFT",
  "PLATE",
  "GEAR",
  "NUTS_BOLTS",
  "BOTTOM",
];

export default function ItemCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    itemName: "",
    itemType: "",
    sellingPrice: "",
    isActive: true,
  });

  const [alert, setAlert] = useState({
    message: "",
    show: false,
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await createItem(form);

      if (res?.success) {
        setToast({
          message: res?.message || "Item created successfully",
          type: "success",
        });

        setAlert({
          message: res?.message || "Item created successfully",
          show: true,
        });

        setForm({
          itemName: "",
          itemType: "",
          sellingPrice: "",
          isActive: true,
        });
      } else {
        setAlert({
          message: res?.message || "Failed to create item",
          show: true,
        });
      }
    } catch (err) {
      const backendMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Unknown error occurred";

      setAlert({
        message: backendMsg,
        show: true,
      });

      setToast({
        message: backendMsg,
        type: "error",
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Create Item</h1>

        {/* ITEM NAME DROPDOWN */}
        <div style={styles.field}>
          <select
            name="itemName"
            value={form.itemName}
            onChange={handleChange}
            style={styles.fieldControl}
          >
            <option value="">Select Item Name ▼</option>
            {ITEM_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* ITEM TYPE */}
        <div style={styles.field}>
          <input
            name="itemType"
            placeholder="Item Type"
            value={form.itemType}
            onChange={handleChange}
            style={styles.fieldControl}
          />
        </div>

        {/* PRICE */}
        <div style={styles.field}>
          <input
            name="sellingPrice"
            placeholder="Price"
            value={form.sellingPrice}
            onChange={handleChange}
            style={styles.fieldControl}
          />
        </div>

        {/* BUTTONS */}
        <div style={styles.buttonRow}>
          <button style={styles.saveBtn} onClick={handleSubmit}>
            Save
          </button>

          <button
            style={styles.backBtn}
            onClick={() => navigate("/inventory")}
          >
            ⬅ Back
          </button>
        </div>
      </div>

      {/* ALERT */}
      {alert.show && (
        <AlertModal
          message={alert.message}
          title="Inventory System"
          onClose={() => setAlert({ message: "", show: false })}
          onConfirm={() => {
            setAlert({ message: "", show: false });
            navigate("/inventory/item/manage");
          }}
        />
      )}

      {/* TOAST */}
      <AppToast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "32px",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #e4eaff 0%, #ffdbdb 100%)",
  },

  title: {
    fontSize: "32px",
    fontWeight: 700,
    color: "#0831ff",
    marginBottom: "18px",
    marginTop: "-2px",
  },

  formWrapper: {
    marginTop: "32px",
    marginLeft: "180px",
    background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
    borderRadius: "16px",
    padding: "50px",
    boxShadow: "0 8px 24px rgb(159, 166, 255)",
    maxWidth: "400px",
  },

  field: {
    marginBottom: "16px",
  },

  /* 🔥 FIXED: SAME SIZE FOR INPUT + SELECT */
  fieldControl: {
    width: "100%",
    height: "44px",
    padding: "0 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  saveBtn: {
    padding: "14px 22px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#5f5fff",
    color: "#fff",
    fontWeight: 600,
    fontSize: "13px",
    minWidth: "200px",
  },

  backBtn: {
    padding: "14px 22px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#ff6b6b",
    color: "#fff",
    fontWeight: 600,
    fontSize: "13px",
    minWidth: "210px",
  },
};