import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart, CartItem, Product } from "@/types";

interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number, selectedColor?: string, customization?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product, quantity = 1, selectedColor, customization) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === selectedColor
          );

          let newItems: CartItem[];

          if (existingItemIndex > -1) {
            // Update existing item
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
          } else {
            // Add new item
            const newItem: CartItem = {
              product,
              quantity,
              selectedColor,
              customization,
              price: product.price,
            };
            newItems = [...state.items, newItem];
          }

          const total = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: newItems, total, itemCount };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.product.id !== productId
          );
          const total = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: newItems, total, itemCount };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          const total = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return { items: newItems, total, itemCount };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      getItemCount: () => {
        return get().itemCount;
      },
    }),
    {
      name: "blushloom-cart",
    }
  )
);

// Made with Bob
