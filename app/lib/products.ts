import { products } from "../data/products";

export function getProductBySlug(slug: string) {
  return products.find(
    (product) => product.slug === slug
  );
}

export function getRelatedProducts(slug: string) {
  const product = getProductBySlug(slug);

  if (!product) return [];

  return products
    .filter((item) => item.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.family === product.family) -
        Number(a.family === product.family)
    )
    .slice(0, 3);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}