import { useNavigate } from "react-router-dom";

const ResultPanel = ({
  results,
  mode,
  onBack,
  pagination,
  page,
  setPage,
}) => {
  const navigate = useNavigate();
  const safeResults = Array.isArray(results) ? results : [];

  const handleAction = (type, customer) => {
    if (mode === "CUSTOMER") {
      if (type === "view") navigate(`/customers/${customer.id}`);
      if (type === "edit") navigate(`/customers/edit/${customer.id}`);
    }

    if (mode === "QUOTATION") {
      if (type === "create")
        navigate(`/quotations/create`, { state: { customer } });
      if (type === "view") navigate(`/quotations/${customer.id}`);
    }

    if (mode === "ORDER") {
      if (type === "create")
        navigate(`/orders/create`, { state: { customer } });
      if (type === "view") navigate(`/orders/${customer.id}`);
    }

    if (mode === "BILL") {
      if (type === "create")
        navigate(`/billing/create`, { state: { customer } });
      if (type === "view") navigate(`/billing/${customer.id}`);
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>{mode} RESULTS</h2>
        <button onClick={onBack} style={styles.backBtn}>
          ← Back
        </button>
      </div>

      {/* RESULT CARD */}
      <div style={styles.resultCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Mobile</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>{mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()}</th>
            </tr>
          </thead>

          <tbody>
            {safeResults.map((c, index) => (
              <tr
                key={c.id}
                style={index % 2 === 0 ? styles.row : styles.rowAlt}
              >
                <td style={styles.td}>{c.id}</td>
                <td style={styles.td}>{c.customerName}</td>
                <td style={styles.td}>{c.mobileNumber}</td>
                <td style={styles.td}>{c.city || "-"}</td>
                <td style={styles.td}>{c.customerType}</td>

                <td style={styles.td}>
                  <div style={styles.btnGroup}>
                    {mode === "CUSTOMER" && (
                      <>
                        <button
                          style={styles.viewBtn}
                          onClick={() => handleAction("view" , c)}
                        >
                          View
                        </button>

                        <button
                          style={styles.editBtn}
                          onClick={() => handleAction("edit", c)}
                        >
                          Edit
                        </button>
                      </>
                    )}

                    {mode !== "CUSTOMER" && (
                      <>
                        <button
                          style={styles.createBtn}
                          onClick={() => handleAction("create", c)}
                        >
                          Create
                        </button>

                        <button
                          style={styles.viewBtn}
                          onClick={() => handleAction("view", c)}
                        >
                          View
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div style={styles.pagination}>
          <button
            style={styles.pageBtn}
            disabled={page === 0}
            onClick={() => {
    console.log("Current Page:", page);
    setPage(page - 1);
  }}
>
            Previous
          </button>

          <span style={styles.pageText}>
            Page {pagination.pageNo + 1} of {pagination.totalPages}
          </span>

          <button
            style={styles.pageBtn}
            disabled={pagination.last}
            onClick={() => {
    console.log("Current Page:", page);
    setPage(page + 1);
  }}
>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;

/* ================= STYLES ================= */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px",
     background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "14px 18px",
    marginBottom: "18px",

    borderRadius: "12px",

    background: "#c2bdff00",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",

    border: "1px solid rgba(176, 201, 255, 0.6)",
    boxShadow:
      "0 10px 30px rgba(202, 206, 255, 0.72), inset 0 1px 0 rgba(255,255,255,0.2)",
  },
 

   title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#0516fe",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  backBtn: {
  padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "linear-gradient(135deg, #ff9999, #fd0000c1)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(255, 79, 79, 0.35)",
      border: "1px solid rgba(0, 0, 255, 0.72)",
  },

  resultCard: {
     background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
     borderRadius: "12px",
    padding: "18px",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.2)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },

  th: {
    textAlign: "left",
    padding: "10px",
    background: "#90afff",
    color: "#334155",
    borderBottom: "1px solid #e5e7eb",
  },

  td: {
    padding: "10px",
    borderBottom: "1px solid #f0f0f0",
  },


  row: {
    background: "rgba(255,255,255,0.35)",
  },

  rowAlt: {
    background: "rgba(255,255,255,0.15)",
  },

  btnGroup: {
    display: "flex",
    gap: "8px",
  },
 viewBtn: {
    padding: "6px 10px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
  },

  editBtn: {
    padding: "6px 10px",
    border: "none",
    background: "#ff6060",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
  },

  createBtn: {
    padding: "6px 10px",
    border: "none",
    background: "#10b981",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
  },
  pagination: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
  },

  pageBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    background: "#1f6feb",
    color: "#fff",
    cursor: "pointer",
  },

  pageText: {
    fontSize: "13px",
    color: "#334155",
    fontWeight: "600",
  },
};