import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://revoire-order.onrender.com/api/orders",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const orderAPI = {
  // Create a new order
  createOrder: async () => {
    try {
      const response = await api.post("/");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create order" };
    }
  },

  // Get all user orders
  getAllUserOrders: async () => {
    try {
      const response = await api.get("/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch orders" };
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch order" };
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    try {
      const response = await api.post(`/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to cancel order" };
    }
  },

  // Update order address
  updateOrderAddress: async (orderId, shippingAddress) => {
    try {
      const response = await api.post(`/${orderId}/address`, { shippingAddress });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update order address" };
    }
  },
};

export default orderAPI;


