import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerForm from "../../components/customers/CustomerForm";
import { createCustomer } from "../../services/customerService";
import { initialCustomerState } from "../../constants/customerConstants";
import AlertModal from "../../components/common/AlertModal";

/* ===================== STYLES ===================== */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px",
    background:
      "linear-gradient(135deg, #dfe9ff 0%, #d3e2fc 50%, rgb(212, 223, 248) 100%)",
       boxShadow:
      "0 10px 30px rgba(202, 206, 255, 0.72), inset 0 1px 0 rgba(255,255,255,0.2)",
  },

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
      "0 10px 30px rgba(146, 155, 255, 0.5), inset 0 1px 0 rgba(121, 25, 25, 0.2)",
  },

    title: { margin: 0, fontSize: "18px", fontWeight: "600", color: "#474749" },
  subtitle: { margin: "4px 0 0", fontSize: "13px", color: "#3a5594" },

  formCard: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "rgba(199, 212, 243, 0.55)",
    borderRadius: "22px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.10), inset 0 1px 0 rgb(255, 241, 241)",
  },
};

const CustomerCreatePage = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleCreate = async (data) => {
    try {
      const res = await createCustomer(data);
      const response = res.data;

      if (!response.success) {
        setAlert({
          open: true,
          message: response.message,
          type: "error",
        });
        return;
      }

      setAlert({
        open: true,
        message: "Customer created successfully!",
        type: "success",
        onClose: () => {
          navigate("/workspace?mode=CUSTOMER", {
            state: {
              autoSearch: true,
              mobile: data.mobileNumber,
            },
          });
        },
      });
    } catch (err) {
      setAlert({
        open: true,
        message:
          err?.response?.data?.message ||
          "Server error while creating customer",
        type: "error",
      });
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Create Customer</h1>
            <p style={styles.subtitle}>
              Add a new customer and continue to workspace
            </p>
          </div>
        </div>

        <div style={styles.formCard}>
          <CustomerForm
            mode="create"
            initialValues={initialCustomerState}
            onSubmit={handleCreate}
          />
        </div>
      </div>

      {alert.open && (
        <AlertModal
          message={alert.message}
          type={alert.type}
          onClose={() => {
            const shouldRedirect = alert.type === "success";

            setAlert({ ...alert, open: false });

            if (shouldRedirect && alert.onClose) {
              alert.onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default CustomerCreatePage;