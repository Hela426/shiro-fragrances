"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import ProductCard from "./components/product-card";
import { products } from "./data/products";
import { useTranslation } from "./lib/use-translation";

export default function Home() {
  const { t } = useTranslation();
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    < main id="main-content" tabIndex={-1}>
      <section className="home-hero">
        <div className="hero-image">
          <Image
            src="/images/collections/hero.png"
            alt="SHIRO fragrance collection in a Japanese Zen setting"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
          />
        </div>

        <div className="hero-content">
          <span className="eyebrow">
            {t.home.heroEyebrow}
          </span>

          <h1>
            {t.home.heroTitle}
            <br />
            <em>{t.home.heroSubtitle}</em>
          </h1>

          <p>
            {t.home.heroDescription}
          </p>

          <Link href="/collection" className="primary-button">
            {t.home.explore}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section id="featured" className="collection-section">
        <div className="section-heading">
          <span className="eyebrow">
            {t.home.featuredEyebrow}
          </span>

          <h2>{t.home.featuredTitle}</h2>

          <p>
            {t.home.featuredDescription}
          </p>
        </div>

        <div className="products-grid featured-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-copy">
          <span className="eyebrow">
            {t.home.editorialEyebrow}
          </span>

          <h2>{t.home.editorialTitle}</h2>

          <p>
            {t.home.editorialDescription}
          </p>
        </div>

        <div className="editorial-image">
          <Image
            src="/images/products/tsuki.png"
            alt="Tsuki fragrance editorial image"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <section id="collection" className="collection-section all-products-section">
        <div className="section-heading">
          <span className="eyebrow">
            {t.home.collectionEyebrow}
          </span>

          <h2>{t.home.collectionTitle}</h2>

          <p>
            {t.home.collectionDescription}
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section
        id="philosophy"
        className="philosophy-section"
      >
        <span className="eyebrow">
          {t.home.philosophyEyebrow}
        </span>

        <span className="philosophy-kanji" lang="ja">
          静
        </span>

        <h2>{t.home.philosophyTitle}</h2>

        <p>
          {t.home.philosophyDescription}
        </p>

        <span className="philosophy-signature">
          {t.home.signature}
        </span>
      </section>
    </main>
  );
}

