import api from "./axiosConfig";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    return {
      success: false,
      message: "Server not reachable",
    };
  }
};