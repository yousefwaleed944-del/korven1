import React from "react";
import "./CartDrawer.css";
import { useNavigate } from "react-router-dom";

function CartDrawer({ isOpen, closeDrawer, cartItems, total, removeFromCart }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={closeDrawer}
      ></div>

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <h2 className="drawer-title">Your Cart</h2>

        <div className="drawer-items">
          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="drawer-item" key={index}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="drawer-img"
                />

                <div className="drawer-info">
                  <h3>{item.name}</h3>
                  <p>{item.price} جنيه</p>
                  <p>Size: {item.selectedSize}</p>
                  <p>Color: {item.selectedColor}</p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.selectedColor,
                        item.selectedSize
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <h3>Total: {total} جنيه</h3>

          {/* فتح صفحة السلة */}
          <button
            className="view-cart-btn"
            onClick={() => {
              closeDrawer();
              navigate("/cart");
            }}
          >
            View Cart
          </button>

          {/* فتح صفحة الدفع */}
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
    </>
  );
}

export default CartDrawer;
