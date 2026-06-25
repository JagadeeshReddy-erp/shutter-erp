//src/layouts/sidebar.jsx
import { useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", roles: ["ADMIN", "EMPLOYEE"] },

  { name: "Customer Management", mode: "CUSTOMER", workspace: true, roles: ["ADMIN", "EMPLOYEE"] },
  { name: "Quotation System", mode: "QUOTATION", workspace: true, roles: ["ADMIN", "EMPLOYEE"] },
  { name: "Order System", mode: "ORDER", workspace: true, roles: ["ADMIN", "EMPLOYEE"] },

  { name: "Material Inventory", path: "/inventory", roles: ["ADMIN"] },
  { name: "Employee Management", path: "/employees", roles: ["ADMIN"] },
  { name: "Production Management", path: "/production", roles: ["ADMIN"] },
  { name: "Installation Scheduling", path: "/installation", roles: ["ADMIN", "EMPLOYEE"] },
  { name: "Billing & GST", path: "/billing", roles: ["ADMIN"] },
  { name: "Vendor Management", path: "/vendors", roles: ["ADMIN"] },
  { name: "Profit Analytics", path: "/analytics", roles: ["ADMIN"] },
];

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(user?.role || "EMPLOYEE")
  );

  const getActiveMode = () => {
    const params = new URLSearchParams(location.search);
    return params.get("mode");
  };

  const activeMode = getActiveMode();

  return (
    <div style={styles.sidebar}>
      <div style={styles.title}>ERP SYSTEM</div>

      {filteredMenu.map((item) => {
        // WORKSPACE ITEM ACTIVE CHECK
        const isWorkspaceActive =
          item.workspace && activeMode === item.mode;

        // NORMAL ROUTE ACTIVE CHECK
        const isRouteActive =
          !item.workspace && location.pathname === item.path;

        const isActive = isWorkspaceActive || isRouteActive;

        if (item.workspace) {
          return (
            <div
              key={item.name}
              style={{
                ...styles.link,
                background: isActive
                  ? "linear-gradient(90deg, rgba(56, 88, 248, 0.9), rgba(14,165,233,0.7))"
                  : "transparent",
                color: isActive ? "#fff" : "#434242",
                boxShadow: isActive
                  ? "0 6px 18px rgba(56,189,248,0.45)"
                  : "none",
                transform: isActive
                  ? "translateX(6px)"
                  : "translateX(0)",
              }}
              onClick={() => navigate(`/workspace?mode=${item.mode}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateX(8px) scale(1.03)";
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.12)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(56,189,248,0.35)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform =
                    "translateX(0) scale(1)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {item.name}
            </div>
          );
        }

        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={{
              ...styles.link,
              textDecoration: "none",
              background: isActive
                ? "linear-gradient(90deg, rgba(0, 42, 255, 0.55), rgba(105, 205, 251, 0.7))"
                : "transparent",
              color: isActive ? "#fff" : "#282828",
              boxShadow: isActive
                ? "0 6px 18px rgba(212, 218, 255, 0.45)"
                : "none",
              transform: isActive
                ? "translateX(6px)"
                : "translateX(0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateX(8px) scale(1.03)";
              e.currentTarget.style.background =
                "rgba(255,255,255,0.12)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(56,189,248,0.35)";
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
              }
              e.currentTarget.style.transform = "translateX(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    background: "rgba(180, 203, 255, 0.77)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "black",
    display: "flex",
    flexDirection: "column",
    padding: "18px",
    margin: "12px",
    marginRight: "0",
    borderRadius: "20px",
    border: "1px solid rgba(255, 231, 231, 0.12)",
    boxShadow:
      "0 10px 30px rgb(252, 227, 227), inset 0 1px 0 rgba(255,255,255,0.08)",
    height: "calc(100vh - 24px)",
    overflowY: "auto",
  },

  title: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "20px",
    letterSpacing: "1px",
  },

  link: {
    padding: "14px 18px",
    fontWeight: "600",
    marginBottom: "10px",
    borderRadius: "12px",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid transparent",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    userSelect: "none",
  },
};