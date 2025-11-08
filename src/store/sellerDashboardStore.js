import { create } from "zustand";
import {sellerDashboardAPI} from '../services/sellerDashboardApi';

export const useSellerDashboardStore = create((set) => ({
  // State
  metrics: null,
  products: [],
  orders: [],
  loading: false,
  error: null,

  // Fetch Metrics
  fetchMetrics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await sellerDashboardAPI.getMetrics();
      set({ metrics: response, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch metrics",
        loading: false,
      });
    }
  },

  // Fetch All Products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await sellerDashboardAPI.getAllProducts();
      set({ products: response, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch products",
        loading: false,
      });
    }
  },

  // Fetch All Orders
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await sellerDashboardAPI.getAllOrders();
      set({ orders: response, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch orders",
        loading: false,
      });
    }
  },

  // Add product to the list (called after create)
  addProductToList: (newProduct) => {
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },

  // Update product in the list (called after update)
  updateProductInList: (updatedProduct) => {
    set((state) => ({
      products: state.products.map(p => 
        p._id === updatedProduct._id ? updatedProduct : p
      ),
    }));
  },

  // Remove product from list (called after delete)
  removeProductFromList: (productId) => {
    set((state) => ({
      products: state.products.filter(p => p._id !== productId),
    }));
  },

  // Clear Error
  clearError: () => set({ error: null }),
}));