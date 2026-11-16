import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { products } from "../../data/products";

import {
  getProductBySlug,
  getRelatedProducts,
} from "../../lib/products";

import ProductDetail from "../../components/product-detail";

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

  return (
    <ProductDetail
      product={product}
      relatedProducts={getRelatedProducts(slug)}
    />
  );
}

function ProductLoading() {
  return (
    <main
      className="product-loading"
      role="status"
    >
      <span className="loading-kanji" lang="ja">
        静
      </span>

      <div className="loading-track">
        <div className="loading-progress" />
      </div>

      <p>SHIRO — Fragrances</p>
    </main>
  );
}
