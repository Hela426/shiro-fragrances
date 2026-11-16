import type { Metadata } from "next";
import OrderConfirmation from "../../components/order-confirmation";

export const metadata: Metadata = {
  title: "Order Confirmation | SHIRO",
};

export default function CheckoutSuccessPage() {
  return (
    <main>
      <OrderConfirmation />
    </main>
  );
}