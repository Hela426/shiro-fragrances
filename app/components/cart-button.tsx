"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCartStore } from "../store/cart-store";
import { getCartTotals } from "../lib/cart";
import { useTranslation } from "../lib/use-translation";

export default function CartButton() {
  const { t } = useTranslation();

  const items = useCartStore(
    (state) => state.items
  );

  const { count } = getCartTotals(items);

  return (
    <Link
      href="/cart"
      className="cart-nav-button"
      aria-label={`${t.cart.name}, ${count} ${
        count === 1 ? t.cart.item : t.cart.items
      }`}
    >
      <ShoppingBag size={22} strokeWidth={1.5} />

      {count > 0 && (
        <span className="cart-counter">
          {count}
        </span>
      )}
    </Link>
  );
}