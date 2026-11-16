import { products } from "../data/products";
import type { CartItem } from "../store/cart-store";

export const FREE_SHIPPING_MINIMUM = 150;

export const SHIPPING_COST = 10;

export function getCartProducts(items: CartItem[]) {
  return items.flatMap((item) => {
    const product = products.find(
      (product) => product.id === item.productId
    );

    if (
      !product ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0 ||
      product.stock <= 0
    ) return [];

    const quantity = Math.min(
      item.quantity,
      product.stock
    );

    return [
      {
        product,
        quantity,
        total: product.price * quantity,
      },
    ];
  });
}

export function getCartTotals(items: CartItem[]) {
  const cartProducts = getCartProducts(items);

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.total,
    0
  );

  const count = cartProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const shipping =
    subtotal === 0 ||
    subtotal >= FREE_SHIPPING_MINIMUM
      ? 0
      : SHIPPING_COST;

  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_MINIMUM - subtotal
  );

  return {
    subtotal,
    count,
    shipping,
    total: subtotal + shipping,
    remainingForFreeShipping,
  };
}