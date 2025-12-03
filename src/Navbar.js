import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Navbar.css";

function Navbar({ openCart }) {
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav>
      <h1 className="logo">OFA Shop</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>

        {/* زرار فتح السلة في النافبار */}
        <button onClick={openCart} className="cart-btn">
          🛒 ({totalQuantity})
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
