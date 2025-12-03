import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";
import "./ProductDetails.css";

function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const { addToCart } = useCart();

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="details-container">
      
      {/* LEFT IMAGES */}
      <div className="left-section">
        {/* Main Image */}
        <img src={mainImage} alt={product.name} className="main-image" />

        {/* Thumbnails */}
        <div className="thumbnails">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`thumb ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
              alt="thumbnail"
            />
          ))}
        </div>

        {/* Caption */}
        <p className="caption">{product.caption}</p>
      </div>

      {/* RIGHT INFO */}
      <div className="right-section">
        <h1>{product.name}</h1>
        <p className="price">${product.price}EGP</p>

        {/* colors */}
        <div className="colors">
          {product.colors.map((color) => (
            <span
              key={color}
              className={`color-circle ${
                selectedColor === color ? "active" : ""
              }`}
              style={{ background: color }}
              onClick={() => setSelectedColor(color)}
            ></span>
          ))}
        </div>

        {/* sizes */}
        <div className="sizes">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${
                selectedSize === size ? "active" : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          className="add-btn"
          onClick={() => {
            addToCart({
              ...product,
              selectedColor,
              selectedSize,
            });
            toast.success("Added to cart!");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
