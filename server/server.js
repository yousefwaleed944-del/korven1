import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =============================
// 🔥 READ ENV
// =============================
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const PORT = 5000;

console.log("======================================");
console.log("🚀 SERVER RUNNING ON PORT", PORT);
console.log("SUPABASE_URL =", SUPABASE_URL);
console.log("SERVICE_ROLE =", SERVICE_ROLE ? "FOUND" : "MISSING");
console.log("======================================");

// =============================
// 🔥 Connect Supabase
// =============================
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

// =============================
// 🟢 DEFAULT ROUTE
// =============================
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

// =============================
// 🟡 GET PRODUCTS ROUTE
// =============================
app.get("/products", async (req, res) => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// =============================
// 🟡 GET OFASHOP (ORDERS) ROUTE
// =============================
app.get("/ofashop", async (req, res) => {
  try {
    const { data, error } = await supabase.from("ofashop").select("*");

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// =============================
// 🚀 START SERVER
// =============================
app.listen(PORT, () => {
  console.log("🔥 Server listening on port", PORT);
});
