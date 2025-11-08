import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:3002/api/wishlist",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Wishlist API
export const wishlistAPI = {
  // Get wishlist items for the user
    getWishlist: async () => {
        try {
            const response = await api.get("/");
            return response.data.wishlist.items;
        } catch (error) {
            return  {message: error.response?.data || "Failed to fetch wishlist items" };
        }
    },
    toggleWishlist: async (productId) => {
        try {
            const response = await api.post("/items", { productId });
            return response.data.wishlist.items;
        } catch (error) {
            return  {message: error.response?.data || "Failed to update wishlist" };
        }
    },
}