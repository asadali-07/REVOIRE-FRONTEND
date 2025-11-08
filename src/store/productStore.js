import { create } from "zustand";
import { productAPI } from "../services/productApi";

export const useProductStore = create((set, get) => ({
  // State
  products: [],
  product: null,
  loading: false,
  error: null,

  // Filter state
  filters: {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    skip: 0,
    limit: 20,
  },

  // Total products count for pagination
  totalProducts: 0,
  hasMore: true,

  // Set individual filter
  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        skip: key === 'search' || key === 'category' || key === 'minPrice' || key === 'maxPrice' ? 0 : state.filters.skip, // Reset skip on new filter
      },
    }));
  },

  // Set multiple filters at once
  setFilters: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }));
  },

  // Reset all filters
  resetFilters: () => {
    set({
      filters: {
        search: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        skip: 0,
        limit: 20,
      },
    });
  },

  // Create a new product
  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const data = await productAPI.createProduct(productData);
      set({ loading: false });
      get().getProducts(); // Refresh product list
      return data.product;
    } catch (error) {
      set({ error: error.message || "Failed to create product", loading: false });
      throw error;
    }
  },

  // Update a product
  updateProduct: async (id, productData) => {
    set({ loading: true, error: null });
    try {
      const data = await productAPI.updateProduct(id, productData);
      
      // Update the product in the products list
      set((state) => ({
        products: state.products.map(p => 
          p._id === id ? data.product : p
        ),
        product: state.product?._id === id ? data.product : state.product,
        loading: false,
      }));
      return data.product;
    } catch (error) {
      set({ error: error.message || "Failed to update product", loading: false });
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await productAPI.deleteProduct(id);
      
      // Remove the product from the products list
      set((state) => ({
        products: state.products.filter(p => p._id !== id),
        product: state.product?._id === id ? null : state.product,
        loading: false,
      }));
      return true;
    } catch (error) {
      set({ error: error.message || "Failed to delete product", loading: false });
      throw error;
    }
  },

  // Get products with current filters
  getProducts: async (additionalParams = {}) => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const params = {
        ...state.filters,
        ...additionalParams,
      };

      // Remove empty values
      Object.keys(params).forEach(key => {
        if (params[key] === "" || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const data = await productAPI.getProducts(params);

      set({
        products: data.products,
        loading: false,
        hasMore: data.products.length === state.filters.limit,
      });

      return data.products;
    } catch (error) {
      set({ error: error.message || "Failed to fetch products", loading: false });
      return [];
    }
  },

  // Load more products (pagination)
  loadMoreProducts: async () => {
    const state = get();
    if (!state.hasMore || state.loading) return;

    set((state) => ({
      filters: {
        ...state.filters,
        skip: state.filters.skip + state.filters.limit,
      },
    }));

    set({ loading: true });
    try {
      const data = await productAPI.getProducts(state.filters);

      set((state) => ({
        products: [...state.products, ...data.products],
        loading: false,
        hasMore: data.products.length === state.filters.limit,
      }));
    } catch (error) {
      set({ error: error.message || "Failed to load more products", loading: false });
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await productAPI.getProductById(id);
      set({ product: data.product, loading: false });
      return data.product;
    } catch (error) {
      set({ error: error.message || "Failed to fetch product", loading: false });
      return null;
    }
  },

  // Clear current product
  clearProduct: () => {
    set({ product: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));