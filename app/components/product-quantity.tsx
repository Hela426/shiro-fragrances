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
import { useTranslation } from "../lib/use-translation";

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
  const { t } = useTranslation();

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
      <span className="quantity-label">
        {t.product.quantity}
      </span>

      <div className="quantity-row">
        <div className="quantity-selector">
          <button
            type="button"
            aria-label={t.product.decrease}
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
            aria-label={t.product.increase}
            disabled={selectedQuantity >= availableStock}
            onClick={() =>
              changeQuantity(selectedQuantity + 1)
            }
          >
            <Plus size={16} />
          </button>
        </div>

        <span className="quantity-stock">
          {availableStock} {t.product.available}
        </span>
      </div>

      <div className="purchase-total">
        <span>{t.product.subtotal}</span>

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
          ? t.product.outOfStock
          : availableStock === 0
          ? t.product.maximum
          : t.product.addToBag}
      </button>

      {added && (
        <div className="cart-added-message" role="status">
          <Check size={16} />

          {t.product.added}

          <Link href="/cart">
            {t.product.viewBag}
          </Link>
        </div>
      )}
    </div>
  );
}
