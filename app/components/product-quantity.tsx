"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { formatPrice } from "../lib/products";

type Props = {
  price: number;
  stock: number;
};

export default function ProductQuantity({
  price,
  stock,
}: Props) {
  const [quantity, setQuantity] = useState(
    stock > 0 ? 1 : 0
  );

  return (
    <div className="purchase-options">
      <span className="quantity-label">
        Quantity
      </span>

      <div className="quantity-row">
        <div className="quantity-selector">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() =>
              setQuantity((value) => Math.max(1, value - 1))
            }
          >
            <Minus size={16} />
          </button>

          <span aria-live="polite">{quantity}</span>

          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= stock}
            onClick={() =>
              setQuantity((value) =>
                Math.min(stock, value + 1)
              )
            }
          >
            <Plus size={16} />
          </button>
        </div>

        <span className="quantity-stock">
          {stock} available
        </span>
      </div>

      <div className="purchase-total">
        <span>Subtotal</span>
        <strong>{formatPrice(price * quantity)}</strong>
      </div>

      <button
        type="button"
        className="add-to-bag"
        disabled
      >
        {stock === 0
          ? "Out of stock"
          : "Add to bag — Coming soon"}
      </button>
    </div>
  );
}