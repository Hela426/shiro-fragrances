import type { Metadata } from "next";

import ShoppingCart from "../components/shopping-cart";
import PurchasePageHeader from "../components/purchase-page-header";

export const metadata: Metadata = {
  title: "Shopping Bag | SHIRO",
  description:
    "Review your personal selection of SHIRO fragrances.",
};

export default function CartPage() {
  return (
    <main className="cart-page">
      <PurchasePageHeader variant="cart" />

      <ShoppingCart />
    </main>
  );
}
