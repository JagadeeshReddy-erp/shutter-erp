//src/pages/inventory/MaterialInventoryPage.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MaterialInventoryPage() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
const [hoveredCard, setHoveredCard] = useState(null);
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const goTo = (path) => {
    setOpenMenu(null);
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Material Inventory</h2>
          <p style={styles.subtitle}>
            Manage items and stock efficiently from one place.
          </p>
        </div>

        <div style={styles.actions}>
          {/* ITEM */}
          <div style={styles.menuWrapper}>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "ITEM" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("ITEM")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => toggleMenu("ITEM")}
            >
              Item Management ▾
            </button>

            {openMenu === "ITEM" && (
              <div style={styles.dropdown}>
                <div
                  style={styles.menuItem}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #ffacac, #808fff)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() => goTo("/inventory/item/create")}
                >
                  Create Items
                </div>

                <div
                  style={styles.menuItem}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #ffacac, #808fff)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() => goTo("/inventory/item/manage")}
                >
                  Manage Items
                </div>
<div
                  style={styles.menuItem}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #ffacac, #808fff)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() => goTo("/inventory/load-factor/manage")}
                >
                  Manage load factors
                </div>

              </div>
            )}
          </div>

          {/* STOCK */}
          <div style={styles.menuWrapper}>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "STOCK" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("STOCK")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => toggleMenu("STOCK")}
            >
              Stock Management ▾
            </button>

            {openMenu === "STOCK" && (
              <div style={styles.dropdown}>
                <div
                  style={styles.menuItem}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #ffacac, #808fff)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() => goTo("/inventory/stock/create")}
                >
                  Create Stocks
                </div>

                <div
                  style={styles.menuItem}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg, #ffacac, #808fff)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() => goTo("/inventory/stock/manage")}
                >
                  Manage Stocks
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
<div style={styles.infoGrid}>
  <div
    style={{
      ...styles.infoCard,
      ...(hoveredCard === "item" ? styles.infoCardHover : {}),
    }}
    onMouseEnter={() => setHoveredCard("item")}
    onMouseLeave={() => setHoveredCard(null)}
  >
    <h3 style={styles.cardTitle}>Item Management</h3>
    <p style={styles.cardText}>
      Item Management allows you to create, update, and organize all
      inventory items in the system. It helps maintain structured item
      records for easy tracking and control.
    </p>
  </div>

  <div
    style={{
      ...styles.infoCard,
      ...(hoveredCard === "stock" ? styles.infoCardHover : {}),
    }}
    onMouseEnter={() => setHoveredCard("stock")}
    onMouseLeave={() => setHoveredCard(null)}
  >
    <h3 style={styles.cardTitle}>Stock Management</h3>
    <p style={styles.cardText}>
      Stock Management helps you monitor incoming and outgoing stock,
      track quantities in real time, and ensure inventory levels remain
      accurate and up to date.
    </p>
  </div>
</div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "28px",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #e4eaff 0%, #eaebff 100%)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 22px",
    borderRadius: "18px",

    background: "rgba(236, 231, 255, 0.55)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",

    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 10px 30px rgb(255, 172, 172)",
  },

  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 800,
    color: "#2f3cff",
    letterSpacing: "0.2px",
  },

  subtitle: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#6b7aa8",
  },

  actions: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },

  menuWrapper: {
    position: "relative",
  },

  /* 🔥 Unified button style (matches ItemCreate vibe) */
  button: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",

    background: "linear-gradient(135deg, #5f5fff 0%, #ff6b6b 140%)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "13px",

    boxShadow: "0 6px 18px rgba(95, 95, 255, 0.25)",
    transition: "all 0.25s ease",
  },

  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 24px rgba(95, 95, 255, 0.35)",
    filter: "brightness(1.05)",
  },

  dropdown: {
    position: "absolute",
    top: "44px",
    left: 0,
    minWidth: "190px",

    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(14px)",

    border: "1px solid rgba(99,102,241,0.15)",
    borderRadius: "12px",

    boxShadow: "0 14px 32px rgba(0,0,0,0.12)",
    overflow: "hidden",
    zIndex: 1000,
  },

  menuItem: {
    padding: "11px 14px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#2b3a67",
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(99,102,241,0.08)",
  },


infoGrid: {
  display: "grid",

   borderRadius: "14px",
    background: "rgb(206, 205, 255)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 10px 30px rgb(255, 255, 255)",

  gridTemplateColumns: "repeat(2, minmax(280px, 420px))",
  justifyContent: "center",   // 🔥 centers the whole grid
  gap: "20px",
 marginTop: "102px",
  padding: "10px",
},

  /* hover handled inline remains fine */

  infoCard: {
    marginTop: "16px",
    padding: "18px",

    borderRadius: "14px",
    background: "rgb(255, 218, 218)",
    backdropFilter: "blur(14px)",
marginBottom: "16px",
    border: "1px solid rgb(2, 23, 254)",
    boxShadow: "0 8px 22px rgba(255, 0, 0, 0.08)",

    transition: "all 0.25s ease",
  },

  infoCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 14px 30px rgba(0, 60, 255, 0.41)",
  },

  cardTitle: {
    margin: "0 0 8px",
    fontSize: "15px",
    fontWeight: 700,
    color: "#2f3cff",
  },

  cardText: {
    margin: 0,
    fontSize: "13px",
    color: "#001444",
    lineHeight: "1.6",
  },
};