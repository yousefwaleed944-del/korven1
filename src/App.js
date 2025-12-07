import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider, useCart } from "./CartContext";

import Navbar from "./Navbar";
import Home from "./Home";
import ProductsPage from "./ProductsPage";
import ProductDetails from "./ProductDetails";
import CheckoutPage from "./CheckoutPage";
import About from "./About";

import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";

import CartDrawer from "./CartDrawer";

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, total } = useCart();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      <Navbar openCart={openCart} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route
          path="/product/:id"
          element={<ProductDetails openCart={openCart} />}
        />

        {/* Admin login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        closeDrawer={closeCart}
        cartItems={cartItems}
        total={total}
      />

      {/* Floating cart button */}
      <div
        style={{
          position: "fixed",
          bottom: 22,
          right: 22,
          zIndex: 99999,
        }}
      >
        <button
          onClick={openCart}
          className="floating-cart"
          style={{
            background: "rgba(0,0,0,0.55)",
            color: "white",
            borderRadius: "50%",
            width: 64,
            height: 64,
            fontSize: 24,
            border: "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            position: "relative",
          }}
        >
          🛒
          {cartItems.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                background: "red",
                color: "white",
                borderRadius: "50%",
                width: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
              }}
            >
              {cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0)}
            </span>
          )}
        </button>
      </div>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
