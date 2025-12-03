import "./CheckoutPage.css";
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { supabase } from "./supabaseClient";

function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [address, setAddress] = useState("");
  const [nots, setNots] = useState("");
  const [message, setMessage] = useState("");

  const { cartItems, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("DATA SENT:", {
      name,
      phone,
      email,
      governorate,
      address,
      nots,
      cart: cartItems,
      total,
    });

    const { error } = await supabase.from("ofashop").insert([
      {
        name,
        phone,
        email,
        governorate,
        address,
        nots,
        cart: cartItems, // لازم يكون array مش undefined
        total: Number(total), // لازم رقم
      },
    ]);

    if (error) {
      console.log("Submit error:", error);
      setMessage("❌ خطأ أثناء تسجيل الطلب");
      return;
    }

    setMessage("✔️ تم تسجيل الطلب بنجاح!");
    clearCart();
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="المحافظة" value={governorate} onChange={(e) => setGovernorate(e.target.value)} />
        <input placeholder="العنوان كامل" value={address} onChange={(e) => setAddress(e.target.value)} />
        <textarea placeholder="ملاحظات إضافية" value={nots} onChange={(e) => setNots(e.target.value)} />

        <button type="submit" className="checkout-btn">
          Send Order
        </button>
      </form>

      {message && <p className="checkout-message">{message}</p>}
    </div>
  );
}

export default CheckoutPage;
