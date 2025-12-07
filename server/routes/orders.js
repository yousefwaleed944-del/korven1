import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

// GET ORDERS
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ADD ORDER
router.post("/", async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([req.body]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

export default router;
