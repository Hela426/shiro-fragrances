"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import {
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

import {
  ORDER_STORAGE_KEY,
  type DemoOrder,
} from "../lib/checkout";

import { formatPrice } from "../lib/products";
import { useTranslation } from "../lib/use-translation";

import styles from "./checkout.module.css";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(
      ORDER_STORAGE_KEY
    ) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot() {
  return null;
}

export default function OrderConfirmation() {
  const { t } = useTranslation();

  const storedOrder = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (storedOrder === null) {
    return (
      <div className="empty-cart" role="status">
        {t.checkout.preparing}
      </div>
    );
  }

  let order: DemoOrder | null = null;

  try {
    order = storedOrder
      ? JSON.parse(storedOrder)
      : null;
  } catch {
    order = null;
  }

  if (!order || !order.id) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={55} strokeWidth={1} />

        <h2>{t.confirmation.emptyTitle}</h2>

        <p>{t.confirmation.emptyDescription}</p>

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
    <section className={styles.confirmation}>
      <CheckCircle2
        size={65}
        strokeWidth={1}
        color="#67866b"
      />

      <span className={styles.eyebrow}>
        {t.confirmation.eyebrow}
      </span>

      <h1>{t.confirmation.title}</h1>

      <p>{t.confirmation.description}</p>

      <div className={styles.receipt}>
        <span className={styles.eyebrow}>
          {t.confirmation.reference}
        </span>

        <h2 className={styles.heading}>
          {order.id}
        </h2>

        <div className={styles.row}>
          <span>{t.confirmation.items}</span>
          <span>{order.count}</span>
        </div>

        <div className={styles.row}>
          <span>{t.cart.subtotal}</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>

        {order.discount > 0 && (
          <div className={styles.row}>
            <span>{t.checkout.discount}</span>

            <span>
              -{formatPrice(order.discount)}
            </span>
          </div>
        )}

        <div className={styles.row}>
          <span>{t.cart.shipping}</span>

          <span>
            {order.shipping === 0
              ? t.cart.free
              : formatPrice(order.shipping)}
          </span>
        </div>

        <div
          className={`${styles.row} ${styles.total}`}
        >
          <span>{t.cart.total}</span>
          <strong>{formatPrice(order.total)}</strong>
        </div>
      </div>

      <p>{t.confirmation.notice}</p>

      <Link
        href="/collection"
        className="primary-button"
      >
        {t.confirmation.continue}
      </Link>
    </section>
  );
}
