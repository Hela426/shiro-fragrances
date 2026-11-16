"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "../store/wishlist-store";

type Props = {
  productId: string;
  productName: string;
  className?: string;
};

export default function FavoriteButton({
  productId,
  productName,
  className = "",
}: Props) {
  const isFavorite = useWishlistStore(
    (state) => state.favorites.includes(productId)
  );

  const toggleFavorite = useWishlistStore(
    (state) => state.toggleFavorite
  );

  return (
    <button
      type="button"
      className={`favorite-button ${
        isFavorite ? "is-favorite" : ""
      } ${className}`}
      aria-label={
        isFavorite
          ? `Remove ${productName} from wishlist`
          : `Add ${productName} to wishlist`
      }
      aria-pressed={isFavorite}
      onClick={() => toggleFavorite(productId)}
    >
      <Heart
        size={21}
        strokeWidth={1.5}
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}