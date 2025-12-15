import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./Admin.css";

export default function EditProduct({ productId, onUpdated, onCancel }) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState("");

  const [sizes, setSizes] = useState([
    { size: "S", qty: 0 },
    { size: "M", qty: 0 },
    { size: "L", qty: 0 },
    { size: "XL", qty: 0 },
  ]);

  // 🔹 جلب بيانات المنتج
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error(error);
        alert("فشل تحميل المنتج");
        return;
      }

      setName(data.name || "");
      setPrice(data.price || "");
      setCategory(data.category || "");
      setImage(data.images?.[0] || "");
      setColors((data.colors || []).join(", "));

      if (data.sizes) setSizes(data.sizes);
    };

    fetchProduct();
  }, [productId]);

  const updateQty = (size, value) => {
    setSizes((prev) =>
      prev.map((s) =>
        s.size === size ? { ...s, qty: Number(value) } : s
      )
    );
  };

  const updateProduct = async () => {
    setLoading(true);

    const stock = {};
    sizes.forEach((s) => {
      stock[s.size] = s.qty;
    });

    const colorsArray = colors
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price: Number(price),
        category,
        images: image ? [image] : [],
        sizes,
        stock,
        colors: colorsArray,
      })
      .eq("id", productId);

    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("تم تعديل المنتج بنجاح ✅");
    if (onUpdated) onUpdated();
  };

  return (
    <div className="admin-page">
      <h2>Edit Product</h2>

      <input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        placeholder="Colors (black, white, red)"
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

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={updateProduct} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button onClick={onCancel} style={{ background: "#555" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
