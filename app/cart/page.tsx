"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price_cents,
    0
  );

  const serviceCharge = Math.round(
    subtotal * 0.1
  );

  const gst = Math.round(
    (subtotal + serviceCharge) * 0.09
  );

  const total =
    subtotal + serviceCharge + gst;

  return (
    <main style={{ padding: "40px" }}>
      <h1>Your Cart</h1>

      {cart.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} - $
            {(item.price_cents / 100).toFixed(2)}
          </p>
        </div>
      ))}

      <hr />

      <p>
        Subtotal: $
        {(subtotal / 100).toFixed(2)}
      </p>

      <p>
        Service Charge: $
        {(serviceCharge / 100).toFixed(2)}
      </p>

      <p>
        GST: $
        {(gst / 100).toFixed(2)}
      </p>

      <h2>
        Total: $
        {(total / 100).toFixed(2)}
      </h2>

      <a href="/checkout">
        Proceed to Checkout
      </a>
    </main>
  );
}