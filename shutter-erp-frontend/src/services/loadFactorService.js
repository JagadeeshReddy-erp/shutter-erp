import api from "./axiosConfig";

export const getAllLoadFactors = async () => {
  const response = await api.get(
    "/inventory/loadFactor/getAll"
  );
  return response.data;
};

export const getLoadFactorById = async (id) => {
  const response = await api.get(
    `/inventory/loadFactor/getById/${id}`
  );
  return response.data;
};

export const createLoadFactor = async (payload) => {
  const response = await api.post(
    "/inventory/loadFactor/create",
    payload
  );
  return response.data;
};

export const updateLoadFactor = async (payload) => {
  const response = await api.put(
    "/inventory/loadFactor/update",
    payload
  );
  return response.data;
};

export const deleteLoadFactor = async (id) => {
  const response = await api.delete(
    `/inventory/loadFactor/delete/${id}`
  );
  return response.data;
};