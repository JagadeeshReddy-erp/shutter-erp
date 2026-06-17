// src/pages/employees/EmployeeEditPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../../components/employee/EmployeeForm";
import AlertModal from "../../components/common/AlertModal";

import { getUserById, updateUser } from "../../services/employeeService";

const EmployeeEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    success: true,
  });

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserById(id);

        if (response.success) {
          setUserData(response.data);
        } else {
          setAlert({
            show: true,
            message: "Failed to fetch user data.",
            success: false,
          });
        }
      } catch (error) {
        setAlert({
          show: true,
          message: "Failed to fetch user data.",
          success: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);
      const response = await updateUser(id, formData);

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
        message: "Failed to update user.",
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

    setAlert({
      show: false,
      message: "",
      success: true,
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Edit Employee</h1>

      <div style={styles.formWrapper}>
        {userData ? (
          <EmployeeForm
            initialData={userData}
            onSubmit={handleUpdate}
            loading={loading}
            onBack={() => navigate("/employees")}
            isEdit={true}
          />
        ) : (
          <p style={styles.loadingText}>Loading user data...</p>
        )}
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

export default EmployeeEditPage;

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
  loadingText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#0055ff",
    padding: "20px",
  },
};