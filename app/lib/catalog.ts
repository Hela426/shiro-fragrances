import type {
  Product,
  FragranceFamily,
} from "../types/product";

export type CatalogFamily = "all" | FragranceFamily;

export type CatalogSort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "newest";

export type CatalogFilters = {
  search: string;
  family: CatalogFamily;
  sort: CatalogSort;
  onlyNew: boolean;
  inStock: boolean;
  maxPrice: number;
};

export const defaultFilters: CatalogFilters = {
  search: "",
  family: "all",
  sort: "featured",
  onlyNew: false,
  inStock: false,
  maxPrice: 100,
};

export function filterProducts(
  products: Product[],
  filters: CatalogFilters
): Product[] {
  const search = filters.search.trim().toLowerCase();

  const result = products.filter((product) => {
    const searchableText = [
      product.name,
      product.japaneseName,
      product.meaning,
      product.description,
      product.family,
      ...product.notes.top,
      ...product.notes.heart,
      ...product.notes.base,
    ]
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(search) &&
      (filters.family === "all" ||
        product.family === filters.family) &&
      (!filters.onlyNew || product.isNew) &&
      (!filters.inStock || product.stock > 0) &&
      product.price <= filters.maxPrice
    );
  });

  switch (filters.sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);

    case "price-desc":
      return result.sort((a, b) => b.price - a.price);

    case "name-asc":
      return result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "newest":
      return result.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew)
      );

    default:
      return result.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured)
      );
  }
}