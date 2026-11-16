import type { Metadata } from "next";

import Wishlist from "../components/wishlist";
import ShopPageHeader from "../components/shop-page-header";

export const metadata: Metadata = {
  title: "Your Wishlist | SHIRO",
  description:
    "A personal selection of your favorite SHIRO fragrances.",
};

export default function WishlistPage() {
  return (
    <main className="wishlist-page">
      <ShopPageHeader variant="wishlist" />
      <Wishlist />
    </main>
  );
}
