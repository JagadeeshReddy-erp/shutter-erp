import api from "./axiosConfig";

/* =========================
   STOCK MANAGEMENT
========================= */

// Add Stock
export const addStock = async (data) => {
  try {
    const response = await api.post(
      "/inventory/stock/addStock",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
};

// Get stock by date range (paginated)
export const getStocksByDateRange = async ({
  startDate,
  endDate,
  page = 0,
  size = 10,
}) => {
  const response = await api.get("/inventory/stock/date-range", {
    params: { startDate, endDate, page, size },
  });

  return response;
};

export const getStocksByItem = async ({
  itemId,
  startDate,
  endDate,
  page = 0,
  size = 10,
}) => {
  const response = await api.get(`/inventory/stock/item/${itemId}`, {
    params: { startDate, endDate, page, size },
  });

  return response;
};