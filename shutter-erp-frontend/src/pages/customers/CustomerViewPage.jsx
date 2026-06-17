import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById } from "../../services/customerService";

const CustomerViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await getCustomerById(id);
        if (res.data.success) setCustomer(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleBack = () => navigate("/workspace?mode=CUSTOMER", { state: { returnToResults: true } });
  const handleEdit = () => navigate(`/customers/edit/${id}`);

  if (loading) return <div style={styles.loading}>⏳ Loading customer details...</div>;
  if (!customer) return <div style={styles.loading}>❌ Customer not found.</div>;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>{customer.customerName}</h1>
        <div style={styles.actions}>
          <button style={styles.backBtn} onClick={handleBack}>← Back</button>
          <button style={styles.editBtn} onClick={handleEdit}>✏️ Edit</button>
        </div>
      </div>

      {/* DETAILS */}
      <div style={styles.detailCard}>
        {[
         
          ["Mobile", customer.mobileNumber],
          ["Customer Type", customer.customerType],
          ["Address", customer.address],
          ["City", customer.city],
          ["Pincode", customer.pincode],
          ["State", customer.state],
          ["Alternate Mobile", customer.alternateMobileNumber],
          ["Email", customer.email],
          ["Contact Person", customer.contactPerson],
          ["GST Number", customer.gstNumber],
          ["Remarks", customer.remarks],
        ].map(([label, value]) => (
          <div key={label} style={styles.row}>
            <span style={styles.label}>{label}</span>
            <span style={styles.value}>{value || <em>-</em>}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerViewPage;

const styles = {
  container: {
    padding: "32px",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #e4eaff 0%, #ffdbdb 100%)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#5f5fff",
  },
  actions: {
    display: "flex",
    gap: "12px",
  },
  editBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
    transition: "all 0.2s",
  },
  backBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#ff5656ef",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(156, 163, 175, 0.25)",
    transition: "all 0.2s",
  },
  detailCard: {
    background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 24px rgb(159, 166, 255)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #c0c4ff",
    fontSize: "16px",
  },
  label: { fontWeight: 600, color: "#ff4444" },
  value: { color: "#1900ff" },
  loading: { padding: "40px", textAlign: "center", fontSize: "18px", color: "#0055ff" },
};