import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    "https://api.sandbox.hit-pay.com/v1/payment-requests",
    {
      method: "POST",
      headers: {
        "X-BUSINESS-API-KEY":
          process.env.HITPAY_API_KEY!,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        amount: (body.totalCents / 100).toFixed(2),
        currency: "SGD",
        purpose: "Happy People Kopi and Tea",
        reference_number: body.orderId,
        email: "test@example.com",

        redirect_url:
          "https://happy-people-kopi-9wx6.vercel.app/payment-success",
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}