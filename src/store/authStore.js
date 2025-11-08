import { create } from "zustand";
import { authAPI } from "../services/authApi";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  user: null,
  socket: null,
  isTyping:false,
  messages: [
    {
      id: Date.now(),
      type: 'bot',
      text: 'Welcome to our luxury collection. How may I assist you today?',
      timestamp: new Date(),
    },
  ],
  userDetails: null,
  error: null,
  connectSocket: async () => {
    const socket = io("https://revoire-ai-buddy.onrender.com", {
      withCredentials: true,
    });
    set({ socket });
    socket.on("connect", () => {
      console.log("Socket connected");
    });
    socket.on("ai-message", (data) => {
      set({
        messages: [...get().messages, {
          id: Date.now(),
          type: 'bot',
          text: data,
          timestamp: new Date(),
        },]
      })
      get().setTyping(false)
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  },
  setMessages: (messages) => {
    set({ messages })
  },
  setTyping:(value)=>{
    set({isTyping:value})
  },
  login: async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      set({
        user: response.data.user,
        userDetails: response.data.user,
        error: null,
      });
      get().connectSocket();
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      set({
        error: errorMessage,
      });
    }
  },

  register: async (userData) => {
    try {
      const response = await authAPI.register(userData);
      set({
        user: response.data.user,
        userDetails: response.data.user,
        error: null,
      });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Registration failed";
      set({
        error: errorMessage,
      });
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({
        user: null,
        error: null,
        userDetails: null,
      });
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await authAPI.getCurrentUser();
      set({
        user: response.data.user,
      });
      get().connectSocket();
    } catch {
      set({
        user: null,
        error: null,
      });
    }
  },
  getUserDetails: async () => {
    try {
      const response = await authAPI.getUserDetails();
      set({
        userDetails: response.data.user,
      });
    } catch {
      set({
        userDetails: null,
        error: null,
      });
    }
  },
  updateUser: async (userData) => {
    try {
      const response = await authAPI.updateUser(userData);
      set({
        userDetails: response.data.user,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Update user failed";
      set({
        error: errorMessage,
      });
    }
  },
  addNewAddress: async (addressData) => {
    try {
      const response = await authAPI.addNewAddress(addressData);
      set((state) => ({
        userDetails: {
          ...state.userDetails,
          addresses: response.data.addresses,
        },
      }));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Add address failed";
      set({
        error: errorMessage,
      });
    }
  },
  updateAddress: async (addressId, addressData) => {
    try {
      const response = await authAPI.updateAddress(addressId, addressData);
      set((state) => ({
        userDetails: {
          ...state.userDetails,
          addresses: response.data.addresses,
        },
      }));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Update address failed";
      set({
        error: errorMessage,
      });
    }
  },
  deleteAddress: async (addressId) => {
    try {
      await authAPI.deleteAddress(addressId);
      set((state) => ({
        userDetails: {
          ...state.userDetails,
          addresses: state.userDetails.addresses.filter((address) => address._id !== addressId),
        },
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Delete address failed";
      set({
        error: errorMessage,
      });
    }
  },
}));


