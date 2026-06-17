//src/workspace/SearchPanel.jsx
import React from "react";

const SearchPanel = ({ filters, updateFilters, handleSearch, loading }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // Helper to get today's date in YYYY-MM-DD format
  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Set both fromDate and toDate to today
  const setTodayDates = () => {
    const today = getToday();
    updateFilters("fromDate", today);
    updateFilters("toDate", today);
  };

  return (
    <form onSubmit={onSubmit} style={styles.card}>
      <h3 style={styles.title}>🔍 Search Customer</h3>

      {/* Inputs Row 1 */}
      <div style={styles.grid}>
        <input
          style={styles.input}
          type="text"
          placeholder="Customer Name"
          value={filters.name}
          onChange={(e) => updateFilters("name", e.target.value)}
        />

        <input
          style={styles.input}
          type="text"
          placeholder="Mobile Number"
          value={filters.mobile}
          onChange={(e) => updateFilters("mobile", e.target.value)}
        />
      </div>

      {/* Date Filters */}
      <div style={styles.grid}>
        <input
          style={styles.input}
          type="date"
          value={filters.fromDate}
          onChange={(e) => updateFilters("fromDate", e.target.value)}
        />

        <input
          style={styles.input}
          type="date"
          value={filters.toDate}
          onChange={(e) => updateFilters("toDate", e.target.value)}
        />
      </div>

      {/* Buttons Row */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          onClick={setTodayDates}
          style={{
            ...styles.button,
          background: "linear-gradient(135deg, #ff0808, #3e55ff)",
            flex: 1,
          }}
        >
          Today
        </button>

        <button
          type="submit"
          disabled={loading}
          style={{ ...styles.button,
             background: "linear-gradient(135deg, #ff0808, #3e55ff)",
            flex: 1 }}
        >
          {loading ? (
            <span style={styles.loadingText}>Searching...</span>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchPanel;

/* ===================== STYLES ===================== */
const styles = {
  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "#e9ebffb1",
    boxShadow: "0 10px 25px rgba(237, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "520px",
    margin: "0 auto",
  },

  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#474747",
    letterSpacing: "0.3px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  input: {
    padding: "11px 12px",
    borderRadius: "10px",
    border: "1px solid #f85f5f",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
    background: "#fdf3f3",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.2s",
  },

  loadingText: {
    opacity: 0.9,
    letterSpacing: "0.5px",
  },
};