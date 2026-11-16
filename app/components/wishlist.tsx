"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

import { products } from "../data/products";
import { useWishlistStore } from "../store/wishlist-store";
import { useCartStore } from "../store/cart-store";
import { useTranslation } from "../lib/use-translation";

import ProductCard from "./product-card";

export default function Wishlist() {
  const { t } = useTranslation();

  const favorites = useWishlistStore(
    (state) => state.favorites
  );

  const clearWishlist = useWishlistStore(
    (state) => state.clearWishlist
  );

  const cartItems = useCartStore(
    (state) => state.items
  );

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const favoriteProducts = products.filter(
    (product) => favorites.includes(product.id)
  );

  if (favoriteProducts.length === 0) {
    return (
      <div className="empty-cart">
        <Heart size={60} strokeWidth={1} />

        <span className="eyebrow">
          {t.wishlist.eyebrow}
        </span>

        <h2>{t.wishlist.emptyTitle}</h2>

        <p>{t.wishlist.emptyDescription}</p>

        <Link
          href="/collection"
          className="primary-button"
        >
          {t.home.explore}
        </Link>
      </div>
    );
  }

  return (
    <section className="wishlist-section">
      <div className="wishlist-toolbar">
        <span aria-live="polite">
          {favoriteProducts.length}{" "}
          {favoriteProducts.length === 1
            ? t.catalog.singular
            : t.catalog.plural}
        </span>

        <button
          type="button"
          onClick={() => {
            if (window.confirm(t.wishlist.confirm)) {
              clearWishlist();
            }
          }}
        >
          {t.wishlist.clear}
        </button>
      </div>

      <div className="products-grid wishlist-grid">
        {favoriteProducts.map((product) => {
          const quantityInCart =
            cartItems.find(
              (item) => item.productId === product.id
            )?.quantity ?? 0;

          const canAdd =
            quantityInCart < product.stock;

          return (
            <div
              className="wishlist-item"
              key={product.id}
            >
              <ProductCard product={product} />

              <button
                type="button"
                className="wishlist-add-button"
                disabled={!canAdd}
                onClick={() => addItem(product.id, 1)}
              >
                <ShoppingBag size={17} strokeWidth={1.5} />

                {product.stock === 0
                  ? t.product.outOfStock
                  : !canAdd
                  ? t.product.maximum
                  : quantityInCart > 0
                  ? `${t.wishlist.addAnother} (${quantityInCart} ${t.wishlist.inBag})`
                  : t.product.addToBag}
              </button>
            </div>
          );
        })}
      </div>

      <Link
        href="/collection"
        className="back-collection"
      >
        {t.wishlist.continue}
      </Link>
    </section>
  );
}
