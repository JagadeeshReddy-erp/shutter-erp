// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080",
// });

// // AUTO ATTACH TOKEN
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// REQUEST INTERCEPTOR (you already have this)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR (🔥 THIS FIXES YOUR ISSUE)
api.interceptors.response.use(
  (response) => {
    // SUCCESS (2xx)
    return response;
  },
  (error) => {
    // ERROR (400, 500 etc.)

    const customError = {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
      status: error?.response?.status,
    };

    return Promise.reject(customError);
  }
);

export default api;