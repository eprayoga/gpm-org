import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState } from "@/types/store.types";

interface CartStore extends CartState {
  // Actions
  addToCart: (item: Omit<CartItem, "addedAt">) => void;
  removeFromCart: (
    productId: string,
    variantIndex: number,
    size: string,
  ) => void;
  updateQuantity: (
    productId: string,
    variantIndex: number,
    size: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: (products: any[]) => number;
  isInCart: (productId: string, variantIndex: number, size: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existingItemIndex = get().items.findIndex(
          (i) =>
            i.productId === item.productId &&
            i.variantIndex === item.variantIndex &&
            i.size === item.size,
        );

        if (existingItemIndex > -1) {
          // Update quantity if item already exists
          set((state) => ({
            items: state.items.map((i, index) =>
              index === existingItemIndex
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          }));
        } else {
          // Add new item
          set((state) => ({
            items: [
              ...state.items,
              {
                ...item,
                addedAt: new Date().toISOString(),
              },
            ],
          }));
        }
      },

      removeFromCart: (productId, variantIndex, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.variantIndex === variantIndex &&
                item.size === size
              ),
          ),
        }));
      },

      updateQuantity: (productId, variantIndex, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, variantIndex, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId &&
            item.variantIndex === variantIndex &&
            item.size === size
              ? { ...item, quantity }
              : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartTotal: (products) => {
        return get().items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return total;
          return total + product.price * item.quantity;
        }, 0);
      },

      isInCart: (productId, variantIndex, size) => {
        return get().items.some(
          (item) =>
            item.productId === productId &&
            item.variantIndex === variantIndex &&
            item.size === size,
        );
      },
    }),
    {
      name: "cart-storage", // localStorage key
      // Optional: You can add version and migration logic
      version: 1,
    },
  ),
);
