import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStocksByDateRange,
  getStocksByItem,
} from "../../../services/stockService";
import { getAllItems } from "../../../services/itemService";

export default function StockManage() {
  const navigate = useNavigate();

  const [stocks, setStocks] = useState([]);
  const [items, setItems] = useState([]);
  const [itemNames, setItemNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [resultInfo, setResultInfo] = useState("");

  const [pageData, setPageData] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
    last: false,
  });

  const [filters, setFilters] = useState({
    itemId: null,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    loadItems();
    loadDefault(0);
  }, []);

  const extractStocks = (res) =>
    res?.data?.data?.content || res?.data?.content || res?.content || [];

  const extractPage = (res) => {
    const d = res?.data?.data;
    return {
      pageNumber: d?.pageNumber ?? 0,
      pageSize: d?.pageSize ?? 10,
      totalPages: d?.totalPages ?? 0,
      totalElements: d?.totalElements ?? 0,
      last: d?.last ?? false,
    };
  };

  const getCurrentMonthLabel = () => {
    const now = new Date();
    return now.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

const formatDisplayDate = (dateStr) => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

  // ✅ NEW: dynamic current month range
  const getCurrentMonthRange = () => {
    const now = new Date();

    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const format = (d) => d.toISOString().split("T")[0];

    return {
      startDate: format(start),
      endDate: format(end),
    };
  };

  const loadItems = async () => {
    try {
      const res = await getAllItems();
      const data = res?.data || [];

      setItems(data);
      setItemNames([...new Set(data.map((i) => i.itemName))]);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDefault = async (page = 0) => {
    try {
      const { startDate, endDate } = getCurrentMonthRange();

      const res = await getStocksByDateRange({
        startDate,
        endDate,
        page,
        size: 10,
      });

      setStocks(extractStocks(res));
      setPageData(extractPage(res));

      setResultInfo(
        `Showing all stock records for current month (${getCurrentMonthLabel()})`
      );
    } catch (err) {
      console.error(err);
      setStocks([]);
      setResultInfo("No data available");
    }
  };

  const handleNameChange = (name) => {
    setSelectedName(name);
    const types = items.filter((i) => i.itemName === name);
    setFilteredTypes(types);
    setFilters((p) => ({ ...p, itemId: null }));
  };

  const handleSearch = async (page = 0) => {
    try {
      const { itemId, startDate, endDate } = filters;

      let res;
      const hasDates = startDate && endDate;
      const hasItem = itemId;

      if (hasItem && hasDates) {
        const selectedItem = items.find((i) => i.id === itemId);

        setResultInfo(
          `Showing ${selectedItem?.itemName || "Item"} (${selectedItem?.itemType || ""}) stock from ${formatDisplayDate(startDate)} to ${formatDisplayDate(endDate)}`
        );

        res = await getStocksByItem({
          itemId,
          startDate,
          endDate,
          page,
          size: 10,
        });
      } else if (hasDates) {
        setResultInfo(`Showing stock records from ${formatDisplayDate(startDate)} to ${formatDisplayDate(endDate)}`);

        res = await getStocksByDateRange({
          startDate,
          endDate,
          page,
          size: 10,
        });
      } else {
        const { startDate: s, endDate: e } = getCurrentMonthRange();

        setResultInfo(
          `Showing all stock records for current month (${getCurrentMonthLabel()})`
        );

        res = await getStocksByDateRange({
          startDate: s,
          endDate: e,
          page,
          size: 10,
        });
      }

      setStocks(extractStocks(res));
      setPageData(extractPage(res));
    } catch (err) {
      console.error(err);
      setStocks([]);
      setResultInfo("Error loading data");
    }
  };

  const nextPage = () => {
    if (!pageData.last) handleSearch(pageData.pageNumber + 1);
  };

  const prevPage = () => {
    if (pageData.pageNumber > 0) handleSearch(pageData.pageNumber - 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.leftPanel}>
          <h2 style={styles.title}>Stock Management</h2>
          <p style={styles.subtitle}>Filter and view stock records</p>
        </div>

        <div style={styles.centerPanel}>
          <div style={styles.row}>
            <select
              style={styles.select}
              value={selectedName}
              onChange={(e) => handleNameChange(e.target.value)}
            >
              <option value="">Item Name</option>
              {itemNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <select
              style={styles.select}
              value={filters.itemId || ""}
              disabled={!selectedName}
              onChange={(e) =>
                setFilters((p) => ({ ...p, itemId: Number(e.target.value) }))
              }
            >
              <option value="">Item Type</option>
              {filteredTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.itemType}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.row}>
            <input
              type="date"
              style={styles.input}
              onChange={(e) =>
                setFilters((p) => ({ ...p, startDate: e.target.value }))
              }
            />

            <input
              type="date"
              style={styles.input}
              onChange={(e) =>
                setFilters((p) => ({ ...p, endDate: e.target.value }))
              }
            />
          </div>
        </div>

        <div style={styles.rightPanel}>
          <button style={styles.backBtn} onClick={() => navigate("/inventory")}>
            ⬅ Back
          </button>

          <button style={styles.searchBtn} onClick={() => handleSearch(0)}>
            Search
          </button>
        </div>
      </div>

      <div style={styles.resultInfo}>{resultInfo}</div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Stock ID</th>
              <th style={styles.th}>Item Name</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Price</th>
            </tr>
          </thead>

          <tbody>
            {stocks.length > 0 ? (
              stocks.map((s) => (
                <tr key={s.stockId}>
                  <td style={styles.td}>{s.stockId}</td>
                  <td style={styles.td}>{s.itemName}</td>
                  <td style={styles.td}>{s.itemType}</td>
                  <td style={styles.td}>{s.quantity}</td>
                  <td style={styles.td}>{s.purchasePrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.noData}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.pagination}>
        <button onClick={prevPage} disabled={pageData.pageNumber === 0}>
          Prev
        </button>

        <span>
          Page {pageData.pageNumber + 1} of {pageData.totalPages}
        </span>

        <button onClick={nextPage} disabled={pageData.last}>
          Next
        </button>
      </div>
    </div>
  );
}
/* ================= STYLES ================= */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px",
    background: "linear-gradient(135deg, #eaf1ff 0%, #dbe7ff 50%, #eef4ff 100%)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.35)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.4)",
    flexWrap: "wrap",
  },

  leftPanel: {
    minWidth: "320px",
  },

  centerPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    flex: 1,
  },

  rightPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-end",
  },

  row: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 600,
    color: "#0000ff",
  },

  subtitle: {
  margin: "4px 0 0 6px",
    fontSize: "13px",
    color: "#3b3b3b",
  },

 select: {
  padding: "8px 10px",
    border: "1px solid #f85f5f",
      borderRadius: "10px",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
    background: "#fdf3f3",
  width: "180px",
  height: "38px",
  boxSizing: "border-box",
},

 input: {
  padding: "8px 10px",
    border: "1px solid #f85f5f",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
    background: "#fdf3f3",
  width: "180px",
  height: "38px",
  fontSize: "13px",
  boxSizing: "border-box",
    borderRadius: "10px",

},
  searchBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4f7cff, #6d28d9)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },

  backBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #ef4444, #b91c1c)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },

  resultInfo: {
    margin: "12px 0",
    fontSize: "20px",
    color: "#e81414",
  },


 tableWrapper: {
    background: "linear-gradient(135deg, #ffecec 0%, #dae6ff 100%)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 8px 24px rgb(159, 166, 255)",
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


  noData: {
    textAlign: "center",
    padding: "20px",
  },

  pagination: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
};