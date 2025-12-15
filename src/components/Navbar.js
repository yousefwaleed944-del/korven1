import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import "./Navbar.css";

export default function Navbar({ openCart }) {
  const { cartItems } = useCart();
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">KORVEN</Link>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
        </nav>

        <div className="nav-actions">
          <button className="cart-btn" onClick={openCart}>
            🛒 {totalQty > 0 && <span>{totalQty}</span>}
          </button>

          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
