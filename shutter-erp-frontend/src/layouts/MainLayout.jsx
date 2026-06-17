import { Outlet } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";

export default function MainLayout() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f1f5f9",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "auto",
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div
          style={{
            flex: 1,
            margin: "16px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgb(255, 231, 231), inset 0 1px 0 rgba(255,255,255,0.08)",
            overflow: "auto", // No scrolling
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}