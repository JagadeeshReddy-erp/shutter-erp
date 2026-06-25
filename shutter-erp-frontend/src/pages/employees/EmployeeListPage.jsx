// src/pages/employees/EmployeeListPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllUsers } from "../../services/employeeService";
import EmployeeTable from "../../components/employee/EmployeeTable";
import AlertModal from "../../components/common/AlertModal";

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    success: true,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();

      if (response.success) {
        setUsers(response.data || []);
      } else {
        setAlert({
          show: true,
          message: response.message,
          success: false,
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to fetch users.",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = () => {
    navigate("/employees/create");
  };

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleAlertClose = () => {
    setAlert({
      show: false,
      message: "",
      success: true,
    });
  };

  return (
    <div style={styles.container}>
      {/* HEADER (MATCHED WITH WORKSPACE PAGE) */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Employee Management</h2>
          <p style={styles.subtitle}>
            Search and manage records in a clean workspace.
          </p>
        </div>

        <button style={styles.createBtn} onClick={handleCreate}>
          Create Employee
        </button>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        {loading ? (
          <p style={styles.loading}>Loading users...</p>
        ) : (
          <EmployeeTable users={users} onEdit={handleEdit} />
        )}
      </div>

      {/* ALERT */}
      {alert.show && (
        <AlertModal
          show={alert.show}
          message={alert.message}
          success={alert.success}
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
};

export default EmployeeListPage;

/* ---------------- STYLES ---------------- */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px",
    background:
      "linear-gradient(135deg, #eaf1ff 0%, #dbe7ff 50%, #eef4ff 100%)",
  },

  /* SAME AS WORKSPACE HEADER */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 22px",
    marginBottom: "18px",
    borderRadius: "20px",
    background: "#1100fd00",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(252, 34, 34, 0.7)",
    boxShadow:
      "0 10px 30px rgba(146, 155, 255, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
  },

  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#0000ff",
  },

  subtitle: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#3a5594",
  },

  createBtn: {
    padding: "10px 14px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #4f7cff, #6d28d9)",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(79,124,255,0.35)",
  },

  tableWrapper: {
    background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 8px 24px rgb(159, 166, 255)",
    overflowX: "auto",
  },

  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#0055ff",
    padding: "20px",
  },
};