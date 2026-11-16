import type { Metadata } from "next";
import { Suspense } from "react";

import CheckoutForm from "../components/checkout-form";
import PurchasePageHeader from "../components/purchase-page-header";

export const metadata: Metadata = {
  title: "Checkout | SHIRO",
  description:
    "Complete your SHIRO demonstration order.",
};

export default function CheckoutPage() {
  return (
    <main className="cart-page">
      <PurchasePageHeader variant="checkout" />

      <Suspense fallback={<CheckoutLoading />}>
        <CheckoutForm />
      </Suspense>
    </main>
  );
}

function CheckoutLoading() {
  return (
    <div className="product-loading" role="status">
      <span className="loading-kanji" lang="ja">
        静
      </span>

      <div className="loading-track">
        <div className="loading-progress" />
      </div>

      <p>SHIRO — Fragrances</p>
    </div>
  );
}
