import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "../../components/employee/EmployeeForm";
import AlertModal from "../../components/common/AlertModal";

import { createUser } from "../../services/employeeService";

const EmployeeCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    success: true,
  });

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      const response = await createUser(formData);

      if (response.success) {
        setAlert({
          show: true,
          message: response.message,
          success: true,
        });
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
        message: error.message,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    if (alert.success) {
      navigate("/employees");
    }

    setAlert({ show: false, message: "", success: true });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Employee</h1>

      <div style={styles.formWrapper}>
        <EmployeeForm onSubmit={handleCreate} loading={loading} onBack={() => navigate("/employees")} />
      </div>

      {alert.show && (
        <AlertModal
          message={alert.message}
          onClose={handleAlertClose}
          showCancel={false}
        />
      )}
    </div>
  );
};

export default EmployeeCreatePage;

// ---------------- STYLES ----------------
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
    background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 24px rgb(159, 166, 255)",
  },
};