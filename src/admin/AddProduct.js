import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Admin.css";

export default function AddProduct({ onAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState("");
  const [loading, setLoading] = useState(false);

  // Sizes & Stock
  const [sizes, setSizes] = useState([
    { size: "S", qty: 0 },
    { size: "M", qty: 0 },
    { size: "L", qty: 0 },
    { size: "XL", qty: 0 },
  ]);

  const updateQty = (size, value) => {
    setSizes((prev) =>
      prev.map((s) =>
        s.size === size ? { ...s, qty: Number(value) } : s
      )
    );
  };

  const addProduct = async () => {
    if (!name || !price) {
      alert("اسم المنتج والسعر مطلوبين");
      return;
    }

    setLoading(true);

    // stock object
    const stock = {};
    sizes.forEach((s) => {
      stock[s.size] = s.qty;
    });

    // colors array
    const colorsArray = colors
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const { error } = await supabase.from("products").insert([
      {
        name,
        price: Number(price),
        category,
        images: image ? [image] : [],
        sizes,              // jsonb
        stock,              // jsonb
        colors: colorsArray // jsonb
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("تم إضافة المنتج بنجاح ✅");

    // Reset form
    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setColors("");
    setSizes([
      { size: "S", qty: 0 },
      { size: "M", qty: 0 },
      { size: "L", qty: 0 },
      { size: "XL", qty: 0 },
    ]);

    if (onAdded) onAdded();
  };

  return (
    <div className="admin-page">
      <h2>Add Product</h2>

      <input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Category (pants / jackets ...)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        placeholder="Colors (ex: black, white, red)"
        value={colors}
        onChange={(e) => setColors(e.target.value)}
      />

      <h4>Sizes & Stock</h4>

      <div className="stock-grid">
        {sizes.map((s) => (
          <div key={s.size} className="stock-item">
            <span>{s.size}</span>
            <input
              type="number"
              min="0"
              value={s.qty}
              onChange={(e) => updateQty(s.size, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={addProduct} disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
}
