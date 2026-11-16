"use client";

import Link from "next/link";
import { useTranslation } from "../lib/use-translation";

type Props = {
  variant: "catalog" | "wishlist";
};

export default function ShopPageHeader({
  variant,
}: Props) {
  const { t } = useTranslation();

  const content = t[variant];

  return (
    <>
      <nav
        className="breadcrumbs"
        aria-label={t.nav.home}
      >
        <Link href="/">{t.nav.home}</Link>
        <span>/</span>

        <span aria-current="page">
          {variant === "catalog"
            ? t.nav.collection
            : t.wishlist.name}
        </span>
      </nav>

      <section className="catalog-hero">
        <span className="eyebrow">
          {content.eyebrow}
        </span>

        <span className="catalog-kanji" lang="ja">
          {variant === "catalog" ? "香" : "愛"}
        </span>

        <h1>
          {content.title} <em>{content.subtitle}</em>
        </h1>

        <p>{content.description}</p>
      </section>
    </>
  );
}
