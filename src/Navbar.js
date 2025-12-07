import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Navbar.css";

export default function Navbar({ openCart }) {
  const { cartItems } = useCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">KORVEN</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <div className="nav-cart" onClick={openCart}>
          <span className="cart-icon">🛒</span>
          {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
        </div>
      </div>
    </nav>
  );
}
