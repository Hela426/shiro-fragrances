"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../store/wishlist-store";
import { useTranslation } from "../lib/use-translation";

export default function WishlistButton() {
  const { t } = useTranslation();

  const count = useWishlistStore(
    (state) => state.favorites.length
  );

  return (
    <Link
      href="/wishlist"
      className="cart-nav-button"
      aria-label={`${t.wishlist.name}, ${count} ${t.wishlist.counter}`}
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
