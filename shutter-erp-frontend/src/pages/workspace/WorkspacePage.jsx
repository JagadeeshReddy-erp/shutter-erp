// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// import SearchPanel from "./SearchPanel";
// import ResultPanel from "./ResultPanel";

// import {
//   getAllCustomers,
//   getCustomerByMobile,
//   getCustomersByName,
//   getCustomersByDateRange,
// } from "../../services/customerService";

// const WorkspacePage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const params = new URLSearchParams(location.search);
//   const mode = params.get("mode") || "CUSTOMER";

//   const [filters, setFilters] = useState({
//     name: "",
//     mobile: "",
//     fromDate: "",
//     toDate: "",
//   });

//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const [page, setPage] = useState(0);

//   const [pagination, setPagination] = useState({
//     pageNo: 0,
//     totalPages: 0,
//     totalElements: 0,
//     last: true,
//   });

//   useEffect(() => {
//     if (submitted) {
//       handleSearch();
//     }
//   }, [page]);

//   const updateFilters = (field, value) => {
//     if (field === "name") {
//       setFilters({
//         name: value,
//         mobile: "",
//         fromDate: "",
//         toDate: "",
//       });
//       return;
//     }

//     if (field === "mobile") {
//       setFilters({
//         name: "",
//         mobile: value,
//         fromDate: "",
//         toDate: "",
//       });
//       return;
//     }

//     if (field === "fromDate") {
//       setFilters((prev) => ({
//         ...prev,
//         name: "",
//         mobile: "",
//         fromDate: value,
//       }));
//       return;
//     }

//     if (field === "toDate") {
//       setFilters((prev) => ({
//         ...prev,
//         name: "",
//         mobile: "",
//         toDate: value,
//       }));
//     }
//   };

//   const handleSearch = async () => {
//     setLoading(true);

//     try {
//       let response;

//       const pageParams = {
//         page,
//         size: 10,
//       };

//       const hasMobile = filters.mobile?.trim() !== "";
//       const hasName = filters.name?.trim() !== "";
//       const hasDateRange =
//         filters.fromDate?.trim() !== "" &&
//         filters.toDate?.trim() !== "";

//       if (hasMobile) {
//         response = await getCustomerByMobile({
//           ...pageParams,
//           mobileNumber: filters.mobile,
//         });
//       } else if (hasName) {
//         response = await getCustomersByName({
//           ...pageParams,
//           name: filters.name,
//         });
//       } else if (hasDateRange) {
//         response = await getCustomersByDateRange({
//           ...pageParams,
//           fromDate: filters.fromDate,
//           toDate: filters.toDate,
//         });
//       } else {
//         response = await getAllCustomers(pageParams);
//       }

//       const responseData = response?.data?.data;

//       setResults(responseData?.content || []);

//       setPagination({
//         pageNo: responseData?.pageNo || 0,
//         totalPages: responseData?.totalPages || 0,
//         totalElements: responseData?.totalElements || 0,
//         last: responseData?.last || false,
//       });

//       setSubmitted(true);
//     } catch (err) {
//       console.error("Workspace error:", err);
//       setResults([]);
//     }

//     setLoading(false);
//   };

//   const resetSearch = () => {
//     setSubmitted(false);
//     setResults([]);
//     setPage(0);

//     setPagination({
//       pageNo: 0,
//       totalPages: 0,
//       totalElements: 0,
//       last: true,
//     });
//   };

//   return (
//     <div style={styles.container}>
//       {/* HEADER */}
//       <div style={styles.header}>
//         <div>
//           <h2 style={styles.title}>{mode} MANAGEMENT</h2>
//           <p style={styles.subtitle}>
//             Search and manage records in a clean workspace.
//           </p>
//         </div>

//         {mode === "CUSTOMER" && (
//           <button
//             style={styles.createBtn}
//             onClick={() => navigate("/customers/create")}
//           >
//              Create Customer
//           </button>
//         )}
//       </div>

//       {/* SEARCH AREA (HIGHLIGHTED MAIN FOCUS) */}
//       {!submitted && (
//         <div style={styles.searchCard}>        

//           <SearchPanel
//             filters={filters}
//             updateFilters={updateFilters}
//             handleSearch={handleSearch}
//             loading={loading}
//           />
//         </div>
//       )}

