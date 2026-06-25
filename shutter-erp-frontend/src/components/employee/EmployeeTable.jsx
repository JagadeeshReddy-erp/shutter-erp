// src/components/employee/EmployeeTable.jsx
import React from "react";

const EmployeeTable = ({ users, onEdit }) => {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Active</th> {/* NEW COLUMN */}
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>

                {/* ACTIVE STATUS */}
                <td style={styles.td}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "12px",
                      fontWeight: 600,
                      color: "#fff",
                      backgroundColor: user.active ? "#28a745" : "#dc3545",
                      display: "inline-block",
                      minWidth: "70px",
                      textAlign: "center",
                      fontSize: "12px",
                    }}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => onEdit(user.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.noData}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

// ---------------- STYLES ----------------
const styles = {
  tableContainer: {
    overflowX: "auto",
    background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 8px 24px rgba(159, 166, 255, 0.5)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
  },
  thead: {
    backgroundColor: "#c0c4ff",
  },
  th: {
    padding: "12px",
    border: "1px solid #c6c6ff",
    fontWeight: 600,
    color: "#1900ff",
    textAlign: "left",
  },
  tr: {
    transition: "background 0.2s",
  },
  td: {
    padding: "12px",
    border: "1px solid #c8c8ff",
    color: "#5c0000",
  },
  editBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    backgroundColor: "#ff4949",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(250, 204, 21, 0.25)",
    transition: "all 0.2s",
  },
  noData: {
    textAlign: "center",
    padding: "16px",
    color: "#ff4444",
    fontWeight: 600,
  },
};