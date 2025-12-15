import React, { useState } from "react";
import { useCart } from "../cart/CartContext";
import { supabase } from "../supabaseClient";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* =========================
     TOTAL
  ========================= */
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  /* =========================
     SEND ORDER
  ========================= */
  const sendOrder = async () => {
    setError("");
    setSuccess(false);

    if (!name || !phone || !address) {
      setError("⚠️ من فضلك املأ كل البيانات");
      return;
    }

    if (cartItems.length === 0) {
      setError("❌ السلة فاضية");
      return;
    }

    // تأكيد اختيار المقاس
    for (const item of cartItems) {
      if (!item.size) {
        setError(`❌ اختر المقاس للمنتج: ${item.name}`);
        return;
      }
    }

    const orderItems = cartItems.map((item) => ({
      product_id: item.id,
      name: item.name,
      size: item.size,
      qty: item.quantity,
      price: Number(item.price),
    }));

    setLoading(true);

    const { error: orderError } = await supabase
      .from("ofashop")
      .insert([
        {
          name,
          phone,
          address,
          total,
          status: "pending",
          items: orderItems,
        },
      ]);

    setLoading(false);

    if (orderError) {
      console.error("ORDER ERROR:", orderError.message);
      setError("❌ حصل خطأ في تسجيل الطلب");
      return;
    }

    clearCart();
    setSuccess(true);
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {success && (
        <p className="success">✅ تم تسجيل الطلب بنجاح</p>
      )}

      {error && <p className="error">{error}</p>}

      <div className="checkout-form">
        <input
          type="text"
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="رقم الموبايل"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="العنوان"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="order-summary">
          <h4>ملخص الطلب</h4>

          {cartItems.map((item, i) => (
            <div key={i} className="order-item">
              <span>
                {item.name} – {item.size} × {item.quantity}
              </span>
              <span>
                {item.price * item.quantity} EGP
              </span>
            </div>
          ))}

          <div className="order-total">
            <b>الإجمالي:</b>
            <b>{total} EGP</b>
          </div>
        </div>

        <button onClick={sendOrder} disabled={loading}>
          {loading ? "جارٍ الإرسال..." : "تأكيد الطلب"}
        </button>
      </div>
    </div>
  );
}
