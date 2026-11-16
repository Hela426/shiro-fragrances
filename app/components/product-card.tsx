import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "../types/product";
import { formatPrice } from "../lib/products";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="product-card">
      <Link
        href={`/products/${product.slug}`}
        className="product-card-link"
      >
        <div className={`product-image ${product.family}`}>
          <Image
            src={product.image}
            alt={`${product.name} fragrance`}
            fill
            sizes="(max-width: 800px) 50vw, 33vw"
            className="product-photo"
          />

          <div className="product-badges">
            {product.isNew && (
              <span className="product-label">NEW</span>
            )}

            {product.featured && (
              <span className="product-label subtle">
                FEATURED
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

          <p>{product.meaning}</p>

          <div className="product-meta">
            <span>
              {product.family} · {product.volume} ml
            </span>

            <span>{formatPrice(product.price)}</span>
          </div>

          <div className="view-fragrance">
            View fragrance
            <ArrowUpRight size={15} />
          </div>
        </div>
      </Link>
    </article>
  );
}