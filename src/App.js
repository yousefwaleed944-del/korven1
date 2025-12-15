import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* ===== CART ===== */
import { CartProvider, useCart } from "./cart/CartContext";
import CartDrawer from "./cart/CartDrawer";

/* ===== COMPONENTS ===== */
import Navbar from "./components/Navbar";

/* ===== PAGES ===== */
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import About from "./pages/About";

/* ===== ADMIN ===== */
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

/* ===============================
   APP CONTENT
================================ */
function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, total } = useCart();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      {/* ===== NAVBAR (SITE ONLY) ===== */}
      {!isAdmin && <Navbar openCart={openCart} />}

      {/* ===== ROUTES ===== */}
      <Routes>
        {/* SITE */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/product/:id"
          element={<ProductDetails openCart={openCart} />}
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />

        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ===== CART UI (SITE ONLY) ===== */}
      {!isAdmin && (
        <>
          <CartDrawer
            isOpen={isCartOpen}
            closeDrawer={closeCart}
            cartItems={cartItems}
            total={total}
          />

          {/* Floating Cart */}
          <button
            onClick={openCart}
            className="floating-cart"
            style={{
              position: "fixed",
              bottom: 22,
              right: 22,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.65)",
              color: "#fff",
              fontSize: 26,
              border: "none",
              cursor: "pointer",
              zIndex: 9999,
            }}
          >
            🛒
            {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "red",
                  color: "#fff",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartItems.reduce(
                  (sum, i) => sum + (i.quantity || 0),
                  0
                )}
              </span>
            )}
          </button>
        </>
      )}
    </>
  );
}

/* ===============================
   APP ROOT
================================ */
export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
