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
import { useTranslation } from "../lib/use-translation";

import {
  getCartProducts,
  getCartTotals,
  FREE_SHIPPING_MINIMUM,
} from "../lib/cart";

import { formatPrice } from "../lib/products";
import {
  familyTranslations,
} from "../data/product-translations";

export default function ShoppingCart() {
  const { language, t } = useTranslation();

  const items = useCartStore(
    (state) => state.items
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const cartProducts = getCartProducts(items);
  const totals = getCartTotals(items);

  const progress = Math.min(
    100,
    (totals.subtotal / FREE_SHIPPING_MINIMUM) * 100
  );

  if (cartProducts.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={60} strokeWidth={1} />

        <h2>{t.cart.emptyTitle}</h2>

        <p>{t.cart.emptyDescription}</p>

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
    <div className="shopping-cart-layout">
      <section className="cart-items-section">
        <div className="cart-items-heading">
          <span aria-live="polite">
            {totals.count}{" "}
            {totals.count === 1
              ? t.cart.item
              : t.cart.items}
          </span>

          <button
            type="button"
            onClick={() => {
              if (window.confirm(t.cart.confirmClear)) {
                clearCart();
              }
            }}
          >
            {t.cart.clear}
          </button>
        </div>

        {cartProducts.map(
          ({ product, quantity, total }) => (
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
                  alt={product.name}
                  fill
                  sizes="180px"
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
                    aria-label={`${t.cart.remove}: ${product.name}`}
                    onClick={() => removeItem(product.id)}
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <p>
                  {familyTranslations[language][product.family]}
                  {" · "}
                  {product.volume} ml
                </p>

                <span className="cart-item-unit-price">
                  {formatPrice(product.price)}{" "}
                  {t.cart.each}
                </span>

                <div className="cart-item-bottom">
                  <div className="quantity-selector">
                    <button
                      type="button"
                      aria-label={`${t.product.decrease}: ${product.name}`}
                      disabled={quantity <= 1}
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          quantity - 1
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      aria-label={`${t.product.increase}: ${product.name}`}
                      disabled={quantity >= product.stock}
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          quantity + 1
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <strong>
                    {formatPrice(total)}
                  </strong>
                </div>
              </div>
            </article>
          )
        )}

        <Link
          href="/collection"
          className="continue-shopping"
        >
          <ArrowLeft size={16} />

          {t.cart.continue}
        </Link>
      </section>

      <aside className="cart-summary">
        <div className="shipping-progress-section">
          <Truck size={23} strokeWidth={1.5} />

          <p aria-live="polite">
            {totals.remainingForFreeShipping <= 0
              ? t.cart.freeShipping
              : t.cart.remaining.replace(
                  "{amount}",
                  formatPrice(
                    totals.remainingForFreeShipping
                  )
                )}
          </p>

          <div
            className="shipping-progress-track"
            role="progressbar"
            aria-label={t.cart.shipping}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h2>{t.cart.summary}</h2>

        <div className="summary-row">
          <span>{t.cart.subtotal}</span>

          <span>
            {formatPrice(totals.subtotal)}
          </span>
        </div>

        <div className="summary-row">
          <span>{t.cart.shipping}</span>

          <span>
            {totals.shipping === 0
              ? t.cart.free
              : formatPrice(totals.shipping)}
          </span>
        </div>

        <div className="summary-row summary-total">
          <span>{t.cart.total}</span>

          <strong>
            {formatPrice(totals.total)}
          </strong>
        </div>

        <Link
          href="/checkout"
          className="add-to-bag"
        >
          {t.cart.checkout}
        </Link>

        <p className="demo-disclaimer">
          {t.cart.disclaimer}
        </p>
      </aside>
    </div>
  );
}
