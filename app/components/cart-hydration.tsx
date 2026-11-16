"use client";

import { useEffect } from "react";
import { useCartStore } from "../store/cart-store";
import { useWishlistStore } from "../store/wishlist-store";

export default function CartHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
  }, []);

  return null;
}