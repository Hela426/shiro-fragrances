import { describe, it, expect } from "vitest";

import {
  getDiscountRate,
  getCheckoutTotals,
} from "../app/lib/checkout";

import { products } from "../app/data/products";

import type {
  CartItem,
} from "../app/store/cart-store";

const yuki = products.find(
  (product) => product.slug === "yuki"
)!;

const tsuki = products.find(
  (product) => product.slug === "tsuki"
)!;

const items: CartItem[] = [
  {
    productId: yuki.id,
    quantity: 1,
  },
  {
    productId: tsuki.id,
    quantity: 1,
  },
];

describe("SHIRO — Discounts and checkout", () => {
  it("recognizes SHIRO10", () => {
    expect(getDiscountRate("SHIRO10")).toBe(10);
  });

  it("recognizes WELCOME15", () => {
    expect(getDiscountRate("WELCOME15")).toBe(15);
  });

  it("recognizes MOLLY20", () => {
    expect(getDiscountRate("MOLLY20")).toBe(20);
  });

  it("rejects invalid discount codes", () => {
    expect(getDiscountRate("INVALID")).toBe(0);
  });

  it("rejects an empty coupon", () => {
    expect(getDiscountRate("")).toBe(0);
  });

  it("supports lowercase discount codes", () => {
    expect(getDiscountRate("molly20")).toBe(20);
  });

  it("ignores surrounding whitespace", () => {
    expect(getDiscountRate(" MOLLY20 ")).toBe(20);
  });

  it("calculates the total without discounts", () => {
    const totals = getCheckoutTotals(items);

    expect(totals.subtotal).toBe(175);
    expect(totals.discount).toBe(0);
    expect(totals.total).toBe(175);
  });

  it("applies the ten percent discount", () => {
    const totals = getCheckoutTotals(
      items,
      "SHIRO10"
    );

    expect(totals.discount).toBe(17.5);
    expect(totals.total).toBe(157.5);
  });

  it("applies the fifteen percent discount", () => {
    const totals = getCheckoutTotals(
      items,
      "WELCOME15"
    );

    expect(totals.discount).toBe(26.25);
    expect(totals.total).toBe(148.75);
  });

  it("applies Molly's twenty percent discount", () => {
    const totals = getCheckoutTotals(
      items,
      "MOLLY20"
    );

    expect(totals.discount).toBe(35);
    expect(totals.total).toBe(140);
  });

  it("preserves free shipping after a discount", () => {
    const totals = getCheckoutTotals(
      items,
      "MOLLY20"
    );

    expect(totals.shipping).toBe(0);
  });

  it("does not apply invalid discounts", () => {
    const totals = getCheckoutTotals(
      items,
      "INVALID"
    );

    expect(totals.discount).toBe(0);
    expect(totals.total).toBe(175);
  });

  it("does not discount an empty cart", () => {
    const totals = getCheckoutTotals(
      [],
      "MOLLY20"
    );

    expect(totals.discount).toBe(0);
    expect(totals.total).toBe(0);
  });
});
