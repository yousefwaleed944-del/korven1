import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }
    loadProducts();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <div className="products-container">
      <h1 className="title">Products</h1>

      {/* Category Tabs */}
      <div className="category-tabs">
        {[
          { key: "all", label: "الكل" },
          { key: "jackets", label: "جواكت" },
          { key: "pants", label: "بناطيل" },
          { key: "sweatshirts", label: "سويت شيرت" },
          { key: "shorts", label: "شراويل" },
        ].map((c) => (
          <button
            key={c.key}
            className={`tab-btn ${activeCategory === c.key ? "active" : ""}`}
            onClick={() => setActiveCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="product-image"
                width="300"
                height="400"
                loading="lazy"
              />
            </Link>

            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
