"use client";

import {
  useState,
  useSyncExternalStore,
} from "react";

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
import { useTranslation } from "../lib/use-translation";

import {
  getDiscountRate,
  getCheckoutTotals,
  ORDER_STORAGE_KEY,
  type DemoOrder,
} from "../lib/checkout";

import styles from "./checkout.module.css";

export default function CheckoutForm() {
  const router = useRouter();
  const { t } = useTranslation();

  const items = useCartStore(
    (state) => state.items
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const hydrated = useSyncExternalStore(
    (callback) =>
      useCartStore.persist?.onFinishHydration(callback)
      ?? (() => {}),
    () => useCartStore.persist?.hasHydrated() ?? false,
    () => false
  );

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] =
    useState("");

  const [couponError, setCouponError] =
    useState(false);

  const [orderError, setOrderError] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const cartProducts = getCartProducts(items);

  const totals = getCheckoutTotals(
    items,
    appliedCoupon
  );

  function applyCoupon() {
    const normalized = coupon.trim().toUpperCase();

    if (!getDiscountRate(normalized)) {
      setCouponError(true);
      return;
    }

    setAppliedCoupon(normalized);
    setCouponError(false);
  }

  function removeCoupon() {
    setAppliedCoupon("");
    setCoupon("");
    setCouponError(false);
  }

  function handleOrder(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submitting || cartProducts.length === 0) {
      return;
    }

    setSubmitting(true);
    setOrderError(false);

    try {
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

      sessionStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify(order)
      );

      clearCart();

      router.push("/checkout/success");
    } catch {
      setOrderError(true);
      setSubmitting(false);
    }
  }

  if (!hydrated || submitting) {
    return (
      <div className="empty-cart" role="status">
        {t.checkout.preparing}
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={55} strokeWidth={1} />

        <h2>{t.cart.emptyTitle}</h2>

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
    <form
      className={styles.layout}
      onSubmit={handleOrder}
      autoComplete="off"
    >
      <div className={styles.form}>
        <p className={styles.notice}>
          {t.checkout.notice}
        </p>

        <span className={styles.eyebrow}>
          {t.checkout.shippingEyebrow}
        </span>

        <h2 className={styles.heading}>
          {t.checkout.details}
        </h2>

        <div className={styles.fields}>
          <label className={styles.field}>
            {t.checkout.firstName}

            <input
              name="firstName"
              placeholder="Jane"
              required
              maxLength={60}
            />
          </label>

          <label className={styles.field}>
            {t.checkout.lastName}

            <input
              name="lastName"
              placeholder="Doe"
              required
              maxLength={60}
            />
          </label>

          <label
            className={`${styles.field} ${styles.full}`}
          >
            {t.checkout.email}

            <input
              name="email"
              type="email"
              placeholder="jane@example.com"
              required
            />
          </label>

          <label
            className={`${styles.field} ${styles.full}`}
          >
            {t.checkout.address}

            <input
              name="address"
              placeholder="123 Example Street"
              required
              maxLength={150}
            />
          </label>

          <label className={styles.field}>
            {t.checkout.city}

            <input
              name="city"
              placeholder="Bogotá"
              required
            />
          </label>

          <label className={styles.field}>
            {t.checkout.postalCode}

            <input
              name="postalCode"
              placeholder="110111"
              required
            />
          </label>

          <label
            className={`${styles.field} ${styles.full}`}
          >
            {t.checkout.country}

            <select
              name="country"
              required
              defaultValue=""
            >
              <option value="">
                {t.checkout.selectCountry}
              </option>

              <option value="CO">
                {t.checkout.colombia}
              </option>

              <option value="US">
                {t.checkout.unitedStates}
              </option>

              <option value="JP">
                {t.checkout.japan}
              </option>

              <option value="ES">
                {t.checkout.spain}
              </option>

              <option value="OTHER">
                {t.checkout.other}
              </option>
            </select>
          </label>
        </div>

        <span className={styles.eyebrow}>
          {t.checkout.paymentEyebrow}
        </span>

        <h2 className={styles.heading}>
          {t.checkout.secure}
        </h2>

        <div className={styles.payment}>
          <ShieldCheck size={30} strokeWidth={1} />

          <div>
            <strong>
              {t.checkout.simulated}
            </strong>

            <p>
              {t.checkout.paymentDescription}
            </p>
          </div>
        </div>

        <label className="filter-option">
          <input type="checkbox" required />

          {t.checkout.consent}
        </label>
      </div>

      <aside className={styles.summary}>
        <h2 className={styles.heading}>
          {t.cart.summary}
        </h2>

        {cartProducts.map(
          ({ product, quantity, total }) => (
            <article
              className={styles.item}
              key={product.id}
            >
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

                <p>
                  {product.volume} ml ·{" "}
                  {t.checkout.quantity} {quantity}
                </p>
              </div>

              <strong>
                {formatPrice(total)}
              </strong>
            </article>
          )
        )}

        <div className={styles.coupon}>
          <input
            value={coupon}
            aria-label={t.checkout.coupon}
            placeholder={t.checkout.coupon}
            onChange={(event) => {
              setCoupon(event.target.value);
              setCouponError(false);
            }}
          />

          <button
            type="button"
            onClick={applyCoupon}
          >
            {t.checkout.apply}
          </button>
        </div>

        {couponError && (
          <p className={styles.error} role="alert">
            {t.checkout.invalidCoupon}
          </p>
        )}

        {appliedCoupon && (
          <div className={styles.message} role="status">
            {appliedCoupon} — {totals.discountRate}%{" "}
            {t.checkout.off}

            <button
              type="button"
              className="ml-3 underline"
              onClick={removeCoupon}
            >
              {t.checkout.removeCoupon}
            </button>
          </div>
        )}

        <div className={styles.totals}>
          <div className={styles.row}>
            <span>{t.cart.subtotal}</span>

            <span>
              {formatPrice(totals.subtotal)}
            </span>
          </div>

          {totals.discount > 0 && (
            <div className={styles.row}>
              <span>{t.checkout.discount}</span>

              <span>
                -{formatPrice(totals.discount)}
              </span>
            </div>
          )}

          <div className={styles.row}>
            <span>{t.cart.shipping}</span>

            <span>
              {totals.shipping === 0
                ? t.cart.free
                : formatPrice(totals.shipping)}
            </span>
          </div>

          <div
            className={`${styles.row} ${styles.total}`}
          >
            <span>{t.cart.total}</span>

            <strong>
              {formatPrice(totals.total)}
            </strong>
          </div>
        </div>

        <button
          type="submit"
          className="add-to-bag"
          disabled={submitting}
        >
          {t.checkout.placeOrder}
        </button>

        {orderError && (
          <p className={styles.error} role="alert">
            {t.checkout.orderError}
          </p>
        )}

        <p className={styles.notice}>
          {t.checkout.disclaimer}
        </p>
      </aside>
    </form>
  );
}
