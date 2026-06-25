import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
  updateLoadFactor,
  getLoadFactorById,
} from "../../../services/loadFactorService";

import AlertModal from "../../../components/common/AlertModal";
import AppToast from "../../../components/common/AppToast";

export default function LoadFactorEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [form, setForm] = useState({
    id: "",
    itemId: "",
    itemName: "",
    itemType: "",
    loadFactor: "",
    description: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (location.state) {
      setForm(location.state);
      return;
    }

    if (id) {
      loadById(id);
    }
  }, [id]);

  const loadById = async (id) => {
    try {
      const res = await getLoadFactorById(id);

      if (res?.success) {
        setForm(res.data);
      } else {
        setAlert({
          show: true,
          message: "Failed to load data",
        });
      }
    } catch {
      setAlert({
        show: true,
        message: "Error loading data",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        itemId: form.itemId,
        loadFactor: Number(form.loadFactor),
        description: form.description,
      };

      const res = await updateLoadFactor(payload);

      if (res?.success) {
        setToast({
          message: res?.message || "Load Factor updated successfully",
          type: "success",
        });

        setAlert({
          message: res?.message || "Load Factor updated successfully",
          show: true,
        });
      } else {
        setAlert({
          message: res?.message || "Failed to update Load Factor",
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
        <h1 style={styles.title}>Edit Load Factor</h1>

        <div style={styles.field}>
          <label style={styles.label}>Item Name</label>
          <input
            value={form.itemName}
            disabled
            style={styles.inputDisabled}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Item Type</label>
          <input
            value={form.itemType}
            disabled
            style={styles.inputDisabled}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Load Factor</label>
          <input
            name="loadFactor"
            value={form.loadFactor}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>

        <div style={styles.buttonRow}>
          <button
            style={styles.updateBtn}
            onClick={handleUpdate}
          >
            Update Load Factor
          </button>

          <button
            style={styles.backBtn}
            onClick={() =>
              navigate("/inventory/load-factor/manage")
            }
          >
            ⬅ Back
          </button>
        </div>
      </div>

      {alert.show && (
        <AlertModal
          message={alert.message}
          title="Inventory System"
          onClose={() =>
            setAlert({
              message: "",
              show: false,
            })
          }
          onConfirm={() => {
            setAlert({
              message: "",
              show: false,
            });

            navigate("/inventory/load-factor/manage");
          }}
        />
      )}

      <AppToast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            message: "",
            type: "success",
          })
        }
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "32px",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background:
      "linear-gradient(135deg, #e4eaff 0%, #ffdbdb 100%)",
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
    background:
      "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
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
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "90px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },

  inputDisabled: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    background: "#f3f4f6",
    color: "#6b7280",
    boxSizing: "border-box",
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