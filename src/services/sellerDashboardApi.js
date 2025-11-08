import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3008/api/seller/dashboard",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sellerDashboardAPI = {
  // Get Metrics
  getMetrics: async () => {
    const response = await api.get("/metrics");
    return response.data;
  },

  // Get All Products
  getAllProducts: async () => {
    const response = await api.get("/products");
    return response.data;
  },

  // Get All Orders
  getAllOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },
};