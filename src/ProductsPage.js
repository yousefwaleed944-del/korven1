import React from "react";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";
import "./ProductsPage.css";

function ProductsPage({ products }) {
  const { addToCart } = useCart();

  return (
    <main className="products-container">
      <h2 className="products-title">Featured Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            addToCart={addToCart}
          />
        ))}
      </div>
    </main>
  );
}

export default ProductsPage;
