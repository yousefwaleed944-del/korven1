import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; 
import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="product-card">

      {/* صورة المنتج */}
      <Link to={`/product/${product.id}`} className="pc-image-wrapper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="pc-image"
        />
      </Link>

      {/* الكلمة تحت الصورة */}
      <p className="pc-view-more">اضغط لعرض التفاصيل والصور</p>

      {/* اسم المنتج */}
      <h3 className="pc-name">{product.name}</h3>

      {/* السعر */}
      <p className="pc-price">{product.price} جنيه</p>

      {/* الألوان */}
      <div className="pc-colors">
        {product.colors.map((color) => (
          <span
            key={color}
            className={`pc-color ${selectedColor === color ? "active" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          ></span>
        ))}
      </div>

      {/* المقاسات */}
      <div className="pc-sizes">
        {product.sizes.map((size) => (
          <button
            key={size}
            className={`pc-size-btn ${
              selectedSize === size ? "active" : ""
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* زر السلة + التوست */}
      <button
        className="pc-add-btn"
        onClick={() => {
          addToCart({ ...product, selectedSize, selectedColor });
          toast.success("تمت الإضافة إلى السلة ✔", { autoClose: 1200 });
        }}
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;
