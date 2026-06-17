import { CUSTOMER_TYPES } from "../../constants/customerConstants";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, updateCustomer, deleteCustomer } from "../../services/customerService";
import AlertModal from "../../components/common/AlertModal";
import { AuthContext } from "../../context/AuthContext";

// Only fields we want the user to edit
const editableFields = [
  "customerName",
  "mobileNumber", 
  "address",
  "city",
  "state",
  "pincode",
  "alternateMobileNumber",
  "customerType",
  "contactPerson",
  "email",
  "gstNumber",
  "remarks",
];

const CustomerEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "ADMIN";

  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
    onConfirm: null,
    showCancel: false,
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await getCustomerById(id);
        if (res.data.success) {
          setCustomer(res.data.data || {});
        } else {
          showAlert(res.data.message || "Customer not found", "error");
        }
      } catch {
        showAlert("Failed to fetch customer details", "error");
      }
      setLoading(false);
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  // Real-time mobile number handling: digits only + max 10
  const handleMobileChange = (field, value) => {
    const digitsOnly = value.replace(/\D/g, ""); // remove non-digits
    const limited = digitsOnly.slice(0, 10); // max 10 digits
    handleChange(field, limited);
  };

  const handleBack = () => {
    navigate("/workspace?mode=CUSTOMER", { state: { returnToResults: true } });
  };

  const showAlert = (message, type = "success", onConfirm = null, showCancel = false) => {
    setAlert({ open: true, message, type, onConfirm, showCancel });
  };

  const handleSave = async () => {
    setSaving(true);

    // Validation for mobile numbers
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(customer.mobileNumber || "")) {
      showAlert("Mobile Number must be exactly 10 digits", "error");
      setSaving(false);
      return;
    }

    if (customer.alternateMobileNumber && !mobileRegex.test(customer.alternateMobileNumber)) {
      showAlert("Alternate Mobile Number must be exactly 10 digits", "error");
      setSaving(false);
      return;
    }

    try {
      const res = await updateCustomer(id, customer);
      if (res.data.success) {
        showAlert("Customer updated successfully!", "success", handleBack);
      } else {
        showAlert(res.data.message || "Failed to update customer", "error");
      }
    } catch (err) {
      showAlert(err?.response?.data?.message || "Update failed", "error");
    }
    setSaving(false);
  };

  const handleDelete = () => {
    showAlert(
      "Are you sure you want to delete this customer? This action cannot be undone.",
      "error",
      confirmDelete,
      true
    );
  };

  const confirmDelete = async () => {
    setSaving(true);
    try {
      const res = await deleteCustomer(id);
      if (res.data.success) {
        showAlert("Customer deleted successfully!", "success", handleBack);
      } else {
        showAlert(res.data.message || "Failed to delete customer", "error");
      }
    } catch (err) {
      showAlert(err?.response?.data?.message || "Delete failed", "error");
    }
    setSaving(false);
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Edit Customer</h2>
          <p style={styles.subtitle}>Update customer details below</p>
        </div>

        <div style={styles.actions}>
          <button style={styles.backBtn} onClick={handleBack}>← Back</button>

          {isAdmin && (
            <button
              style={{ ...styles.deleteBtn, opacity: saving ? 0.7 : 1 }}
              onClick={handleDelete}
              disabled={saving}
            >
              Delete
            </button>
          )}

          <button
            style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* FORM CARD */}
      <div style={styles.card}>
        <div style={styles.formGrid}>
          {editableFields.map((key) => (
            <div key={key} style={styles.field}>
              <label style={styles.label}>{key.replace(/([A-Z])/g, " $1")}</label>

              {key === "customerType" ? (
                <select
                  style={styles.input}
                  value={customer[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                >
                  <option value="" disabled>
                    Select Customer Type
                  </option>
                  {CUSTOMER_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  style={styles.input}
                  value={customer[key] || ""}
                  onChange={(e) =>
                    key === "mobileNumber" || key === "alternateMobileNumber"
                      ? handleMobileChange(key, e.target.value)
                      : handleChange(key, e.target.value)
                  }
                  placeholder={`Enter ${key}`}
                  type={key === "mobileNumber" || key === "alternateMobileNumber" ? "tel" : "text"}
                  inputMode={key === "mobileNumber" || key === "alternateMobileNumber" ? "numeric" : "text"}
                  maxLength={key === "mobileNumber" || key === "alternateMobileNumber" ? 10 : undefined}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ALERT MODAL */}
      {alert.open && (
        <AlertModal
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          onConfirm={() => {
            if (alert.onConfirm) alert.onConfirm();
            setAlert((prev) => ({ ...prev, open: false }));
          }}
          showCancel={alert.showCancel}
        />
      )}
    </div>
  );
};

export default CustomerEditPage;

const styles = {
  page: { padding: "28px", minHeight: "100vh", background: "#dbe7ff", fontFamily: "Segoe UI, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" },
  title: { margin: 0, fontSize: "22px", fontWeight: "700", color: "#1f2a44" },
  subtitle: { margin: "4px 0 0", fontSize: "13px", color: "#6b7280" },
  actions: { display: "flex", gap: "10px" },
  backBtn: { padding: "10px 16px", borderRadius: "8px", border: "1px solid #0063f8", background: "#ffb2b2", cursor: "pointer" },
  deleteBtn: { padding: "10px 16px", borderRadius: "8px", border: "none", background: "#ef4444", color: "#fff", fontWeight: "600", cursor: "pointer" },
  saveBtn: { padding: "10px 16px", borderRadius: "8px", border: "none", background: "#4b84ff", color: "#fff", fontWeight: "600", cursor: "pointer" },
  card: { background: "#fff7f7ee", borderRadius: "14px", padding: "22px", boxShadow: "0 6px 18px rgba(0,0,0,0.06)", maxWidth: "900px", margin: "0 auto" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" },
  field: { display: "flex", flexDirection: "column" },
  label: { fontSize: "12px", fontWeight: "600", marginBottom: "6px", color: "#374151" },
  input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", outline: "none", fontSize: "12px", transition: "0.2s" },
  loading: { textAlign: "center", marginTop: "60px", fontSize: "16px", color: "#666" },
};
