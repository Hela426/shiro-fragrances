import type { Metadata } from "next";
import Link from "next/link";
import ShoppingCart from "../components/shopping-cart";

export const metadata: Metadata = {
  title: "Shopping Bag | SHIRO",
  description:
    "Review your personal selection of SHIRO fragrances.",
};

export default function CartPage() {
  return (
    <main className="cart-page">
      <nav
        className="breadcrumbs"
        aria-label="Breadcrumb"
      >
        <Link href="/">Home</Link>
        <span>/</span>
        <span aria-current="page">Shopping bag</span>
      </nav>

      <div className="cart-page-heading">
        <span className="eyebrow">
          YOUR PERSONAL SELECTION
        </span>

        <h1>Shopping bag.</h1>

        <p>
          A collection of moments, chosen by you.
        </p>
      </div>

      <ShoppingCart />
    </main>
  );
}