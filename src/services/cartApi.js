import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:3002/api/cart",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Cart API
export const cartAPI = {
  // Get cart items for the user
    getCart: async () => {
        try {
            const response = await api.get("/");
            return response.data.cart.items;
        } catch (error) {
            return  { message:error.response?.data || "Failed to fetch cart items" };
        }
    },

    addToCart: async (productId, qty) => {
        try {
            const response = await api.post("/items", { productId, qty });
            return response.data.cart.items;
        } catch (error) {
            return { message: error.response?.data || "Failed to add item to cart" };
        }
    },
    increaseQuantity: async (productId) => {
        try {
            const response = await api.patch(`/items/${productId}/increase`);
            return response.data.cart.items;
        } catch (error) {
            return { message: error.response?.data || "Failed to increase item quantity" };
        }
    },

    decreaseQuantity: async (productId) => {
        try {
            const response = await api.patch(`/items/${productId}/decrease`);
            return response.data.cart.items;
        } catch (error) {
            return { message: error.response?.data || "Failed to decrease item quantity" };
        }
    },
    removeFromCart: async (productId) => {
        try {
            const response = await api.delete(`/items/${productId}`);
            return response.data.cart.items;
        } catch (error) {
            return { message: error.response?.data || "Failed to remove item from cart" };
        }
    },
    clearCart: async () => {
        try {
            const response = await api.delete("/clear");
            return response.data.cart.items;
        } catch (error) {
            return { message: error.response?.data || "Failed to clear cart" };
        }
    },

}