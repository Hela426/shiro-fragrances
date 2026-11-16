"use client";

import { useEffect } from "react";

import { useCartStore } from "../store/cart-store";
import { useWishlistStore } from "../store/wishlist-store";
import { useLanguageStore } from "../store/language-store";

export default function CartHydration() {
  const language = useLanguageStore(
    (state) => state.language
  );

  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
    void useLanguageStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}