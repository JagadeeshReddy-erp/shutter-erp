import { useEffect, useState } from "react";
import { getAllItems } from "../../../services/itemService";
import { useNavigate } from "react-router-dom";

import AlertModal from "../../../components/common/AlertModal";
import AppToast from "../../../components/common/AppToast";

export default function ItemManage() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedItemType, setSelectedItemType] = useState("");

  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [hoveredEdit, setHoveredEdit] = useState(null);

  const [alert, setAlert] = useState({ message: "", show: false });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await getAllItems();

      const data = res?.data?.data || res?.data || [];
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      const backendMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load items";

      setAlert({ message: backendMsg, show: true });
      setToast({ message: backendMsg, type: "error" });
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const itemNames = [...new Set((items || []).map((i) => i.itemName))];

  const itemTypes = selectedItemName
    ? [
        ...new Set(
          (items || [])
            .filter((i) => i.itemName === selectedItemName)
            .map((i) => i.itemType)
        ),
      ]
    : [];

  const filteredData = (items || []).filter((i) => {
    return (
      (!selectedItemName || i.itemName === selectedItemName) &&
      (!selectedItemType || i.itemType === selectedItemType)
    );
  });

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Item Management</h2>
          <p style={styles.subtitle}>Filter, view and manage inventory items</p>
        </div>

        <div style={styles.actions}>
          {/* ITEM NAME */}
          <div style={styles.menuWrapper}>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "NAME" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("NAME")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => toggleMenu("NAME")}
            >
              {selectedItemName || "Item Name ▾"}
            </button>

            {openMenu === "NAME" && (
              <div style={styles.dropdown}>
                <div
                  style={{
                    ...styles.menuItem,
                    ...(hoveredMenuItem === "NAME-ALL"
                      ? styles.menuItemHover
                      : {}),
                  }}
                  onMouseEnter={() => setHoveredMenuItem("NAME-ALL")}
                  onMouseLeave={() => setHoveredMenuItem(null)}
                  onClick={() => {
                    setSelectedItemName("");
                    setSelectedItemType("");
                    setOpenMenu(null);
                  }}
                >
                  All Items
                </div>

                {itemNames.map((name, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.menuItem,
                      ...(hoveredMenuItem === `NAME-${idx}`
                        ? styles.menuItemHover
                        : {}),
                    }}
                    onMouseEnter={() => setHoveredMenuItem(`NAME-${idx}`)}
                    onMouseLeave={() => setHoveredMenuItem(null)}
                    onClick={() => {
                      setSelectedItemName(name);
                      setSelectedItemType("");
                      setOpenMenu(null);
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ITEM TYPE */}
          <div style={styles.menuWrapper}>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "TYPE" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("TYPE")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => toggleMenu("TYPE")}
              disabled={!selectedItemName}
            >
              {selectedItemType || "Item Type ▾"}
            </button>

            {openMenu === "TYPE" && (
              <div style={styles.dropdown}>
                <div
                  style={{
                    ...styles.menuItem,
                    ...(hoveredMenuItem === "TYPE-ALL"
                      ? styles.menuItemHover
                      : {}),
                  }}
                  onMouseEnter={() => setHoveredMenuItem("TYPE-ALL")}
                  onMouseLeave={() => setHoveredMenuItem(null)}
                  onClick={() => {
                    setSelectedItemType("");
                    setOpenMenu(null);
                  }}
                >
                  All Types
                </div>

                {itemTypes.map((type, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.menuItem,
                      ...(hoveredMenuItem === `TYPE-${idx}`
                        ? styles.menuItemHover
                        : {}),
                    }}
                    onMouseEnter={() => setHoveredMenuItem(`TYPE-${idx}`)}
                    onMouseLeave={() => setHoveredMenuItem(null)}
                    onClick={() => {
                      setSelectedItemType(type);
                      setOpenMenu(null);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            style={styles.backBtn}
            onClick={() => navigate("/inventory")}
          >
            ⬅ Back
          </button>
        </div>
      </div>

      {loading && <p style={styles.loading}>Loading items...</p>}

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Item Name</th>
              <th style={styles.th}>Item Type</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Active</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" style={styles.noData}>
                  No Data Found
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.id}</td>
                  <td style={styles.td}>{item.itemName}</td>
                  <td style={styles.td}>{item.itemType}</td>
                  <td style={styles.td}>{item.currentQuantity}</td>
                  <td style={styles.td}>{item.sellingPrice}</td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background: item.active ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={{
                        ...styles.editBtn,
                        ...(hoveredEdit === item.id
                          ? styles.editBtnHover
                          : {}),
                      }}
                      onMouseEnter={() => setHoveredEdit(item.id)}
                      onMouseLeave={() => setHoveredEdit(null)}
                      onClick={() =>
                        navigate("/inventory/item/edit", { state: item })
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {alert.show && (
        <AlertModal
          message={alert.message}
          title="Inventory System"
          onClose={() => setAlert({ message: "", show: false })}
          onConfirm={() => setAlert({ message: "", show: false })}
        />
      )}

      <AppToast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px",
    background:
      "linear-gradient(135deg, #eaf1ff 0%, #dbe7ff 50%, #eef4ff 100%)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    marginBottom: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.35)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow:
      "0 10px 30px rgba(146, 155, 255, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
  },

  title: {
    margin: 0,
    fontSize: "17px",
    fontWeight: 600,
    color: "#0000ff",
  },

  subtitle: {
    margin: "4px 0 0",
    fontSize: "12.5px",
    color: "#3b3b3b",
  },

  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  menuWrapper: {
    position: "relative",
  },

  button: {
    padding: "7px 12px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #4f7cff 0%, #d92828 100%)",
    color: "#fff",
    border: "1px solid rgba(249, 112, 112, 0.58)",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  buttonHover: {
    transform: "translateY(-1px)",
    filter: "brightness(1.05)",
    boxShadow: "0 8px 18px rgba(79,124,255,0.25)",
  },

  dropdown: {
    position: "absolute",
    top: "40px",
    left: 0,
    minWidth: "170px",
    background: "rgba(192, 189, 255, 0.9)",
    backdropFilter: "blur(12px)",
    borderRadius: "10px",
    overflow: "hidden",
    zIndex: 1000,
  },

  menuItem: {
    padding: "9px 12px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#333",
    borderBottom: "1px solid rgba(255, 0, 0, 0.15)",
  },

  menuItemHover: {
     fontWeight: 600,
    fontSize: "13px",
    background: "linear-gradient(135deg, #7b9cff 0%, #ff6262 100%)",
  },

  backBtn: {
    padding: "7px 12px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #ffb5b5, #ff0000)",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(255, 131, 131, 0.35)",
    fontSize: "13px",
  },

  loading: {
    textAlign: "center",
    fontSize: "15px",
    color: "#0055ff",
    padding: "18px",
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

  status: {
    padding: "4px 10px",
    borderRadius: "999px",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 600,
  },

  editBtn: {
    padding: "6px 10px",
    borderRadius: "9px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #4f7cff, #6d28d9)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },

  editBtnHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 14px rgba(79,124,255,0.35)",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#64748b",
  },
};