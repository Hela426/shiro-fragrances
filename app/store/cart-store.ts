import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "../data/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addItem: (
    productId: string,
    quantity?: number
  ) => void;

  removeItem: (productId: string) => void;

  updateQuantity: (
    productId: string,
    quantity: number
  ) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (productId, quantity = 1) => {
        const product = products.find(
          (item) => item.id === productId
        );

        if (
          !product ||
          product.stock <= 0 ||
          !Number.isInteger(quantity) ||
          quantity <= 0
        ) return;

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === productId
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + quantity,
                        product.stock
                      ),
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId,
                quantity: Math.min(
                  quantity,
                  product.stock
                ),
              },
            ],
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.productId !== productId
          ),
        })),

      updateQuantity: (productId, quantity) => {
        const product = products.find(
          (item) => item.id === productId
        );

        if (!product || !Number.isInteger(quantity)) {
          return;
        }

        if (quantity <= 0 || product.stock <= 0) {
          set((state) => ({
            items: state.items.filter(
              (item) => item.productId !== productId
            ),
          }));

          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: Math.min(
                    quantity,
                    product.stock
                  ),
                }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "shiro-shopping-cart",
      skipHydration: true,

      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);