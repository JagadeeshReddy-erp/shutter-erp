import React from "react";

export default function LoadFactorTable({ loadFactors, onEdit }) {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={{ ...styles.th, width: "8%" }}>ID</th>
            <th style={{ ...styles.th, width: "20%" }}>Item Name</th>
            <th style={{ ...styles.th, width: "15%" }}>Item Type</th>
            <th style={{ ...styles.th, width: "12%" }}>Load Factor</th>
            <th style={{ ...styles.th, width: "30%" }}>Description</th>
            <th style={{ ...styles.th, width: "15%" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loadFactors && loadFactors.length > 0 ? (
            loadFactors.map((row) => (
              <tr key={row.id} style={styles.tr}>
                <td style={styles.td}>{row.id}</td>
                <td style={styles.td}>{row.itemName}</td>
                <td style={styles.td}>{row.itemType}</td>
                <td style={styles.td}>{row.loadFactor}</td>

                <td style={styles.descriptionCell}>
                  {row.description || "-"}
                </td>

                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.noData}>
                No Load Factors Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableContainer: {
    width: "100%",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },

  thead: {
    backgroundColor: "#c0c4ff",
  },

 th: {
  padding: "10px",
  border: "1px solid #c6c6ff",
  fontWeight: 600,
  fontSize: "14px",
  color: "#1900ff",
  textAlign: "left",
},

  tr: {
    transition: "background 0.2s ease",
  },

td: {
  padding: "10px",
  border: "1px solid #c8c8ff",
  color: "#5c0000",
  fontSize: "13px",
  wordBreak: "break-word",
  verticalAlign: "top",
},

  descriptionCell: {
    padding: "10px",
    border: "1px solid #c8c8ff",
    color: "#5c0000",
    fontSize: "13px",
    whiteSpace: "normal",
    wordBreak: "break-word",
    verticalAlign: "top",
  },

  editBtn: {
    padding: "5px 10px",
  fontSize: "11px",
  borderRadius: "6px",
    backgroundColor: "#ff4949",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(250, 204, 21, 0.25)",
    transition: "all 0.2s ease",
  },

  noData: {
    textAlign: "center",
    padding: "16px",
    color: "#ff4444",
    fontWeight: 600,
  },
};