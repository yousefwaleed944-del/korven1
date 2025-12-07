import React from "react";
import "./CartDrawer.css";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer({ isOpen, closeDrawer }) {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, total } = useCart();

  return (
    <>
      {/* Overlay Click to Close */}
      <div
        className={`drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={closeDrawer}
      ></div>

      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Your Cart</h2>

          {/* Close Button */}
          <button className="close-btn" onClick={closeDrawer}>✕</button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id + item.color + item.size} className="drawer-item">
                <img src={item.image} className="drawer-img" alt="" />

                <div className="drawer-info">
                  <h3>{item.name}</h3>
                  <p>{item.price} EGP</p>
                  <p><strong>Color:</strong> {item.color}</p>
                  <p><strong>Size:</strong> {item.size}</p>

                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => decreaseQty(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => increaseQty(item)}>+</button>
                  </div>

                  <button className="remove-btn" onClick={() => removeFromCart(item)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <h3>Total: {total} EGP</h3>

            <Link to="/checkout">
              <button className="checkout-btn" onClick={closeDrawer}>
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
