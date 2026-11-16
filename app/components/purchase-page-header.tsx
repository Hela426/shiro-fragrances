"use client";

import Link from "next/link";
import { useTranslation } from "../lib/use-translation";

type Props = {
  variant: "cart" | "checkout";
};

export default function PurchasePageHeader({
  variant,
}: Props) {
  const { language, t } = useTranslation();
  const content = t[variant];

  return (
    <>
      <nav
        className="breadcrumbs"
        aria-label={
          language === "es"
            ? "Ruta de navegación"
            : "Breadcrumb"
        }
      >
        <Link href="/">{t.nav.home}</Link>

        <span>/</span>

        {variant === "checkout" && (
          <>
            <Link href="/cart">
              {t.cart.name}
            </Link>
            <span>/</span>
          </>
        )}

        <span aria-current="page">
          {content.name}
        </span>
      </nav>

      <div className="cart-page-heading">
        <span className="eyebrow">
          {content.eyebrow}
        </span>

        <h1>{content.title}</h1>

        <p>{content.description}</p>
      </div>
    </>
  );
}
