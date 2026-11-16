"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Check,
} from "lucide-react";

import { formatPrice } from "../lib/products";
import { useCartStore } from "../store/cart-store";

type Props = {
  productId: string;
  price: number;
  stock: number;
};

export default function ProductQuantity({
  productId,
  price,
  stock,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const quantityInCart = useCartStore(
    (state) =>
      state.items.find(
        (item) => item.productId === productId
      )?.quantity ?? 0
  );

  const availableStock = Math.max(
    0,
    stock - quantityInCart
  );

  const selectedQuantity = Math.min(
    quantity,
    availableStock
  );

  function handleAddToCart() {
    if (selectedQuantity <= 0) return;

    addItem(productId, selectedQuantity);
    setQuantity(1);
    setAdded(true);
  }

  function changeQuantity(value: number) {
    setQuantity(
      Math.max(1, Math.min(availableStock, value))
    );

    setAdded(false);
  }

  return (
    <div className="purchase-options">
      <span className="quantity-label">Quantity</span>

      <div className="quantity-row">
        <div className="quantity-selector">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={selectedQuantity <= 1}
            onClick={() =>
              changeQuantity(selectedQuantity - 1)
            }
          >
            <Minus size={16} />
          </button>

          <span aria-live="polite">
            {selectedQuantity}
          </span>

          <button
            type="button"
            aria-label="Increase quantity"
            disabled={selectedQuantity >= availableStock}
            onClick={() =>
              changeQuantity(selectedQuantity + 1)
            }
          >
            <Plus size={16} />
          </button>
        </div>

        <span className="quantity-stock">
          {availableStock} available
        </span>
      </div>

      <div className="purchase-total">
        <span>Subtotal</span>

        <strong>
          {formatPrice(price * selectedQuantity)}
        </strong>
      </div>

      <button
        type="button"
        className="add-to-bag"
        disabled={availableStock <= 0}
        onClick={handleAddToCart}
      >
        <ShoppingBag size={18} />

        {stock === 0
          ? "Out of stock"
          : availableStock === 0
          ? "Maximum quantity in bag"
          : "Add to bag"}
      </button>

      {added && (
        <div
          className="cart-added-message"
          role="status"
        >
          <Check size={16} />

          Added to your shopping bag.

          <Link href="/cart">View bag</Link>
        </div>
      )}
    </div>
  );
}