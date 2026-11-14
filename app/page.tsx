export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { supabase } from "../lib/supabase";
import MenuClient from "./MenuClient";

export default async function Home() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*");

  if (error) {
    return (
      <div>
        Error: {error.message}
      </div>
    );
  }

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px",
        }}
      >
        Happy People Kopi and Tea
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <a href="/cart">View Cart</a>
      </div>

      <MenuClient items={data || []} />
    </main>
  );
}