import type { Metadata } from "next";
import Link from "next/link";
import ProductCatalog from "../components/product-catalog";

export const metadata: Metadata = {
  title: "The Collection | SHIRO",
  description:
    "Explore the complete SHIRO fragrance collection and discover your signature scent.",
};

export default function CollectionPage() {
  return (
    <main className="catalog-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span aria-current="page">Collection</span>
      </nav>

      <section className="catalog-hero">
        <span className="eyebrow">
          THE SIGNATURE COLLECTION
        </span>

        <span className="catalog-kanji" lang="ja">
          香
        </span>

        <h1>
          Find your <em>signature scent.</em>
        </h1>

        <p>
          Six fragrances inspired by the quiet beauty
          of the natural world.
        </p>
      </section>

      <ProductCatalog />
    </main>
  );
}