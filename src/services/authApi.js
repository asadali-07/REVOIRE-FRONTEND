import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://revoire-auth-1.onrender.com/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/login", credentials),
  register: (userData) => api.post("/register", userData),
  getCurrentUser: () => api.get("/me"),
  updateUser:(userData) => api.patch("/users/me", userData),
  getUserDetails: () => api.get(`/users/me`),
  getAllSavedAddresses: () => api.get("/users/me/addresses"),
  addNewAddress: (addressData) => api.post("/users/me/addresses", addressData),
  updateAddress: (addressId, addressData) => api.patch(`/users/me/addresses/${addressId}`, addressData),
  deleteAddress: (addressId) => api.delete(`/users/me/addresses/${addressId}`),
  logout: () => api.get("/logout"),
};

