"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "../../lib/use-translation";

export default function ProductNotFound() {
  const { t } = useTranslation();

  return (
    <main className="fragrance-not-found" id="main-content" tabIndex={-1}>
      <span className="eyebrow">404 — SHIRO</span>

      <span className="missing-kanji" lang="ja">
        空
      </span>

      <h1>{t.product.missingTitle}</h1>

      <p>{t.product.missingDescription}</p>

      <Link
        href="/collection"
        className="primary-button"
      >
        <ArrowLeft size={16} />
        {t.home.explore}
      </Link>
    </main>
  );
}
