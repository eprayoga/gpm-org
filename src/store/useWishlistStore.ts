import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistItem, WishlistState } from "@/types/store.types";

interface WishlistStore extends WishlistState {
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (productId) => {
        const exists = get().items.some((item) => item.productId === productId);

        if (!exists) {
          set((state) => ({
            items: [
              ...state.items,
              {
                productId,
                addedAt: new Date().toISOString(),
              },
            ],
          }));
        }
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      toggleWishlist: (productId) => {
        const isInWishlist = get().isInWishlist(productId);

        if (isInWishlist) {
          get().removeFromWishlist(productId);
        } else {
          get().addToWishlist(productId);
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },

      getWishlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage",
      version: 1,
    },
  ),
);
