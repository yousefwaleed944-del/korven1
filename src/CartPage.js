import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const { cartItems, total, removeFromCart, clearCart, addToCart } = useCart();
  const navigate = useNavigate();

  // زيادة الكمية
  const increaseQty = (item) => {
    addToCart({
      ...item,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    });
  };

  // تقليل الكمية
  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      removeFromCart(item.id, item.selectedColor, item.selectedSize);
      addToCart({
        ...item,
        quantity: item.quantity - 1,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      });
    } else {
      removeFromCart(item.id, item.selectedColor, item.selectedSize);
    }
  };

  return (
    <div className="cart-page">
      <h1>السلة</h1>

      {cartItems.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img
              src={
                item.images && item.images.length > 0
                  ? item.images[0]
                  : "https://via.placeholder.com/150"
              }
              alt={item.name}
              className="cart-img"
            />

            <div className="info">
              <h2>{item.name}</h2>
              <p>{item.price} جنيه</p>

              {item.selectedColor && <p>اللون: {item.selectedColor}</p>}
              {item.selectedSize && <p>المقاس: {item.selectedSize}</p>}

              <div className="qty-box">
                <button className="qty-btn" onClick={() => increaseQty(item)}>
                  +
                </button>

                <span className="qty-num">{item.quantity}</span>

                <button className="qty-btn" onClick={() => decreaseQty(item)}>
                  -
                </button>
              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  removeFromCart(item.id, item.selectedColor, item.selectedSize)
                }
              >
                حذف
              </button>
            </div>
          </div>
        ))
      )}

      <h2>الإجمالي: {total} جنيه</h2>

      <div className="cart-actions">
        <button className="clear-btn" onClick={clearCart}>
          مسح السلة
        </button>

        <button className="buy-btn" onClick={() => navigate("/checkout")}>
          شراء
        </button>
      </div>
    </div>
  );
}

export default CartPage;
