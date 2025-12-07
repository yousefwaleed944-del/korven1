// src/admin/ProductForm.js
import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProductForm({ onSaved }) {
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [images,setImages] = useState("");
  const [description,setDescription] = useState("");
  const [sizes,setSizes] = useState("");
  const [colors,setColors] = useState("");
  const [loading,setLoading] = useState(false);

  async function handleSave(e){
    e.preventDefault();
    setLoading(true);
    const payload = {
      name,
      price: parseFloat(price || 0),
      images: images ? images.split(",").map(s=>s.trim()) : [],
      description,
      sizes: sizes ? sizes.split(",").map(s=>s.trim()) : [],
      colors: colors ? colors.split(",").map(s=>s.trim()) : []
    };
    const { data, error } = await supabase.from("products").insert([payload]).select().single();
    setLoading(false);
    if(error) return alert(error.message);
    setName(""); setPrice(""); setImages(""); setDescription(""); setSizes(""); setColors("");
    onSaved && onSaved(data);
  }

  return (
    <form onSubmit={handleSave} style={{ marginTop:12 }}>
      <div className="form-row">
        <input className="input" placeholder="Product name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input small" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
      </div>
      <div style={{ marginTop:10 }}>
        <input className="input" placeholder="Images (comma separated URLs)" value={images} onChange={e=>setImages(e.target.value)} />
      </div>
      <div style={{ marginTop:10 }}>
        <textarea className="input" rows={3} placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      </div>
      <div className="form-row">
        <input className="input" placeholder="Sizes (S,M,L)" value={sizes} onChange={e=>setSizes(e.target.value)} />
        <input className="input" placeholder="Colors (black,white)" value={colors} onChange={e=>setColors(e.target.value)} />
      </div>
      <div style={{ marginTop:10 }}>
        <button className="btn" type="submit" disabled={loading}>{loading ? "Saving..." : "Save Product"}</button>
      </div>
    </form>
  );
}
