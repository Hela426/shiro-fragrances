"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Flower2,
  Leaf,
  Wind,
} from "lucide-react";

import type { Product } from "../types/product";
import { formatPrice } from "../lib/products";
import { useTranslation } from "../lib/use-translation";

import {
  getLocalizedProduct,
  familyTranslations,
} from "../data/product-translations";

import ProductCard from "./product-card";
import ProductQuantity from "./product-quantity";
import FavoriteButton from "./favorite-button";

type Props = {
  product: Product;
  relatedProducts: Product[];
};

export default function ProductDetail({
  product,
  relatedProducts,
}: Props) {
  const { language, t } = useTranslation();

  const localized = getLocalizedProduct(
    product,
    language
  );

  const fragranceNotes = [
    {
      title: t.product.top,
      subtitle: t.product.topSubtitle,
      icon: Wind,
      notes: localized.notes.top,
    },
    {
      title: t.product.heart,
      subtitle: t.product.heartSubtitle,
      icon: Flower2,
      notes: localized.notes.heart,
    },
    {
      title: t.product.base,
      subtitle: t.product.baseSubtitle,
      icon: Leaf,
      notes: localized.notes.base,
    },
  ];

  return (
    <main className="product-page">
      <nav className="breadcrumbs" aria-label={t.nav.home}>
        <Link href="/">{t.nav.home}</Link>
        <span>/</span>

        <Link href="/collection">
          {t.nav.collection}
        </Link>

        <span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="product-detail">
        <div className="detail-image">
          <Image
            src={product.image}
            alt={`${product.name} — SHIRO`}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />

          {product.isNew && (
            <span className="detail-badge">
              {t.product.newFragrance}
            </span>
          )}
        </div>

        <div className="detail-copy">
          <span className="eyebrow">
            {t.product.signature}
          </span>

          <div className="detail-title">
            <h1>{product.name}</h1>

            <span lang="ja">
              {product.japaneseName}
            </span>
          </div>

          <p className="detail-meaning">
            {localized.meaning}
          </p>

          <span className="detail-price">
            {formatPrice(product.price)}
          </span>

          <p className="detail-description">
            {localized.description}
          </p>

          <div className="detail-specifications">
            <div>
              <span>{t.product.concentration}</span>
              <strong>Eau de Parfum</strong>
            </div>

            <div>
              <span>{t.product.family}</span>

              <strong>
                {familyTranslations[language][product.family]}
              </strong>
            </div>

            <div>
              <span>{t.product.volume}</span>
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
              ? t.product.inStock
              : t.product.outOfStock}
          </div>

          <div className="detail-favorite-row">
            <span>{t.product.save}</span>

            <FavoriteButton
              productId={product.id}
              productName={product.name}
            />
          </div>

          <ProductQuantity
            key={product.id}
            productId={product.id}
            price={product.price}
            stock={product.stock}
          />

          <p className="demo-disclaimer">
            {t.product.disclaimer}
          </p>
        </div>
      </section>

      <section className="fragrance-notes-section">
        <div className="section-heading">
          <span className="eyebrow">
            {t.product.notesEyebrow}
          </span>

          <h2>{t.product.notesTitle}</h2>

          <p>{t.product.notesDescription}</p>
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
            {t.product.discover}
          </span>

          <h2>{t.product.related}</h2>
        </div>

        <div className="products-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        <Link
          href="/collection"
          className="back-collection"
        >
          <ArrowLeft size={16} />
          {t.product.back}
        </Link>
      </section>
    </main>
  );
}
