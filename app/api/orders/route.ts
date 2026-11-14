import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const orderId = randomUUID();

  const { error } = await supabase
    .from("orders")
    .insert({
      id: orderId,
      customer_name: body.customerName,
      phone: body.phone,
      table_number: String(body.tableNumber),
      device_id: body.deviceId || "browser",
      lines: [],
      subtotal_cents: body.subtotal,
      service_charge_cents: body.serviceCharge,
      gst_cents: body.gst,
      total_cents: body.grandTotal,
      payment_status: "pending",
      fulfilment: "new",
      idempotency_key: randomUUID(),
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    orderId,
  });
}