import type { Metadata } from "next";

import Wishlist from "../components/wishlist";
import ShopPageHeader from "../components/shop-page-header";

export const metadata: Metadata = {
  title: "Your Wishlist | SHIRO",
  description:"A personal selection of your favorite SHIRO fragrances.",
  robots: {
  index: false,
  follow: true,
  },
};

export default function WishlistPage() {
  return (
    <main className="wishlist-page" id="main-content" tabIndex={-1}>
      <ShopPageHeader variant="wishlist" />
      <Wishlist />
    </main>
  );
}
