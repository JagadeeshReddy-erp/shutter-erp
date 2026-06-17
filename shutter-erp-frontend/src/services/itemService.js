import api from "./axiosConfig";

/* =========================
   ITEM MANAGEMENT
========================= */

// Create Item
export const createItem = async (data) => {
  try {
    const response = await api.post(
      "/inventory/itemMaster/createItem",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Update Item
export const updateItem = async (data) => {
  try {
    const response = await api.put(
      "/inventory/itemMaster/updateItemMaster",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Get All Items
export const getAllItems = async () => {
  try {
    const response = await api.get(
      "/inventory/itemMaster/getAllItems"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Get All Active Items
export const getAllActiveItems = async () => {
  try {
    const response = await api.get(
      "/inventory/itemMaster/getAllActiveItems"
    );
    return response;
  } catch (error) {
    console.error("Error fetching active items:", error);
    throw error;
  }
};