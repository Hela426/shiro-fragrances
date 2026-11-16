import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Flower2,
  Leaf,
  Wind,
} from "lucide-react";

import { products } from "../../data/products";

import {
  getProductBySlug,
  getRelatedProducts,
  formatPrice,
} from "../../lib/products";

import ProductCard from "../../components/product-card";
import ProductQuantity from "../../components/product-quantity";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Fragrance not found | SHIRO",
    };
  }

  return {
    title: `${product.name} — Eau de Parfum | SHIRO`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Props) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug);

  const fragranceNotes = [
    {
      title: "Top notes",
      subtitle: "THE FIRST IMPRESSION",
      icon: Wind,
      notes: product.notes.top,
    },
    {
      title: "Heart notes",
      subtitle: "THE SOUL OF THE FRAGRANCE",
      icon: Flower2,
      notes: product.notes.heart,
    },
    {
      title: "Base notes",
      subtitle: "THE LASTING MEMORY",
      icon: Leaf,
      notes: product.notes.base,
    },
  ];

  return (
    <main className="product-page">
      <nav
        className="breadcrumbs"
        aria-label="Breadcrumb"
      >
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/collection">Collection</Link>
        <span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="product-detail">
        <div className="detail-image">
          <Image
            src={product.image}
            alt={`${product.name} by SHIRO`}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />

          {product.isNew && (
            <span className="detail-badge">
              NEW FRAGRANCE
            </span>
          )}
        </div>

        <div className="detail-copy">
          <span className="eyebrow">
            THE SIGNATURE COLLECTION
          </span>

          <div className="detail-title">
            <h1>{product.name}</h1>

            <span lang="ja">
              {product.japaneseName}
            </span>
          </div>

          <p className="detail-meaning">
            {product.meaning}
          </p>

          <span className="detail-price">
            {formatPrice(product.price)}
          </span>

          <p className="detail-description">
            {product.description}
          </p>

          <div className="detail-specifications">
            <div>
              <span>Concentration</span>
              <strong>Eau de Parfum</strong>
            </div>

            <div>
              <span>Fragrance family</span>
              <strong>{product.family}</strong>
            </div>

            <div>
              <span>Volume</span>
              <strong>{product.volume} ml</strong>
            </div>
          </div>

          <div className="stock-status">
            <span
              className={`stock-dot ${
                product.stock === 0 ? "unavailable" : ""
              }`}
            />

            {product.stock > 0
              ? "In stock"
              : "Out of stock"}
          </div>

          <ProductQuantity
            price={product.price}
            stock={product.stock}
          />

          <p className="demo-disclaimer">
            Concept fragrance. No real transactions
            are processed.
          </p>
        </div>
      </section>

      <section className="fragrance-notes-section">
        <div className="section-heading">
          <span className="eyebrow">
            THE OLFACTORY JOURNEY
          </span>

          <h2>The fragrance notes.</h2>

          <p>
            A composition that unfolds with time.
          </p>
        </div>

        <div className="fragrance-notes-grid">
          {fragranceNotes.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="fragrance-note-card"
                key={item.title}
              >
                <Icon size={32} strokeWidth={1} />

                <span className="eyebrow">
                  {item.subtitle}
                </span>

                <h3>{item.title}</h3>

                <ul>
                  {item.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="collection-section">
        <div className="section-heading">
          <span className="eyebrow">
            DISCOVER MORE
          </span>

          <h2>You may also like.</h2>
        </div>

        <div className="products-grid">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>

        <Link
          href="/#collection"
          className="back-collection"
        >
          <ArrowLeft size={16} />
          Back to collection
        </Link>
      </section>
    </main>
  );
}

function ProductLoading() {
  return (
    <main
      className="product-loading"
      role="status"
      aria-live="polite"
    >
      <span className="eyebrow">
        THE ART OF FRAGRANCE
      </span>

      <span className="loading-kanji" lang="ja">
        静
      </span>

      <h2>A moment of stillness.</h2>

      <div className="loading-track">
        <div className="loading-progress" />
      </div>

      <p>Discovering your fragrance...</p>
    </main>
  );
}