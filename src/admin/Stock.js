import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Stock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }

  return (
    <div>
      <h1>Stock</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <h3>{product.name}</h3>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {product.sizes?.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  background:
                    s.qty === 0
                      ? "#ffcdd2"
                      : s.qty <= 2
                      ? "#fff9c4"
                      : "#c8e6c9",
                }}
              >
                {s.size} : {s.qty}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
