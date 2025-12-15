import React from "react";
import "./CartDrawer.css";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartDrawer({ isOpen, closeDrawer }) {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    total,
  } = useCart();

  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={closeDrawer}
      ></div>

      <div className={`drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="drawer-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={closeDrawer}>✕</button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id + item.color + item.size}
                className="drawer-item"
              >
                <img src={item.image} className="drawer-img" alt="" />

                <div className="drawer-info">
                  <h3>{item.name}</h3>
                  <p>{item.price} EGP</p>
                  <p><strong>Color:</strong> {item.color}</p>
                  <p><strong>Size:</strong> {item.size}</p>

                  <div className="qty-row">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQty(item)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increaseQty(item)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <h3>Total: {total} EGP</h3>

            <div className="cart-actions">
              <button
                className="continue-btn"
                onClick={closeDrawer}
              >
                Continue shopping
              </button>

              <button
                className="checkout-btn"
                onClick={() => {
                  closeDrawer();
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
