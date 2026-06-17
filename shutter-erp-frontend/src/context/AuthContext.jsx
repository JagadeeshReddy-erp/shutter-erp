// //src/context/AuthContext.jsx
// import { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Load user from token on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const decoded = jwtDecode(token);

//         setUser({
//           token,
//           username: decoded.sub,
//           role: decoded.role,
//         });
//       } catch (error) {
//         console.log("Invalid token");
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   // LOGIN
//   const login = (token) => {
//     localStorage.setItem("token", token);

//     const decoded = jwtDecode(token);

//     const userData = {
//       token,
//       username: decoded.sub,
//       role: decoded.role,
//     };

//     setUser(userData);
//   };

//   // LOGOUT
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }



import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // helper: check expiry
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // Load user from token on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      // ❌ expired token
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setUser(null);

        window.dispatchEvent(
          new CustomEvent("auth-error", {
            detail: "Session expired. Please login again.",
          })
        );

        return;
      }

      // ✅ valid token
      setUser({
        token,
        username: decoded.sub,
        role: decoded.role,
      });
    } catch (error) {
      console.log("Invalid token");
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  // LOGIN
  const login = (token) => {
    try {
      const decoded = jwtDecode(token);

      // ❌ reject expired token
      if (decoded.exp * 1000 < Date.now()) {
        window.dispatchEvent(
          new CustomEvent("auth-error", {
            detail: "Received expired token.",
          })
        );
        return;
      }

      localStorage.setItem("token", token);

      setUser({
        token,
        username: decoded.sub,
        role: decoded.role,
      });
    } catch (error) {
      console.log("Invalid token on login");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}