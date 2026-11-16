import type { Metadata } from "next";

import ProductCatalog from "../components/product-catalog";
import ShopPageHeader from "../components/shop-page-header";

export const metadata: Metadata = {
  title: "The Collection | SHIRO",
  description:
    "Explore the complete SHIRO fragrance collection.",
};

export default function CollectionPage() {
  return (
    <main className="catalog-page" id="main-content" tabIndex={-1}>
      <ShopPageHeader variant="catalog" />
      <ProductCatalog />
    </main>
  );
}
