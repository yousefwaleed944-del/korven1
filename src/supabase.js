import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhsexwuelnqxwtadwrhgs.supabase.co";
const supabaseAnonKey = "YOUR_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
