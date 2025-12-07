import { createClient } from "@supabase/supabase-js";
const s = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE);

async function test() {
  try {
    const { data, error } = await s.from("products").select("*");
    console.log("DATA", data);
    console.log("ERROR", error);
  } catch(e) {
    console.error("EXCEPTION", e);
  }
}

test();
