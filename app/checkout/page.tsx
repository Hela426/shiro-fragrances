import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import CheckoutForm from "../components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout | SHIRO",
  description: "Complete your SHIRO demonstration order.",
};

export default function CheckoutPage() {
  return (
    <main>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/cart">Shopping bag</Link>
        <span>/</span>
        <span aria-current="page">Checkout</span>
      </nav>

      <div className="cart-page-heading">
        <span className="eyebrow">
          THE FINAL MOMENT
        </span>

        <h1>Complete your order.</h1>

        <p>A fragrance waiting to become a memory.</p>
      </div>

      <Suspense fallback={<CheckoutLoading />}>
        <CheckoutForm />
      </Suspense>
    </main>
  );

  function CheckoutLoading() {
  return (
            <div className="product-loading" role="status">
            <span className="eyebrow">
                THE FINAL MOMENT
            </span>

            <span className="loading-kanji" lang="ja">
                静
            </span>

            <h2>Preparing your order.</h2>

            <div className="loading-track">
                <div className="loading-progress" />
            </div>

            <p>Please wait a moment...</p>
            </div>
        );
    }
}