import type { Metadata } from "next";
import OrderConfirmation from "../../components/order-confirmation";

export const metadata: Metadata = {
  title: "Order Confirmation | SHIRO",
    robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutSuccessPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <OrderConfirmation />
    </main>
  );
}