import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../cart/CartContext";
import "./ProductDetails.css";

export default function ProductDetails({ openCart }) {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  /* ===============================
     LOAD PRODUCT
     =============================== */
  useEffect(() => {
    async function loadProduct() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setProduct(data);
        setMainImage(data.images?.[0] || "");
      }
    }

    loadProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  /* ===============================
     ✅ STOCK LOGIC (نهائي)
     =============================== */
  const stock = Array.isArray(product.sizes)
    ? product.sizes
    : [];

  const allOut =
    stock.length > 0 && stock.every((s) => Number(s.qty) === 0);

  /* ===============================
     ADD TO CART
     =============================== */
  const add = () => {
    if (!selectedColor || !selectedSize) {
      setError("⚠️ من فضلك اختر اللون والمقاس");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    const sizeStock = stock.find(
      (s) => s.size === selectedSize
    );

    if (!sizeStock || Number(sizeStock.qty) === 0) {
      setError("❌ المقاس ده خلصان");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setError("");

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });

    if (openCart) openCart();
  };

  return (
    <div className="product-page fade-in">
      {/* LEFT */}
      <div className="left-side">
        <img
          src={mainImage}
          className="main-img"
          alt={product.name}
        />

        <div className="thumb-row">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`thumb-img ${
                mainImage === img ? "active" : ""
              }`}
              onClick={() => setMainImage(img)}
              alt=""
            />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="right-side">
        <h1 className="product-title">{product.name}</h1>
        <h2 className="product-price">{product.price} EGP</h2>

        {/* COLORS */}
        {product.colors?.length > 0 && (
          <>
            <h3 className="section-label">Color</h3>
            <div className="options-row">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`color-btn ${
                    selectedColor === c ? "active" : ""
                  }`}
                  onClick={() => setSelectedColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </>
        )}

        {/* SIZES */}
        <h3 className="section-label">Size</h3>
        <div className="options-row">
          {stock.map((s, i) => (
            <button
              key={i}
              disabled={Number(s.qty) === 0}
              className={`option-btn ${
                selectedSize === s.size ? "active" : ""
              } ${Number(s.qty) === 0 ? "disabled" : ""}`}
              onClick={() => setSelectedSize(s.size)}
            >
              {s.size}
              {Number(s.qty) === 0 && " – خلصان"}
            </button>
          ))}
        </div>

        {/* STATUS */}
        {allOut && (
          <p className="out-stock">
            🔴 المنتج خلصان بالكامل
          </p>
        )}

        {error && <p className="select-error">{error}</p>}

        {/* ADD BUTTON */}
        <button
          className={`add-btn ${shake ? "shake" : ""}`}
          onClick={add}
          disabled={allOut}
        >
          Add to Cart
        </button>

        {product.caption && (
          <p className="product-caption">
            {product.caption}
          </p>
        )}
      </div>
    </div>
  );
}
