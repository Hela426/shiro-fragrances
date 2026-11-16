import { describe, it, expect } from "vitest";

import { products } from "../app/data/products";

import {
  getProductBySlug,
  getRelatedProducts,
  formatPrice,
} from "../app/lib/products";

describe("SHIRO — Product catalog", () => {
  it("contains six fragrances", () => {
    expect(products).toHaveLength(6);
  });

  it("has unique product IDs", () => {
    const ids = products.map(
      (product) => product.id
    );

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique product slugs", () => {
    const slugs = products.map(
      (product) => product.slug
    );

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("finds Yuki by slug", () => {
    const product = getProductBySlug("yuki");

    expect(product?.name).toBe("Yuki");
    expect(product?.price).toBe(85);
  });

  it("does not find an invalid product", () => {
    expect(
      getProductBySlug("invalid-product")
    ).toBeFalsy();
  });

  it("returns related fragrances", () => {
    const related = getRelatedProducts("yuki");

    expect(related).toHaveLength(3);
  });

  it("excludes the current fragrance", () => {
    const related = getRelatedProducts("yuki");

    expect(
      related.some(
        (product) => product.slug === "yuki"
      )
    ).toBe(false);
  });

  it("formats prices in USD", () => {
    expect(formatPrice(85)).toBe("$85.00");
  });

  it("has valid product prices", () => {
    expect(
      products.every(
        (product) => product.price > 0
      )
    ).toBe(true);
  });

  it("has valid stock quantities", () => {
    expect(
      products.every(
        (product) =>
          Number.isInteger(product.stock) &&
          product.stock >= 0
      )
    ).toBe(true);
  });
});
