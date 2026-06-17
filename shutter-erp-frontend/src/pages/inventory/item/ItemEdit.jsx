import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateItem } from "../../../services/itemService";

import AlertModal from "../../../components/common/AlertModal";
import AppToast from "../../../components/common/AppToast";

export default function ItemEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const item = location.state;

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

  // ================= PRE-FILL =================
  useEffect(() => {
    if (item) {
      setForm({
        itemName: item.itemName,
        itemType: item.itemType,
        sellingPrice: item.sellingPrice,
        isActive: item.active,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "isActive"
          ? value === "true"
          : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await updateItem({
        itemName: form.itemName,
        itemType: form.itemType,
        sellingPrice: form.sellingPrice,
        isActive: form.isActive,
      });

      if (res?.success) {
        setToast({
          message: res?.message || "Item updated successfully",
          type: "success",
        });

        setAlert({
          message: res?.message || "Item updated successfully",
          show: true,
        });
      } else {
        setAlert({
          message: res?.message || "Failed to update item",
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

           <h1 style={styles.title}>Edit Item</h1>
        {/* ITEM NAME */}
        <div style={styles.field}>
          <label style={styles.label}>Item Name</label>
          <input
            value={form.itemName}
            disabled
            style={styles.inputDisabled}
          />
        </div>

        {/* ITEM TYPE */}
        <div style={styles.field}>
          <label style={styles.label}>Item Type</label>
          <input
            value={form.itemType}
            disabled
            style={styles.inputDisabled}
          />
        </div>

        {/* PRICE */}
        <div style={styles.field}>
          <label style={styles.label}>Selling Price</label>
          <input
            name="sellingPrice"
            value={form.sellingPrice}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* STATUS */}
        <div style={styles.field}>
          <label style={styles.label}>Active Status</label>
          <select
            name="isActive"
            value={form.isActive}
            onChange={handleChange}
            style={styles.input}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div style={styles.buttonRow}>
          <button style={styles.updateBtn} onClick={handleUpdate}>
            Update Item
          </button>

          <button
            style={styles.backBtn}
            onClick={() => navigate("/inventory/item/manage")}
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
     marginTop: "2px",
    fontSize: "26px",
    fontWeight: 700,
    color: "#5f5fff",
    marginBottom: "24px",
  },

  formWrapper: {
    marginTop: "12px",
    marginLeft: "150px",
    background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 24px rgb(159, 166, 255)",
    maxWidth: "500px",
  },

  field: {
    marginBottom: "16px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },

  inputDisabled: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    background: "#f3f4f6",
    color: "#6b7280",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  updateBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#4f7cff",
    color: "#fff",
    fontWeight: 600,
    flex: 1,
  },

  backBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#ff6b6b",
    color: "#fff",
    fontWeight: 600,
    flex: 1,
  },
};