// src/components/employee/EmployeeForm.jsx
import React, { useState, useEffect } from "react";

const EmployeeForm = ({
  initialData = {},
  onSubmit,
  onBack,        // ✅ added
  loading,
  isEdit = false,
}) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.username || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || "EMPLOYEE",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...form };

    if (isEdit && !payload.password) {
      delete payload.password;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>

      <div style={styles.header}>
        <h3 style={styles.title}>
          {isEdit ? "Edit Employee" : "Create Employee"}
        </h3>

        {/* ✅ BACK BUTTON */}
        <button
          type="button"
          onClick={onBack}
          style={styles.backBtn}
        >
          ← Back
        </button>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>
          Password {isEdit && "(leave blank to keep unchanged)"}
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required={!isEdit}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
        </select>
      </div>

      <button type="submit" disabled={loading} style={styles.submitBtn}>
        {isEdit ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default EmployeeForm;

// ---------------- STYLES ----------------
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "420px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#2d2d2d",
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontWeight: 600,
    marginBottom: "6px",
    color: "#5f5fff",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #c0c4ff",
    fontSize: "16px",
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #c0c4ff",
    fontSize: "16px",
    backgroundColor: "#fff",
  },

  submitBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },

  backBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    backgroundColor: "#fc4747",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
};