import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllActiveItems } from "../../../services/itemService";
import { createLoadFactor } from "../../../services/loadFactorService";

import AlertModal from "../../../components/common/AlertModal";
import AppToast from "../../../components/common/AppToast";

export default function CreateLoadFactorPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [itemNames, setItemNames] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  const [form, setForm] = useState({
    itemId: "",
    loadFactor: "",
    description: "",
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
        message: "Failed to load items",
      });
    }
  };

  const handleNameChange = (name) => {
    setSelectedName(name);

    const filtered = items.filter((i) => i.itemName === name);
    setFilteredItems(filtered);

    setForm({
      itemId: "",
      loadFactor: "",
      description: "",
    });
  };

  const handleTypeChange = (itemId) => {
    setForm((prev) => ({
      ...prev,
      itemId: Number(itemId),
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
      const res = await createLoadFactor({
        itemId: form.itemId,
        loadFactor: Number(form.loadFactor),
        description: form.description,
      });

      if (res?.success) {
        setToast({
          show: true,
          message: res?.message || "Load factor created successfully",
          type: "success",
        });

        setTimeout(() => {
          navigate("/inventory/load-factor/manage");
        }, 800);
      } else {
        setAlert({
          show: true,
          message: res?.message || "Failed to create load factor",
        });
      }
    } catch (err) {
      setAlert({
        show: true,
        message:
          err?.response?.data?.message ||
          "Error while creating load factor",
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Create Load Factor</h1>

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

        {/* LOAD FACTOR */}
        <div style={styles.field}>
          <label style={styles.label}>Load Factor</label>
          <input
            type="number"
            step="0.01"
            name="loadFactor"
            value={form.loadFactor}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* DESCRIPTION */}
        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
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
          title="Load Factor System"
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

  formWrapper: {
    marginLeft: "120px",
    background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 24px rgb(159, 166, 255)",
    maxWidth: "520px",
  },

  title: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#5f5fff",
    marginBottom: "24px",
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

  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    resize: "none",
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