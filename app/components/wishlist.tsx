"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

import { products } from "../data/products";
import { useWishlistStore } from "../store/wishlist-store";
import { useCartStore } from "../store/cart-store";

import ProductCard from "./product-card";

export default function Wishlist() {
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
          MEMORIES WORTH KEEPING
        </span>

        <h2>Your wishlist is empty.</h2>

        <p>
          Save the fragrances that speak to you.
        </p>

        <Link
          href="/collection"
          className="primary-button"
        >
          Explore the collection
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
            ? "fragrance"
            : "fragrances"}
        </span>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Clear your wishlist?")) {
              clearWishlist();
            }
          }}
        >
          Clear wishlist
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
                <ShoppingBag
                  size={17}
                  strokeWidth={1.5}
                />

                {product.stock === 0
                  ? "Out of stock"
                  : !canAdd
                  ? "Maximum quantity in bag"
                  : quantityInCart > 0
                  ? `Add another (${quantityInCart} in bag)`
                  : "Add to bag"}
              </button>
            </div>
          );
        })}
      </div>

      <Link
        href="/collection"
        className="back-collection"
      >
        Continue exploring
      </Link>
    </section>
  );
}