"use client";

import { useState } from "react";

export default function MenuClient({ items }: { items: any[] }) {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(item: any) {
    const updated = [...cart, item];

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  }

  return (
    <>
      <div
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Cart: {cart.length} item(s)
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <h2>
            {item.emoji} {item.name}
          </h2>

          <p>{item.description}</p>

          <p>
            ${(item.price_cents / 100).toFixed(2)}
          </p>

          <button
            onClick={() => addToCart(item)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  );
}