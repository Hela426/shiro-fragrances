import Image from "next/image";
import type { Product } from "../types/product";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="product-card">
      <div className={`product-image ${product.family}`}>
        <Image
          src={product.image}
          alt={`${product.name} fragrance`}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
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
          <span className="japanese-name">
            {product.japaneseName}
          </span>
        </div>

        <p>{product.meaning}</p>

        <div className="product-meta">
          <span>
            {product.family} · {product.volume} ml
          </span>
          <span>${product.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}