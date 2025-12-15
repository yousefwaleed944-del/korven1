import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// PORT FIX 👇
const PORT = process.env.PORT || 5000;

// ENV
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

// SUPABASE CLIENT
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

// ROOT
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

// PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// OFASHOP
app.get("/ofashop", async (req, res) => {
  try {
    const { data, error } = await supabase.from("ofashop").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Server listening on port ${PORT}`);
});
