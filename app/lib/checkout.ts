import { getCartTotals } from "./cart";
import type { CartItem } from "../store/cart-store";

export const discountCodes: Record<string, number> = {
  SHIRO10: 10,
  WELCOME15: 15,
  MOLLY20: 20,
};

export function getDiscountRate(code: string) {
  const normalized = code.trim().toUpperCase();

  return Object.hasOwn(discountCodes, normalized)
    ? discountCodes[normalized]
    : 0;
}

export function getCheckoutTotals(
  items: CartItem[],
  coupon = ""
) {
  const cart = getCartTotals(items);
  const discountRate = getDiscountRate(coupon);

  const discount =
    Math.round(cart.subtotal * discountRate) / 100;

  const total =
    Math.round(
      (cart.subtotal - discount + cart.shipping) * 100
    ) / 100;

  return {
    ...cart,
    discountRate,
    discount,
    total,
  };
}

export type DemoOrder = {
  id: string;
  date: string;
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

export const ORDER_STORAGE_KEY = "shiro-last-order";