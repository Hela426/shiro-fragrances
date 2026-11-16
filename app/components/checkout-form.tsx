"use client";

import { useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import { useCartStore } from "../store/cart-store";
import { getCartProducts } from "../lib/cart";
import { formatPrice } from "../lib/products";

import {
  getDiscountRate,
  getCheckoutTotals,
  ORDER_STORAGE_KEY,
  type DemoOrder,
} from "../lib/checkout";

import styles from "./checkout.module.css";

export default function CheckoutForm() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const hydrated = useSyncExternalStore(
    (callback) => {
        return (
        useCartStore.persist?.onFinishHydration(callback)
        ?? (() => {})
        );
    },
    () => useCartStore.persist?.hasHydrated() ?? false,
    () => false
    );

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cartProducts = getCartProducts(items);
  const totals = getCheckoutTotals(items, appliedCoupon);

  function applyCoupon() {
    const normalized = coupon.trim().toUpperCase();

    if (!getDiscountRate(normalized)) {
      setCouponError("Invalid discount code.");
      return;
    }

    setAppliedCoupon(normalized);
    setCouponError("");
  }

  function removeCoupon() {
    setAppliedCoupon("");
    setCoupon("");
    setCouponError("");
  }

  function handleOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting || cartProducts.length === 0) return;

    setSubmitting(true);
    setOrderError("");

    const order: DemoOrder = {
      id: `SHIRO-${crypto.randomUUID()
        .slice(0, 8)
        .toUpperCase()}`,
      date: new Date().toISOString(),
      count: totals.count,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
    };

    try {
      sessionStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify(order)
      );

      clearCart();
      router.push("/checkout/success");
    } catch {
      setOrderError(
        "Unable to save your demo order. Please try again."
      );

      setSubmitting(false);
    }
  }

  if (!hydrated || submitting) {
    return (
      <div className="empty-cart" role="status">
        Preparing your order...
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={55} strokeWidth={1} />

        <h2>Your bag is empty.</h2>

        <Link href="/collection" className="primary-button">
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <form
      className={styles.layout}
      onSubmit={handleOrder}
      autoComplete="off"
    >
      <div className={styles.form}>
        <p className={styles.notice}>
          This is a demonstration. Please use fictional
          contact and shipping information.
        </p>

        <span className={styles.eyebrow}>
          01 — SHIPPING INFORMATION
        </span>

        <h2 className={styles.heading}>
          Your details.
        </h2>

        <div className={styles.fields}>
          <label className={styles.field}>
            First name
            <input
              name="firstName"
              placeholder="Jane"
              required
              maxLength={60}
            />
          </label>

          <label className={styles.field}>
            Last name
            <input
              name="lastName"
              placeholder="Doe"
              required
              maxLength={60}
            />
          </label>

          <label className={`${styles.field} ${styles.full}`}>
            Email address
            <input
              name="email"
              type="email"
              placeholder="jane@example.com"
              required
            />
          </label>

          <label className={`${styles.field} ${styles.full}`}>
            Shipping address
            <input
              name="address"
              placeholder="123 Example Street"
              required
              maxLength={150}
            />
          </label>

          <label className={styles.field}>
            City
            <input
              name="city"
              placeholder="Bogotá"
              required
            />
          </label>

          <label className={styles.field}>
            Postal code
            <input
              name="postalCode"
              placeholder="110111"
              required
            />
          </label>

          <label className={`${styles.field} ${styles.full}`}>
            Country
            <select name="country" required defaultValue="">
              <option value="">Select country</option>
              <option value="CO">Colombia</option>
              <option value="US">United States</option>
              <option value="JP">Japan</option>
              <option value="ES">Spain</option>
              <option value="OTHER">Other</option>
            </select>
          </label>
        </div>

        <span className={styles.eyebrow}>
          02 — PAYMENT METHOD
        </span>

        <h2 className={styles.heading}>
          Secure checkout.
        </h2>

        <div className={styles.payment}>
          <ShieldCheck size={30} strokeWidth={1} />

          <div>
            <strong>Simulated payment</strong>
            <p>No payment or credit card is required.</p>
          </div>
        </div>

        <label className="filter-option">
          <input type="checkbox" required />

          I understand this is a demo purchase.
        </label>
      </div>

      <aside className={styles.summary}>
        <h2 className={styles.heading}>
          Order summary.
        </h2>

        {cartProducts.map(({ product, quantity, total }) => (
          <article className={styles.item} key={product.id}>
            <div className={styles.image}>
              <Image
                src={product.image}
                alt={product.name}
                width={65}
                height={87}
                className={styles.productPhoto}
              />
            </div>

            <div>
              <h3>{product.name}</h3>
              <p>{product.volume} ml · Qty {quantity}</p>
            </div>

            <strong>{formatPrice(total)}</strong>
          </article>
        ))}

        <div className={styles.coupon}>
          <input
            value={coupon}
            aria-label="Discount code"
            placeholder="Discount code"
            onChange={(event) => {
              setCoupon(event.target.value);
              setCouponError("");
            }}
          />

          <button type="button" onClick={applyCoupon}>
            Apply
          </button>
        </div>

        {couponError && (
          <p className={styles.error} role="alert">
            {couponError}
          </p>
        )}

        {appliedCoupon && (
          <div className={styles.message} role="status">
            {appliedCoupon} — {totals.discountRate}% off

            <button
              type="button"
              className="ml-3 underline"
              onClick={removeCoupon}
            >
              Remove
            </button>
          </div>
        )}

        <div className={styles.totals}>
          <div className={styles.row}>
            <span>Subtotal</span>
            <span>{formatPrice(totals.subtotal)}</span>
          </div>

          {totals.discount > 0 && (
            <div className={styles.row}>
              <span>Discount</span>
              <span>-{formatPrice(totals.discount)}</span>
            </div>
          )}

          <div className={styles.row}>
            <span>Shipping</span>
            <span>
              {totals.shipping === 0
                ? "Complimentary"
                : formatPrice(totals.shipping)}
            </span>
          </div>

          <div className={`${styles.row} ${styles.total}`}>
            <span>Total</span>
            <strong>{formatPrice(totals.total)}</strong>
          </div>
        </div>

        <button
          type="submit"
          className="add-to-bag"
          disabled={submitting}
        >
          Place demo order
        </button>

        {orderError && (
          <p className={styles.error} role="alert">
            {orderError}
          </p>
        )}

        <p className={styles.notice}>
          No real transactions are processed.
        </p>
      </aside>
    </form>
  );
}