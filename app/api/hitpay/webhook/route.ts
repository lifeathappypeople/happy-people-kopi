import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  console.log("HitPay Webhook", body);

  const reference =
    body.reference_number;

  const paymentId =
    body.payment_id;

  if (
    body.status === "completed"
  ) {
    await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        hitpay_payment_id:
          paymentId,
        paid_at: new Date()
          .toISOString(),
      })
      .eq(
        "id",
        reference
      );
  }

  return NextResponse.json({
    success: true,
  });
}