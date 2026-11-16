import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import ProductCard from "./components/product-card";
import { products } from "./data/products";

export default function Home() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <main>
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
            01 — THE ART OF FRAGRANCE
          </span>

          <h1>
            The essence
            <br />
            <em>of simplicity.</em>
          </h1>

          <p>
            Inspired by nature. Crafted for the senses.
            Discover a fragrance collection shaped by stillness,
            texture and quiet elegance.
          </p>

          <a href="#featured" className="primary-button">
            Explore the collection
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section id="featured" className="collection-section">
        <div className="section-heading">
          <span className="eyebrow">
            02 — FEATURED FRAGRANCES
          </span>

          <h2>Signature selection.</h2>

          <p>
            A curated introduction to the world of SHIRO.
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
            03 — SENSORY DESIGN
          </span>

          <h2>Fragrance as a quiet ritual.</h2>

          <p>
            Every bottle is imagined as a still moment:
            snow, shadow, moonlight, blossom, forest
            and rain. Together, they shape a calm and
            contemplative world.
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
            04 — THE FULL COLLECTION
          </span>

          <h2>Discover your essence.</h2>

          <p>
            Six fragrances. Six interpretations of nature.
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
          05 — OUR PHILOSOPHY
        </span>

        <span className="philosophy-kanji" lang="ja">
          静
        </span>

        <h2>Beauty in stillness.</h2>

        <p>
          We believe fragrance is more than a scent.
          It is a memory, an emotion, a quiet moment
          that belongs entirely to you.
        </p>

        <span className="philosophy-signature">
          SHIRO — The essence of simplicity.
        </span>
      </section>
    </main>
  );
}

