import {create} from 'zustand';
import { wishlistAPI } from '../services/wishlistApi';

export const useWishlistStore = create((set, get) => ({
    wishlist: [],
    selectAll: false,
    selectedCount: 0,
    selectedTotal: 0,
    
    // Update computed values whenever wishlist changes
    updateComputedValues: () => {
        const state = get();
        const selectedCount = state.wishlist.filter((item) => item.selected).length;
        const selectedTotal = state.wishlist
            .filter((item) => item.selected)
            .reduce((acc, item) => acc + item.price.amount, 0);
        
        set({ selectedCount, selectedTotal });
    },
    
    fetchWishlist: async () => {
        try {
            const wishlistItems = await wishlistAPI.getWishlist();
            const itemsWithSelection = wishlistItems.map(item => ({
                ...item,
                selected: false
            }));
            set({ wishlist: itemsWithSelection, selectAll: false, selectedCount: 0, selectedTotal: 0 });
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        }
    },
    
    toggleWishlist: async (productId) => {
        try {
            const updatedWishlist = await wishlistAPI.toggleWishlist(productId);
            const itemsWithSelection = updatedWishlist.map(item => ({
                ...item,
                selected: false
            }));
            set({ wishlist: itemsWithSelection, selectAll: false, selectedCount: 0, selectedTotal: 0 });
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
        }
    },
    
    toggleSelect: (productId) => {
        set((state) => {
            const updatedWishlist = state.wishlist.map((item) =>
                item.productId === productId ? { ...item, selected: !item.selected } : item
            );
            const allSelected = updatedWishlist
                .filter(item => item.stock > 0)
                .every((item) => item.selected);
            
            // Calculate computed values
            const selectedCount = updatedWishlist.filter((item) => item.selected).length;
            const selectedTotal = updatedWishlist
                .filter((item) => item.selected)
                .reduce((acc, item) => acc + item.price.amount, 0);
            
            return { 
                wishlist: updatedWishlist, 
                selectAll: allSelected,
                selectedCount,
                selectedTotal
            };
        });
    },
    
    toggleSelectAll: () => {
        set((state) => {
            const newSelectAll = !state.selectAll;
            const updatedWishlist = state.wishlist.map((item) => ({
                ...item,
                selected: item.stock > 0 ? newSelectAll : false,
            }));
            
            // Calculate computed values
            const selectedCount = updatedWishlist.filter((item) => item.selected).length;
            const selectedTotal = updatedWishlist
                .filter((item) => item.selected)
                .reduce((acc, item) => acc + item.price.amount, 0);
            
            return { 
                wishlist: updatedWishlist, 
                selectAll: newSelectAll,
                selectedCount,
                selectedTotal
            };
        });
    },
    
    removeSelected: () => {
        set((state) => {
            const updatedWishlist = state.wishlist.filter((item) => !item.selected);
            return { 
                wishlist: updatedWishlist, 
                selectAll: false,
                selectedCount: 0,
                selectedTotal: 0
            };
        });
    },
}));