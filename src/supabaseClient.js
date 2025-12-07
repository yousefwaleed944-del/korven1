import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhsxwuelnqxwtadwrhgs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoc3h3dWVsbnF4d3RhZHdyaGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDM4MTAsImV4cCI6MjA3ODk3OTgxMH0.kh_t2GX3XQkTYIawZRMMPedyhLq0WxadK1Iy3XpvT0Y";

export const supabase = createClient(supabaseUrl, supabaseKey);
