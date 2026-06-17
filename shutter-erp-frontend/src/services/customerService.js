import api from "./axiosConfig";

// =====================
// SEARCH APIs
// =====================

// BY NAME
export const getCustomersByName = (params) => {
  return api.get(
    `/customers/name?name=${params.name}&page=${params.page}&size=${params.size}`
  );
};

// BY MOBILE
export const getCustomerByMobile = (params) => {
  return api.get(
    `/customers/mobile?mobileNumber=${params.mobileNumber}&page=${params.page}&size=${params.size}`
  );
};

// BY DATE RANGE
export const getCustomersByDateRange = (params) => {
  return api.get(
    `/customers/getAllCustomersByDateRange?page=${params.page}&size=${params.size}&fromDate=${params.fromDate}&toDate=${params.toDate}`
  );
};

// GET ALL
export const getAllCustomers = (params) => {
  return api.get(
    `/customers/getAllCustomers?page=${params.page}&size=${params.size}`
  );
};


// =====================
// CRUD APIs
// =====================

// CREATE
export const createCustomer = (payload) => {
  return api.post("/customers/CreateCustomer", payload);
};

// GET BY ID
export const getCustomerById = (id) => {
  return api.get(`/customers/${id}`);
};

// UPDATE
export const updateCustomer = (id, payload) => {
  return api.put(`/customers/${id}`, payload);
};

// DELETE
export const deleteCustomer = (id) => {
  return api.delete(`/customers/${id}`);
};