//       {/* RESULTS AREA */}
//       {submitted && (
//         <div style={styles.resultCard}>
//           <ResultPanel
//             results={results}
//             mode={mode}
//             onBack={resetSearch}
//             pagination={pagination}
//             page={page}
//             setPage={setPage}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkspacePage;

// /* ===================== STYLES ===================== */
// const styles = {
//   container: {
//     minHeight: "100vh",
//     padding: "24px",
//     background:
//       "linear-gradient(135deg, #eaf1ff 0%, #dbe7ff 50%, #eef4ff 100%)",
//     color: "#41ec08",
//   },

//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",

//     padding: "18px 22px",
//     marginBottom: "18px",

//     borderRadius: "20px",

//     background: "#1100fd00",
//     backdropFilter: "blur(14px)",
//     WebkitBackdropFilter: "blur(14px)",

//     border: "1px solid rgba(34, 143, 252, 0.7)",

//     boxShadow:
//       "0 10px 30px rgba(202, 206, 255, 0.72), inset 0 1px 0 rgba(255,255,255,0.2)",
//   },

//   title: {
//     margin: 0,
//     fontSize: "18px",
//     fontWeight: "600",
//     color: "#474749",
//     letterSpacing: "0.6px",
//   },

//   subtitle: {
//     margin: "4px 0 0",
//     fontSize: "13px",
//     color: "#87a3e4",
//   },

//   createBtn: {
//     padding: "10px 14px",
//     borderRadius: "12px",

//     background: "linear-gradient(135deg, #4f7cff, #6d28d9)",
//     color: "#fff",

//     border: "1px solid rgba(255,255,255,0.2)",

//     fontWeight: "700",
//     cursor: "pointer",

//     boxShadow: "0 8px 18px rgba(79,124,255,0.35)",
//   },

//   /* SEARCH CARD (MAIN FOCUS) */
//   searchCard: {
//     background: "rgba(163, 191, 255, 0.75)",
//     border: "1px solid rgb(210, 235, 255)",

//     borderRadius: "22px",
//     padding: "24px",
//     marginTop: "12px",

//     backdropFilter: "blur(16px)",
//     WebkitBackdropFilter: "blur(16px)",

//     boxShadow:
//       "0 12px 35px rgba(243, 249, 255, 0.81), inset 0 1px 0 rgba(255,255,255,0.25)",

//     transition: "all 0.3s ease",
//   },

  

//   /* RESULT AREA */
//   resultCard: {
//     background: "rgba(199, 212, 243, 0.55)",
//     borderRadius: "22px",
//     padding: "22px",

//     border: "1px solid rgba(255,255,255,0.18)",

//     backdropFilter: "blur(14px)",
//     WebkitBackdropFilter: "blur(14px)",

//     boxShadow:
//       "0 10px 25px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.2)",
//   },
// };




//src/workspace/WorkSpacePage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchPanel from "./SearchPanel";
import ResultPanel from "./ResultPanel";

import {
  getAllCustomers,
  getCustomerByMobile,
  getCustomersByName,
  getCustomersByDateRange,
} from "../../services/customerService";

const WorkspacePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const mode = params.get("mode") || "CUSTOMER";

  const [filters, setFilters] = useState({
    name: "",
    mobile: "",
    fromDate: "",
    toDate: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [page, setPage] = useState(0);

  const [pagination, setPagination] = useState({
    pageNo: 0,
    totalPages: 0,
    totalElements: 0,
    last: true,
  });

  // =======================================
  // RESTORE RESULTS IF NAVIGATING BACK
  // =======================================
  useEffect(() => {
    if (location.state?.returnToResults) {
      const saved = sessionStorage.getItem("customers");
      if (saved) {
        setResults(JSON.parse(saved));
        setSubmitted(true);
      }
    }
  }, [location.state]);

  // =======================================
  // AUTO SEARCH AFTER CUSTOMER CREATE
  // =======================================
  useEffect(() => {
    const mobile = location.state?.mobile;
    const autoSearch = location.state?.autoSearch;

    if (autoSearch && mobile) {
      setFilters({
        name: "",
        mobile,
        fromDate: "",
        toDate: "",
      });

      setSubmitted(true);

      // trigger API call after state update
      setTimeout(() => {
        handleSearch(undefined, mobile);
      }, 0);
    }
  }, [location.state]);

  // =======================================
  // TRIGGER SEARCH ON PAGE CHANGE
  // =======================================
  useEffect(() => {
    if (submitted) {
      handleSearch(page);
    }
  }, [page]);

  const updateFilters = (field, value) => {
    if (field === "name") {
      setFilters({ name: value, mobile: "", fromDate: "", toDate: "" });
      return;
    }

    if (field === "mobile") {
      setFilters({ name: "", mobile: value, fromDate: "", toDate: "" });
      return;
    }

    if (field === "fromDate") {
      setFilters((prev) => ({ ...prev, name: "", mobile: "", fromDate: value }));
      return;
    }

    if (field === "toDate") {
      setFilters((prev) => ({ ...prev, name: "", mobile: "", toDate: value }));
    }
  };

  const handleSearch = async (pageOverride, overrideMobile) => {
    setLoading(true);

    try {
      const pageParams = { page: pageOverride ?? page, size: 10 };

      const mobileValue = overrideMobile || filters.mobile;
      const hasMobile = mobileValue?.trim() !== "";
      const hasName = filters.name?.trim() !== "";
      const hasDateRange =
        filters.fromDate?.trim() !== "" && filters.toDate?.trim() !== "";

      let response;

      if (hasMobile) {
        response = await getCustomerByMobile({
          ...pageParams,
          mobileNumber: mobileValue,
        });
      } else if (hasName) {
        response = await getCustomersByName({ ...pageParams, name: filters.name });
      } else if (hasDateRange) {
        response = await getCustomersByDateRange({
          ...pageParams,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
        });
      } else {
        response = await getAllCustomers(pageParams);
      }

      const responseData = response?.data?.data;

      setResults(responseData?.content || []);

      // SAVE RESULTS FOR BACK NAVIGATION
      sessionStorage.setItem(
        "customers",
        JSON.stringify(responseData?.content || [])
      );

      setPagination({
        pageNo: responseData?.pageNo || 0,
        totalPages: responseData?.totalPages || 0,
        totalElements: responseData?.totalElements || 0,
        last: responseData?.last || false,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Workspace error:", err);
      setResults([]);
    }

    setLoading(false);
  };

  const resetSearch = () => {
    setSubmitted(false);
    setResults([]);
    setPage(0);

    setPagination({
      pageNo: 0,
      totalPages: 0,
      totalElements: 0,
      last: true,
    });
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            {mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()} Management
          </h2>
          <p style={styles.subtitle}>Search and manage records in a clean workspace.</p>
        </div>

        {mode === "CUSTOMER" && (
          <button
            style={styles.createBtn}
            onClick={() => navigate("/customers/create")}
          >
            Create Customer
          </button>
        )}
      </div>

      {/* SEARCH AREA */}
      {!submitted && (
        <div style={styles.searchCard}>
          <SearchPanel
            filters={filters}
            updateFilters={updateFilters}
            handleSearch={handleSearch}
            loading={loading}
          />
        </div>
      )}

      {/* RESULTS AREA */}
      {submitted && (
        <div style={styles.resultCard}>
          <ResultPanel
            results={results}
            mode={mode}
            onBack={resetSearch}
            pagination={pagination}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default WorkspacePage;

/* ===================== STYLES ===================== */
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
    padding: "18px 22px",
    marginBottom: "18px",
    borderRadius: "20px",
    background: "#1100fd00",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(49, 34, 252, 0.7)",
    boxShadow:
     "0 10px 30px rgba(255, 146, 146, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
  },

  title: { margin: 0, fontSize: "18px", fontWeight: "600", color: "#0000fe" },
  subtitle: { margin: "4px 0 0", fontSize: "13px", color: "#3a5594" },

  createBtn: {
    padding: "10px 14px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #4f7cff, #6d28d9)",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(79,124,255,0.35)",
  },

  searchCard: {
    background: "rgba(144, 179, 255, 0.75)",
    border: "1px solid rgb(255, 210, 210)",
    borderRadius: "22px",
    padding: "24px",
    marginTop: "12px",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow:
      "0 12px 35px rgba(243, 249, 255, 0.81), inset 0 1px 0 rgba(255,255,255,0.25)",
    transition: "all 0.3s ease",
  },

  resultCard: {
    background: "rgba(199, 212, 243, 0.55)",
    borderRadius: "22px",
    padding: "22px",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.2)",
  },
};