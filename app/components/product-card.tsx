"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Product } from "../types/product";
import { formatPrice } from "../lib/products";
import { useTranslation } from "../lib/use-translation";

import {
  getLocalizedProduct,
  familyTranslations,
} from "../data/product-translations";

import FavoriteButton from "./favorite-button";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { language, t } = useTranslation();

  const localized = getLocalizedProduct(
    product,
    language
  );

  return (
    <article className="product-card">
      <FavoriteButton
        productId={product.id}
        productName={product.name}
        className="card-favorite"
      />

      <Link
        href={`/products/${product.slug}`}
        className="product-card-link"
      >
        <div className={`product-image ${product.family}`}>
          <Image
            src={product.image}
            alt={`${product.name} — SHIRO`}
            fill
            sizes="(max-width: 800px) 50vw, 33vw"
            className="product-photo"
          />

          <div className="product-badges">
            {product.isNew && (
              <span className="product-label">
                {t.product.new}
              </span>
            )}

            {product.featured && (
              <span className="product-label subtle">
                {t.product.featured}
              </span>
            )}
          </div>
        </div>

        <div className="product-information">
          <div className="product-heading">
            <h3>{product.name}</h3>

            <span className="japanese-name" lang="ja">
              {product.japaneseName}
            </span>
          </div>

          <p>{localized.meaning}</p>

          <div className="product-meta">
            <span>
              {familyTranslations[language][product.family]}
              {" · "}
              {product.volume} ml
            </span>

            <span>{formatPrice(product.price)}</span>
          </div>

          <div className="view-fragrance">
            {t.product.view}
            <ArrowUpRight size={15} />
          </div>
        </div>
      </Link>
    </article>
  );
}
