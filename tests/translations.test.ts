import { describe, it, expect } from "vitest";

import { products } from "../app/data/products";

import {
  getLocalizedProduct,
  familyTranslations,
} from "../app/data/product-translations";

import { translations } from "../app/data/translations";

import {
  shopTranslations,
} from "../app/data/shop-translations";

import {
  checkoutTranslations,
} from "../app/data/checkout-translations";

function getKeys(
  object: Record<string, unknown>,
  prefix = ""
): string[] {
  return Object.entries(object)
    .flatMap(([key, value]) => {
      const path = prefix
        ? `${prefix}.${key}`
        : key;

      if (
        typeof value === "object" &&
        value !== null
      ) {
        return getKeys(
          value as Record<string, unknown>,
          path
        );
      }

      return [path];
    })
    .sort();
}

describe("SHIRO — Internationalization", () => {
  it("translates Yuki into Spanish", () => {
    const yuki = products.find(
      (product) => product.slug === "yuki"
    )!;

    const localized = getLocalizedProduct(
      yuki,
      "es"
    );

    expect(localized.meaning).toBe("Nieve");
  });

  it("preserves English descriptions", () => {
    const product = products[0];

    expect(
      getLocalizedProduct(product, "en")
    ).toEqual(product);
  });

  it("preserves IDs in both languages", () => {
    products.forEach((product) => {
      const localized = getLocalizedProduct(
        product,
        "es"
      );

      expect(localized.id).toBe(product.id);
      expect(localized.slug).toBe(product.slug);
    });
  });

  it("preserves product prices and stock", () => {
    products.forEach((product) => {
      const localized = getLocalizedProduct(
        product,
        "es"
      );

      expect(localized.price).toBe(product.price);
      expect(localized.stock).toBe(product.stock);
    });
  });

  it("translates every fragrance description", () => {
    products.forEach((product) => {
      const localized = getLocalizedProduct(
        product,
        "es"
      );

      expect(
        localized.description
      ).not.toBe(product.description);
    });
  });

  it("translates fragrance families", () => {
    expect(
      familyTranslations.es.woody
    ).toBe("Amaderada");

    expect(
      familyTranslations.en.woody
    ).toBe("Woody");
  });

  it("has matching navigation translation keys", () => {
    expect(
      getKeys(translations.en)
    ).toEqual(getKeys(translations.es));
  });

  it("has matching shop translation keys", () => {
    expect(
      getKeys(shopTranslations.en)
    ).toEqual(getKeys(shopTranslations.es));
  });

  it("has matching checkout translation keys", () => {
    expect(
      getKeys(checkoutTranslations.en)
    ).toEqual(getKeys(checkoutTranslations.es));
  });
});
