import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "../data/products";

type WishlistStore = {
  favorites: string[];

  toggleFavorite: (productId: string) => void;

  removeFavorite: (productId: string) => void;

  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (productId) => {
        const productExists = products.some(
          (product) => product.id === productId
        );

        if (!productExists) return;

        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter(
                (id) => id !== productId
              )
            : [...state.favorites, productId],
        }));
      },

      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (id) => id !== productId
          ),
        })),

      clearWishlist: () => set({ favorites: [] }),
    }),
    {
      name: "shiro-wishlist",
      skipHydration: true,

      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);
