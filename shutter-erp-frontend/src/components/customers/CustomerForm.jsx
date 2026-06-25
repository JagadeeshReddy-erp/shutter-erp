import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_TYPES } from "../../constants/customerConstants";
import AlertModal from "../common/AlertModal";

const CustomerForm = ({
  mode = "create",
  initialValues,
  onSubmit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialValues);
  const [alert, setAlert] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialValues);
    setErrors({});
    setAlert("");
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;

    const cleaned = value.replace(/[^0-9]/g, "").slice(0, 10);

    setForm((prev) => ({
      ...prev,
      [name]: cleaned,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const showAlert = (message) => {
    setAlert("");
    setTimeout(() => {
      setAlert(message);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobileRegex = /^[0-9]{10}$/;

    if (!form.customerName?.trim()) {
      showAlert("Customer Name is required");
      return;
    }

    if (!form.mobileNumber?.trim()) {
      showAlert("Mobile Number is required");
      return;
    }

    if (!mobileRegex.test(form.mobileNumber)) {
      showAlert("Mobile Number must be exactly 10 digits");
      return;
    }

    if (!form.customerType?.trim()) {
      showAlert("Customer Type is required");
      return;
    }

    try {
      await onSubmit(form);
    } catch (err) {
      showAlert(err.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          {mode === "edit" ? "Edit Customer" : "Create Customer"}
        </h2>

        <div style={styles.headerActions}>
         

          <button type="submit" form="customerForm" style={styles.saveBtn}>
            {mode === "edit" ? "Update" : "Save"}
          </button>

           <button
            type="button"
            style={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </button>

          {mode === "edit" && (
            <button type="button" style={styles.deleteBtn} onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>

      {/* FORM */}
      <form id="customerForm" onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fieldBox}>
          <label style={styles.label}>Customer Name *</label>
          <input
            name="customerName"
            value={form.customerName || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Mobile Number *</label>
          <input
            name="mobileNumber"
            value={form.mobileNumber || ""}
            onChange={handleNumberInput}
            style={styles.input}
            maxLength={10}
            inputMode="numeric"
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>LandMark Address</label>
          <input
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>City</label>
          <input
            name="city"
            value={form.city || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Pincode</label>
          <input
            name="pincode"
            value={form.pincode || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>State</label>
          <input
            name="state"
            value={form.state || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Customer Type *</label>
          <select
            name="customerType"
            value={form.customerType || ""}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Type</option>
            {CUSTOMER_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Contact Person</label>
          <input
            name="contactPerson"
            value={form.contactPerson || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Alternate Mobile</label>
          <input
            name="alternateMobileNumber"
            value={form.alternateMobileNumber || ""}
            onChange={handleNumberInput}
            style={styles.input}
            maxLength={10}
            inputMode="numeric"
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Email</label>
          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>GST Number</label>
          <input
            name="gstNumber"
            value={form.gstNumber || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Remarks</label>
          <textarea
            name="remarks"
            value={form.remarks || ""}
            onChange={handleChange}
            style={{ ...styles.input, height: "80px" }}
          />
        </div>
      </form>

      <AlertModal message={alert} onClose={() => setAlert("")} />
    </div>
  );
};

export default CustomerForm;

/* STYLES */
const styles = {
  container: {
    padding: "28px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Segoe UI, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  headerActions: {
    display: "flex",
    gap: "10px",
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2a44",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "14px",
  },

  fieldBox: {
    display: "flex",
    flexDirection: "column",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#ffeeee",
    border: "1px solid #0071fa",
  },

  label: {
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
  },

  saveBtn: {
    padding: "10px 18px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "10px 18px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  backBtn: {
 padding: "10px 18px",
    background: "#eb2525",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
};