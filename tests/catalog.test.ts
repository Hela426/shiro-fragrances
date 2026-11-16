import { describe, it, expect } from "vitest";

import { products } from "../app/data/products";

import {
  filterProducts,
  defaultFilters,
} from "../app/lib/catalog";

describe("SHIRO — Catalog filters", () => {
  it("returns all fragrances by default", () => {
    const result = filterProducts(
      products,
      defaultFilters
    );

    expect(result).toHaveLength(6);
  });

  it("filters floral fragrances", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      family: "floral",
    });

    expect(result).toHaveLength(2);

    expect(
      result.every(
        (product) => product.family === "floral"
      )
    ).toBe(true);
  });

  it("searches by fragrance name", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      search: "Yuki",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.slug).toBe("yuki");
  });

  it("searches by fragrance notes", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      search: "vanilla",
    });

    expect(result).toHaveLength(2);
  });

  it("filters new fragrances", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      onlyNew: true,
    });

    expect(result).toHaveLength(3);

    expect(
      result.every((product) => product.isNew)
    ).toBe(true);
  });

  it("filters available fragrances", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      inStock: true,
    });

    expect(
      result.every(
        (product) => product.stock > 0
      )
    ).toBe(true);
  });

  it("filters by maximum price", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      maxPrice: 85,
    });

    expect(result).toHaveLength(3);

    expect(
      result.every(
        (product) => product.price <= 85
      )
    ).toBe(true);
  });

  it("sorts prices from lowest to highest", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      sort: "price-asc",
    });

    expect(result[0]?.price).toBe(80);
    expect(result.at(-1)?.price).toBe(95);
  });

  it("sorts prices from highest to lowest", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      sort: "price-desc",
    });

    expect(result[0]?.price).toBe(95);
    expect(result.at(-1)?.price).toBe(80);
  });

  it("returns no results for unknown searches", () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      search: "nonexistent-fragrance",
    });

    expect(result).toHaveLength(0);
  });
});
