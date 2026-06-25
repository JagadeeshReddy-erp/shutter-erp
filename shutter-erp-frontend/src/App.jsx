
//src/app.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";

import AlertModal from "./components/common/AlertModal";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

import WorkspacePage from "./pages/workspace/WorkspacePage";
import CustomerCreatePage from "./pages/customers/CustomerCreatePage";
import CustomerEditPage from "./pages/customers/CustomerEditPage";
import CustomerViewPage from "./pages/customers/CustomerViewPage";

import EmployeeListPage from "./pages/employees/EmployeeListPage";
import EmployeeCreatePage from "./pages/employees/EmployeeCreatePage";
import EmployeeEditPage from "./pages/employees/EmployeeEditPage";


import MaterialInventoryPage from "./pages/inventory/MaterialInventoryPage";

// ITEM
import ItemCreate from "./pages/inventory/item/ItemCreate";
import ItemManage from "./pages/inventory/item/ItemManage";
import ItemEdit from "./pages/inventory/item/ItemEdit";

// STOCK
import StockCreate from "./pages/inventory/stock/StockCreate";
import StockManage from "./pages/inventory/stock/StockManage";

// LOAD FACTORS
import LoadFactorListPage from "./pages/inventory/loadFactor/LoadFactorListPage";
import CreateLoadFactorPage from "./pages/inventory/loadFactor/CreateLoadFactorPage";
import EditLoadFactorPage from "./pages/inventory/loadFactor/EditLoadFactorPage";


function App() {
  const { user } = useContext(AuthContext);

  const [alert, setAlert] = useState(null);

  // listen for auth errors (JWT expiry etc.)
  useEffect(() => {
    const handler = (e) => {
      setAlert(e.detail);
    };

    window.addEventListener("auth-error", handler);

    return () => window.removeEventListener("auth-error", handler);
  }, []);

  return (
    <Router>
      {/* GLOBAL ALERT MODAL */}
      <AlertModal
        message={alert}
        onClose={() => setAlert(null)}
        onConfirm={() => {
          setAlert(null);
          window.location.href = "/login";
        }}
      />

      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
        />

        {/* PROTECTED ROUTES */}
        <Route element={user ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace" element={<WorkspacePage />} />

          <Route path="/customers/create" element={<CustomerCreatePage />} />
          <Route path="/customers/edit/:id" element={<CustomerEditPage />} />
          <Route path="/customers/:id" element={<CustomerViewPage />} />

          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/create" element={<EmployeeCreatePage />} />
          <Route path="/employees/edit/:id" element={<EmployeeEditPage />} />
          <Route path="/inventory/item/edit"  element={<ItemEdit />}/>

     {/* INVENTORY HOME */}
      <Route path="/inventory" element={<MaterialInventoryPage />} />

      {/* ITEM */}
      <Route path="/inventory/item/create" element={<ItemCreate />} />
      <Route path="/inventory/item/manage" element={<ItemManage />} />

      {/* STOCK */}
      <Route path="/inventory/stock/create" element={<StockCreate />} />
      <Route path="/inventory/stock/manage" element={<StockManage />} />

       {/* LOAD FACTORS */}
      <Route path="/inventory/load-factor/manage"element={<LoadFactorListPage />}/>
      <Route path="/inventory/load-factor/create" element={<CreateLoadFactorPage />}/>
      <Route path="/inventory/load-factor/edit/:id" element={<EditLoadFactorPage />}/>
        </Route>

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;