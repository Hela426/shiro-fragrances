"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../store/wishlist-store";

export default function WishlistButton() {
  const count = useWishlistStore(
    (state) => state.favorites.length
  );

  return (
    <Link
      href="/wishlist"
      className="cart-nav-button"
      aria-label={`Wishlist, ${count} favorite fragrances`}
    >
      <Heart size={22} strokeWidth={1.5} />

      {count > 0 && (
        <span className="cart-counter">
          {count}
        </span>
      )}
    </Link>
  );
}