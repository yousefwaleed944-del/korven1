import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase.from("products").select("*");
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div className="products-container">
      <h1 className="title">Featured Products</h1>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="product-image"
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
