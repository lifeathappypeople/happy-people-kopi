"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  async function continueToPayment() {
    const cart: { price_cents: number }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price_cents,
      0
    );

    const serviceCharge = Math.round(
      subtotal * 0.10
    );

    const gst = Math.round(
      (subtotal + serviceCharge) * 0.09
    );

    const grandTotal =
      subtotal + serviceCharge + gst;

    const response = await fetch(
      "/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          phone,
          tableNumber: Number(tableNumber),
          subtotal,
          serviceCharge,
          gst,
          grandTotal,
        }),
      }
    );

    const result =
      await response.json();

    const paymentResponse =
      await fetch(
        "/api/hitpay/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            orderId: result.orderId,
            totalCents: grandTotal,
          }),
        }
      );

    const paymentData =
      await paymentResponse.json();

    window.location.href =
      paymentData.url;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Checkout</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "400px",
        }}
      >
        <input
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        <button onClick={continueToPayment}>
          Continue to Payment
        </button>
      </div>
    </main>
  );
}
