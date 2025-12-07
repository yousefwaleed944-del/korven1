import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";
import "./ProductDetails.css";

export default function ProductDetails({ openCart }) {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [buttonShake, setButtonShake] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      let { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setProduct(data);
        setMainImage(data.images[0]);
      }
    }
    loadProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const add = () => {
    if (!selectedColor || !selectedSize) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });

    // ✨ Animation: button shake
    setButtonShake(true);
    setTimeout(() => setButtonShake(false), 400);

    // ✨ Open Cart Drawer automatically
    if (openCart) openCart();
  };

  return (
    <div className="product-page">

      {/* LEFT SIDE */}
      <div className="left-side">
        <img src={mainImage} className="main-img" alt="" />

        <div className="thumb-row">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`thumb-img ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-side">
        <h1 className="product-title">{product.name}</h1>
        <h2 className="product-price">{product.price} EGP</h2>

        <h3 className="section-label">Color:</h3>
        <div className="options-row">
          {product.colors.map((color) => (
  <button
    key={color}
    className={`color-btn ${selectedColor === color ? "active" : ""}`}
    onClick={() => setSelectedColor(color)}
    style={{
  backgroundColor: color === "oil" ? "#0b3d3a" : color,  
  color: color === "white" ? "black" : "white",
  border: selectedColor === color ? "2px solid black" : "1px solid #ccc"
}}

  >
    {color}
  </button>
))}

        </div>

        <h3 className="section-label">Size:</h3>
        <div className="options-row">
          {product.sizes.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedSize(s)}
              className={`option-btn ${selectedSize === s ? "active" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          className={`add-btn ${buttonShake ? "shake" : ""}`}
          onClick={add}
        >
          Add to Cart
        </button>

        <p className="product-caption">{product.caption}</p>
      </div>
    </div>
  );
}
