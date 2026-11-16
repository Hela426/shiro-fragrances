import type { MetadataRoute } from "next";

import { products } from "./data/products";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/collection`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...products.map(
      (product): MetadataRoute.Sitemap[number] => ({
        url: `${SITE_URL}/products/${product.slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
      })
    ),
  ];
}
