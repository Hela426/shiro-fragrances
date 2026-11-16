import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",

    include: ["tests/**/*.test.ts"],

    coverage: {
      provider: "v8",

      reporter: [
        "text",
        "html",
        "json-summary",
      ],

      include: [
        "app/lib/cart.ts",
        "app/lib/checkout.ts",
        "app/lib/catalog.ts",
        "app/lib/products.ts",
        "app/data/product-translations.ts",
      ],
    },
  },
});
