import type { Metadata } from "next";
import Link from "next/link";

import Wishlist from "../components/wishlist";

export const metadata: Metadata = {
  title: "Your Wishlist | SHIRO",
  description:
    "A personal selection of your favorite SHIRO fragrances.",
};

export default function WishlistPage() {
  return (
    <main className="wishlist-page">
      <nav
        className="breadcrumbs"
        aria-label="Breadcrumb"
      >
        <Link href="/">Home</Link>
        <span>/</span>
        <span aria-current="page">Wishlist</span>
      </nav>

      <section className="catalog-hero">
        <span className="eyebrow">
          MEMORIES WORTH KEEPING
        </span>

        <span className="catalog-kanji" lang="ja">
          愛
        </span>

        <h1>
          Your personal <em>wishlist.</em>
        </h1>

        <p>
          A collection of fragrances that captured
          your heart.
        </p>
      </section>

      <Wishlist />
    </main>
  );
}