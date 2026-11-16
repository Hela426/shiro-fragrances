"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import {
  ORDER_STORAGE_KEY,
  type DemoOrder,
} from "../lib/checkout";

import { formatPrice } from "../lib/products";
import styles from "./checkout.module.css";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(ORDER_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot() {
  return null;
}

export default function OrderConfirmation() {
  const storedOrder = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  let order: DemoOrder | null = null;

  if (storedOrder) {
    try {
      order = JSON.parse(storedOrder) as DemoOrder;
    } catch {
      order = null;
    }
  }

  if (storedOrder === null) {
    return (
      <div className={styles.confirmation} role="status">
        Preparing your confirmation...
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.confirmation}>
        <h1>No order found.</h1>

        <Link href="/collection" className="primary-button">
          Explore the collection
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
        DEMO ORDER CONFIRMED
      </span>

      <h1>
        Thank you for <em>choosing SHIRO.</em>
      </h1>

      <p>
        A moment of beauty, chosen by you.
        Your demonstration order has been completed.
      </p>

      <div className={styles.receipt}>
        <span className={styles.eyebrow}>
          ORDER REFERENCE
        </span>

        <strong>{order.id}</strong>

        <div className={styles.row}>
          <span>Items</span>
          <span>{order.count}</span>
        </div>

        <div className={styles.row}>
          <span>Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>

        {order.discount > 0 && (
          <div className={styles.row}>
            <span>Discount</span>
            <span>-{formatPrice(order.discount)}</span>
          </div>
        )}

        <div className={styles.row}>
          <span>Shipping</span>
          <span>
            {order.shipping === 0
              ? "Complimentary"
              : formatPrice(order.shipping)}
          </span>
        </div>

        <div className={`${styles.row} ${styles.total}`}>
          <strong>Total</strong>
          <strong>{formatPrice(order.total)}</strong>
        </div>
      </div>

      <p>
        This was a simulated purchase.
        No payment was collected and no products will be shipped.
      </p>

      <Link href="/collection" className="primary-button">
        Continue exploring
      </Link>
    </section>
  );
}