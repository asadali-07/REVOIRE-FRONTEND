import { create } from 'zustand';
import { orderAPI } from '../services/orderApi';

export const useOrderStore = create((set, get) => ({
  // State
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  // Order statistics
  orderStats: {
    pending: 0,
    confirmed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    total: 0,
  },

  // Create a new order
  createOrder: async () => {
    set({ loading: true, error: null });
    try {
      const data = await orderAPI.createOrder();

      // Don't add to orders array here, let fetchOrders handle it
      set({
        currentOrder: data.order,
        loading: false,
      });
      
      // Fetch all orders again to get updated list from server
      await get().fetchOrders();
      
      return data.order;
    } catch (error) {
      set({ 
        error: error.message || error.error || "Failed to create order", 
        loading: false 
      });
      throw error;
    }
  },

  // Get all user orders
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const data = await orderAPI.getAllUserOrders();
      set({ 
        orders: data.orders, 
        loading: false 
      });
      get().updateOrderStats();
      return data.orders;
    } catch (error) {
      set({ 
        error: error.message || error.error || "Failed to fetch orders", 
        loading: false 
      });
      return [];
    }
  },

  // Get order by ID
  fetchOrderById: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const data = await orderAPI.getOrderById(orderId);
      set({ 
        currentOrder: data.order, 
        loading: false 
      });
      return data.order;
    } catch (error) {
      set({ 
        error: error.message || error.error || "Failed to fetch order", 
        loading: false 
      });
      return null;
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const data = await orderAPI.cancelOrder(orderId);
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? data.order : order
        ),
        currentOrder: state.currentOrder?._id === orderId ? data.order : state.currentOrder,
        loading: false,
      }));
      get().updateOrderStats();
      return data.order;
    } catch (error) {
      set({ 
        error: error.message || error.error || "Failed to cancel order", 
        loading: false 
      });
      throw error;
    }
  },

  // Update order address
  updateOrderAddress: async (orderId, shippingAddress) => {
    set({ loading: true, error: null });
    try {
      const data = await orderAPI.updateOrderAddress(orderId, shippingAddress);
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? data.order : order
        ),
        currentOrder: state.currentOrder?._id === orderId ? data.order : state.currentOrder,
        loading: false,
      }));
      return data.order;
    } catch (error) {
      set({ 
        error: error.message || error.error || "Failed to update order address", 
        loading: false 
      });
      throw error;
    }
  },

  // Update order statistics
  updateOrderStats: () => {
    const state = get();
    const stats = {
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      total: state.orders.length,
    };

    state.orders.forEach((order) => {
      const status = order.status.toLowerCase();
      if (stats[status] !== undefined) {
        stats[status]++;
      }
    });

    set({ orderStats: stats });
  },

  // Get orders by status
  getOrdersByStatus: (status) => {
    const state = get();
    return state.orders.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase()
    );
  },

  // Get recent orders
  getRecentOrders: (limit = 5) => {
    const state = get();
    return state.orders.slice(0, limit);
  },

  // Clear current order
  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  resetStore: () => {
    set({
      orders: [],
      currentOrder: null,
      loading: false,
      error: null,
      orderStats: {
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        total: 0,
      },
    });
  },
}));