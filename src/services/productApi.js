import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:3001/api/products",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Product API
export const productAPI = {

  // Create a new product (Seller only)
  createProduct: async (productData) => {
    try {
      const response = await api.post("/", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create product" };
    }
  },

  // Get all products with filters
  getProducts: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add query parameters if they exist
      if (params.search) queryParams.append("q", params.search);
      if (params.category) queryParams.append("category", params.category);
      if (params.minPrice) queryParams.append("minPrice", params.minPrice);
      if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);
      if (params.skip) queryParams.append("skip", params.skip);
      if (params.limit) queryParams.append("limit", params.limit);

      const response = await api.get(`/?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch products" };
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch product" };
    }
  },

  // Update product (Seller only)
  updateProduct: async (id, productData) => {
    try {
      // Check if productData is FormData (for image updates)
      const isFormData = productData instanceof FormData;
      
      const response = await api.patch(`/${id}`, productData, {
        headers: isFormData ? {
          "Content-Type": "multipart/form-data",
        } : {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update product" };
    }
  },

  // Delete product (Seller only)
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete product" };
    }
  },

};

export default productAPI;