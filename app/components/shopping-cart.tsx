"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Truck,
} from "lucide-react";

import { useCartStore } from "../store/cart-store";

import {
  getCartProducts,
  getCartTotals,
  FREE_SHIPPING_MINIMUM,
} from "../lib/cart";

import { formatPrice } from "../lib/products";

export default function ShoppingCart() {
  const items = useCartStore(
    (state) => state.items
  );

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const cartProducts = getCartProducts(items);

  const {
    count,
    subtotal,
    shipping,
    total,
    remainingForFreeShipping,
  } = getCartTotals(items);

  const shippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_MINIMUM) * 100
  );

  if (cartProducts.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={60} strokeWidth={1} />

        <span className="eyebrow">
          A MOMENT OF STILLNESS
        </span>

        <h2>Your bag is empty.</h2>

        <p>
          Discover a fragrance that speaks to you.
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
    <div className="shopping-cart-layout">
      <div className="cart-items-section">
        <div className="cart-items-heading">
          <span>
            {count} {count === 1 ? "item" : "items"}
          </span>

          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear your shopping bag?")) {
                clearCart();
              }
            }}
          >
            Clear bag
          </button>
        </div>

        {cartProducts.map(({ product, quantity, total }) => (
          <article
            className="cart-item"
            key={product.id}
          >
            <Link
              href={`/products/${product.slug}`}
              className="cart-item-image"
            >
              <Image
                src={product.image}
                alt={`${product.name} fragrance`}
                fill
                sizes="140px"
              />
            </Link>

            <div className="cart-item-content">
              <div className="cart-item-title">
                <Link href={`/products/${product.slug}`}>
                  <h2>
                    {product.name}{" "}
                    <span lang="ja">
                      {product.japaneseName}
                    </span>
                  </h2>
                </Link>

                <button
                  type="button"
                  aria-label={`Remove ${product.name}`}
                  onClick={() => removeItem(product.id)}
                >
                  <Trash2 size={17} strokeWidth={1.5} />
                </button>
              </div>

              <p>
                {product.family} · {product.volume} ml
              </p>

              <div className="cart-item-unit-price">
                {formatPrice(product.price)} / unit
              </div>

              <div className="cart-item-bottom">
                <div className="quantity-selector">
                  <button
                    type="button"
                    aria-label={`Decrease ${product.name} quantity`}
                    disabled={quantity <= 1}
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        quantity - 1
                      )
                    }
                  >
                    <Minus size={15} />
                  </button>

                  <span aria-live="polite">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    aria-label={`Increase ${product.name} quantity`}
                    disabled={quantity >= product.stock}
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        quantity + 1
                      )
                    }
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <strong>{formatPrice(total)}</strong>
              </div>
            </div>
          </article>
        ))}

        <Link
          href="/collection"
          className="continue-shopping"
        >
          <ArrowLeft size={16} />
          Continue shopping
        </Link>
      </div>

      <aside className="cart-summary">
        <div className="shipping-progress-section">
          <Truck size={24} strokeWidth={1.5} />

          <p>
            {remainingForFreeShipping === 0
              ? "Your order qualifies for complimentary shipping."
              : `Spend ${formatPrice(
                  remainingForFreeShipping
                )} more for complimentary shipping.`}
          </p>

          <div
            className="shipping-progress-track"
            role="progressbar"
            aria-label="Free shipping progress"
            aria-valuenow={Math.round(shippingProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              style={{
                width: `${shippingProgress}%`,
              }}
            />
          </div>
        </div>

        <h2>Order summary.</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>
            {shipping === 0
              ? "Complimentary"
              : formatPrice(shipping)}
          </span>
        </div>

        <div className="summary-row summary-total">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>

        <button
          type="button"
          className="add-to-bag"
          disabled
        >
          Checkout — Coming soon
        </button>

        <p className="demo-disclaimer">
          SHIRO is a conceptual e-commerce project.
          No real transactions are processed.
        </p>
      </aside>
    </div>
  );
}