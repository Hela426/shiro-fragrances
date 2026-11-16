"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "../store/wishlist-store";
import { useTranslation } from "../lib/use-translation";

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
  const { t } = useTranslation();

  const isFavorite = useWishlistStore(
    (state) => state.favorites.includes(productId)
  );

  const toggleFavorite = useWishlistStore(
    (state) => state.toggleFavorite
  );

  const label = `${
    isFavorite
      ? t.product.removeFavorite
      : t.product.addFavorite
  }: ${productName}`;

  return (
    <button
      type="button"
      className={`favorite-button ${
        isFavorite ? "is-favorite" : ""
      } ${className}`}
      aria-label={label}
      title={label}
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
