import { create } from 'zustand';
import { cartAPI } from '../services/cartApi';

export const useCartStore = create((set) => ({
    cart: [],
    fetchCart: async () => {
        const cartItems = await cartAPI.getCart();
        set({ cart: cartItems });
    },
    addToCart: async (productId, qty) => {
        const updatedCart = await cartAPI.addToCart(productId, qty);
        set({ cart: updatedCart });
    },
    removeFromCart: async (productId) => {
        const updatedCart = await cartAPI.removeFromCart(productId);
        set({ cart: updatedCart });
    },
    increaseQuantity: async (productId) => {
        const updatedCart = await cartAPI.increaseQuantity(productId);
        set({ cart: updatedCart });
    }, 
    decreaseQuantity: async (productId) => {
        const updatedCart = await cartAPI.decreaseQuantity(productId);
        set({ cart: updatedCart });
    },
    clearCart: async () => {
        const updatedCart = await cartAPI.clearCart();
        set({ cart: updatedCart });
    }

}));
