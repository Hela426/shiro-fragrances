import type { Metadata } from "next";

import ShoppingCart from "../components/shopping-cart";
import PurchasePageHeader from "../components/purchase-page-header";

export const metadata: Metadata = {
  title: "Shopping Bag | SHIRO",
  description: "Review your personal selection of SHIRO fragrances.",
  robots: {
  index: false,
  follow: true,
  },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartPage() {
  return (
    <main className="cart-page" id="main-content" tabIndex={-1}>
      <PurchasePageHeader variant="cart" />

      <ShoppingCart />
    </main>
  );
}
