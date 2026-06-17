// src/services/employeeService.js
import api from "./axiosConfig"; // assuming you have an Axios instance in services/api.js

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get("/auth/users");
    return response.data; // { success, message, data }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/auth/id/${id}`);
    return response.data; // { success, message, data }
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// Create a new user
export const createUser = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data; // { success, message, data }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update existing user
export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/auth/users/${id}`, data);
    return response.data; // { success, message, data }
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};