import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStock } from "../../../services/stockService";
import { getAllActiveItems } from "../../../services/itemService";

import AlertModal from "../../../components/common/AlertModal";
import AppToast from "../../../components/common/AppToast";

export default function StockCreate() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [itemNames, setItemNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const [form, setForm] = useState({
    itemId: "",
    quantity: "",
    purchasePrice: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await getAllActiveItems();
      const data = res?.data?.data || [];

      setItems(data);
      setItemNames([...new Set(data.map((i) => i.itemName))]);
    } catch (err) {
      setAlert({
        show: true,
        message: err?.response?.data?.message || "Failed to load items",
      });
    }
  };

  const handleNameChange = (name) => {
    setSelectedName(name);

    const filtered = items.filter((i) => i.itemName === name);
    setFilteredItems(filtered);

    setForm({
      itemId: "",
      quantity: "",
      purchasePrice: "",
    });
  };

  const handleTypeChange = (id) => {
    setForm((prev) => ({
      ...prev,
      itemId: Number(id),
    }));
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await addStock(form);

      if (res?.success) {
        setToast({
          show: true,
          message: "Stock created successfully",
          type: "success",
        });

        setTimeout(() => {
          navigate("/inventory/stock/manage");
        }, 800);
      } else {
        setAlert({
          show: true,
          message: res?.message || "Stock creation failed",
        });
      }
    } catch (err) {
      setAlert({
        show: true,
        message: err?.response?.data?.message || "Error while creating stock",
      });
    }
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Create Stock</h1>

        {/* ITEM NAME */}
        <div style={styles.field}>
          <label style={styles.label}>Item Name</label>
          <select
            value={selectedName}
            onChange={(e) => handleNameChange(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Item Name</option>
            {itemNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* ITEM TYPE */}
        <div style={styles.field}>
          <label style={styles.label}>Item Type</label>
          <select
            disabled={!selectedName}
            onChange={(e) => handleTypeChange(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Item Type</option>
            {filteredItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.itemType}
              </option>
            ))}
          </select>
        </div>

        {/* QTY */}
        <div style={styles.field}>
          <label style={styles.label}>Quantity</label>
          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* PRICE */}
        <div style={styles.field}>
          <label style={styles.label}>Purchase Price</label>
          <input
            name="purchasePrice"
            placeholder="Purchase Price"
            value={form.purchasePrice}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* BUTTONS */}
        <div style={styles.buttonRow}>
          <button style={styles.saveBtn} onClick={handleSubmit}>
            Save
          </button>

          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
        </div>
      </div>

      {/* ALERT */}
      {alert.show && (
        <AlertModal
          title="Stock System"
          message={alert.message}
          showCancel={false}
          onClose={() => setAlert({ show: false, message: "" })}
          onConfirm={() => setAlert({ show: false, message: "" })}
        />
      )}

      {/* TOAST */}
      <AppToast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({ show: false, message: "", type: "success" })
        }
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
    fontSize: "28px",
    fontWeight: 700,
    color: "#5f5fff",
    marginBottom: "24px",
  },

  formWrapper: {
    marginLeft:"120px",
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
    height: "42px",
    padding: "0 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  },

  select: {
    width: "100%",
    height: "42px",
    padding: "0 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  saveBtn: {
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