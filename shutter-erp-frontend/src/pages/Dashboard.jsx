// src/pages/Dashboard.jsx

const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px",
    background:
      "linear-gradient(135deg, #eaf1ff 0%, #dbe7ff 50%, #eef4ff 100%)",
    color: "#41ec08",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 22px",
    marginBottom: "18px",
    borderRadius: "20px",
    background: "#002aff00",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(42, 109, 255, 0.7)",
    boxShadow:
      "0 10px 30px rgba(202, 206, 255, 0.72), inset 0 1px 0 rgba(255,255,255,0.2)",
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#7c7cf7",
    letterSpacing: "0.6px",
  },

  subtitle: {
    margin: "6px 0 0",
    fontSize: "14px",
    color: "#3a5594",
  },

  card: {
    marginTop: "20px",
    padding: "24px",
    borderRadius: "22px",
    background: "rgba(199, 212, 243, 0.55)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.2)",
  },
};

export default function Dashboard() {
  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Shutter ERP Dashboard</h1>
          <p style={styles.subtitle}>
            Welcome back — manage your system efficiently
          </p>
        </div>
      </div>

      {/* MAIN CONTENT CARD */}
      <div style={styles.card}>
        <h2 style={{ marginTop: 0, color: "#2b3a67" }}>
          Welcome 👋
        </h2>
        <p style={{ color: "#3a5594", fontSize: "14px" }}>
          Use the sidebar to navigate between modules like billing, inventory,
          customers, and reports.
        </p>
      </div>
    </div>
  );
}