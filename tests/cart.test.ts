import { describe, it, expect } from "vitest";

import {
  getCartProducts,
  getCartTotals,
  FREE_SHIPPING_MINIMUM,
} from "../app/lib/cart";

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

describe("SHIRO — Shopping cart", () => {
  it("returns zero for an empty cart", () => {
    const totals = getCartTotals([]);

    expect(totals.subtotal).toBe(0);
    expect(totals.total).toBe(0);
    expect(totals.count).toBe(0);
    expect(totals.shipping).toBe(0);
  });

  it("calculates the subtotal", () => {
    const items: CartItem[] = [
      {
        productId: yuki.id,
        quantity: 2,
      },
    ];

    expect(
      getCartTotals(items).subtotal
    ).toBe(170);
  });

  it("counts all product units", () => {
    const items: CartItem[] = [
      {
        productId: yuki.id,
        quantity: 2,
      },
      {
        productId: tsuki.id,
        quantity: 1,
      },
    ];

    expect(
      getCartTotals(items).count
    ).toBe(3);
  });

  it("charges shipping below the minimum", () => {
    const totals = getCartTotals([
      {
        productId: yuki.id,
        quantity: 1,
      },
    ]);

    expect(totals.shipping).toBe(10);
    expect(totals.total).toBe(95);
  });

  it("offers complimentary shipping", () => {
    const totals = getCartTotals([
      {
        productId: yuki.id,
        quantity: 2,
      },
    ]);

    expect(totals.shipping).toBe(0);
    expect(totals.total).toBe(170);
  });

  it("uses the correct shipping threshold", () => {
    expect(FREE_SHIPPING_MINIMUM).toBe(150);
  });

  it("calculates the remaining shipping amount", () => {
    const totals = getCartTotals([
      {
        productId: yuki.id,
        quantity: 1,
      },
    ]);

    expect(
      totals.remainingForFreeShipping
    ).toBe(65);
  });

  it("ignores unknown products", () => {
    const items: CartItem[] = [
      {
        productId: "unknown",
        quantity: 1,
      },
    ];

    expect(
      getCartProducts(items)
    ).toHaveLength(0);
  });

  it("limits quantities to available stock", () => {
    const items: CartItem[] = [
      {
        productId: yuki.id,
        quantity: yuki.stock + 10,
      },
    ];

    const result = getCartProducts(items);

    expect(result[0]?.quantity).toBe(yuki.stock);
  });
});
