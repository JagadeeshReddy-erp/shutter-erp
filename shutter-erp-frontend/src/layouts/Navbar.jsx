import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
 console.log(user);
  return (
    <>
      {/* Inline style for keyframes */}
      <style>
        {`
          @keyframes shine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div style={styles.navbar}>

        {/* LEFT: Username */}
     <div style={styles.left}>
  {user && (
    <div style={styles.userInfo}>
      <div style={styles.username}>{user.username}</div>
      <div style={styles.role}>{user.role}</div>
    </div>
  )}
</div>

        {/* CENTER: Brand */}
        <div style={styles.brand}>REDDY  ERP  PROJECT</div>

        {/* RIGHT: Logout */}
        <div style={styles.right}>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>

      </div>
    </>
  );
}
const styles = {
  navbar: {
    height: "60px",
    minHeight: "60px",
    backgroundColor: "#c0d3ffd3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    margin: "12px",
    borderRadius: "16px",
    border: "1px solid rgba(0, 4, 248, 0.2)",
    boxShadow:
     "0 10px 30px rgb(254, 238, 238), inset 0 1px 0 rgba(255,255,255,0.08)",
  },

  left: {
    width: "150px",
    display: "flex",
    justifyContent: "flex-start",
  },

  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    lineHeight: "1.3",
  },

  username: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#0011ff",
    
  },

  role: {
    fontSize: "12px",
    color: "#455091",
    textTransform: "capitalize",
  },

 brand: {
  fontSize: "30px",
  fontWeight: "900",
  letterSpacing: "1px",
  textAlign: "center",
  flex: 1,
  background: 
  "linear-gradient(90deg, #ff8484, #323232, #e11d48, #0ea5e9, #7c3aed, #f97316, #beffd6)"
  ,
  backgroundSize: "250% 50%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "shine 4s ease-in-out infinite",
 textShadow: "0 1px 2px rgba(0,0,0,0.2)",
},

  right: {
    width: "150px",
    display: "flex",
    justifyContent: "flex-end",
  },

  logoutBtn: {
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    border: "none",
    padding: "8px 16px",
    color: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(254, 157, 157, 0.35)",
    transition: "all 0.3s ease",
  },
};