import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider, useCart } from "./CartContext";

import Navbar from "./Navbar";
import Home from "./Home";
import ProductsPage from "./ProductsPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import About from "./About";
import ProductDetails from "./ProductDetails";

import CartDrawer from "./CartDrawer";

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ===========================
  //   المنتجات عندك كما هي 🔥
  // ===========================
  const products = [
    {
      id: 1,
      name: "Black Tank Top",
      price: 350,
      images: [
        "https://i.postimg.cc/FFnjcQzC/Untitled_design_zip_1.png",
        "https://i.postimg.cc/4x7mM9Zt/Untitled_design_zip_2(1).png",
        "https://i.postimg.cc/3JbknBMr/IMG_4616.jpg",
      ],
      caption: "Premium cotton fabric with a modern streetwear fit.",
      colors: ["white", "black"],
      sizes: ["S", "M", "L", "XL"],
    },

    {
      id: 2,
      name: "Oil Sweatpants",
      price: 550,
      images: [
        "https://i.postimg.cc/xCfdpqx4/Untitled_design(3).png",
        "https://i.postimg.cc/xjZ2JbG7/IMG-4315.jpg",
        "https://i.postimg.cc/fR7tH4zg/IMG_7126.jpg",
        "https://i.postimg.cc/9XgWdk2B/IMG-4317.jpg",
        "https://i.postimg.cc/FsFSPzY9/IMG-1853.jpg",
        "https://i.postimg.cc/3JrGLNd1/IMG-1854.jpg",
      ],
      caption: `خامة تقيلة… راحة عالية… ستايل على مزاجك.
شروال ينفع للجامعة، للجيم، وللخروجة كلها.`,

      colors: ["oil", "brown"],
      sizes: ["S", "M", "L", "XL"],
    },

    {
      id: 3,
      name: "White Tank Top",
      price: 350,
      images: [
        "https://i.postimg.cc/cJXKSQ8w/IMG_7106.jpg",
        "https://i.postimg.cc/50bmPqWh/IMG_0458.jpg",
        "https://i.postimg.cc/Y01rpr43/IMG-7103.jpg",
      ],
      caption: `ستايل بسيط… راحة عالية… وخامة تنفع مع أي شروال أو جينز.
التانك توب اللي يمشي مع كل يوم.`,

      colors: ["white", "black"],
      sizes: ["S", "M", "L", "XL"],
    },

    {
      id: 4,
      name: "Trapstar Sweatpants",
      price: 550,
      images: [
        "https://i.postimg.cc/8P9jkpcN/AD1AB693_ACFA_42A9_8466_AC4496F085E5.jpg",
        "https://i.postimg.cc/9QYfVsBC/IMG_4634.jpg",
        "https://i.postimg.cc/Z5xqZXLY/IMG-4619.jpg",
        "https://i.postimg.cc/CKYjY5zN/IMG-4618.jpg",
        "https://i.postimg.cc/sxZB5CMR/IMG-4621.jpg",
      ],
      caption: `خامة تقيلة… راحة عالية… ستايل على مزاجك.
شروال ينفع للجامعة، للجيم، وللخروجة كلها.`,

      colors: ["black"],
      sizes: ["S", "M", "L", "XL"],
    },

    {
      id: 5,
      name: "Gray Sweatpants",
      price: 450,
      images: [
        "https://i.postimg.cc/85LdVvbH/Untitled-design(5).png",
        "https://i.postimg.cc/fLPJ3DCV/IMG_4656.jpg",
        "https://i.postimg.cc/9Fmdvrwf/IMG-4660.jpg",
      ],
      caption: `خامة تقيلة… راحة عالية… ستايل على مزاجك.
شروال ينفع للجامعة، للجيم، وللخروجة كلها.`,

      colors: ["gray", "black"],
      sizes: ["S", "M", "L", "XL"],
    },

    {
      id: 6,
      name: "Poma Sweatpants",
      price: 550,
      images: [
        "https://i.postimg.cc/sDKYySkB/Untitled-design(6).png",
        "https://i.postimg.cc/4N7pQFhk/IMG_4669.jpg",
        "https://i.postimg.cc/YSp4ZXj0/IMG_4327.jpg",
        "https://i.postimg.cc/R0h98Q42/IMG-1818.jpg",
        "https://i.postimg.cc/NMThqdSq/IMG-1748(1).png",
      ],
      caption: `خامة تقيلة… راحة عالية… ستايل على مزاجك.
شروال ينفع للجامعة، للجيم، وللخروجة كلها.`,

      colors: ["black"],
      sizes: ["S", "M", "L", "XL"],
    },

    {
      id: 7,
      name: "black sweatpants",
      price: 600,
      images: [
        "https://i.postimg.cc/d3QVs7Ck/IMG-4323.jpg",
        "https://i.postimg.cc/BnR5j3M3/IMG_1722.jpg",
        "https://i.postimg.cc/XJwd0sXC/IMG_1723.jpg",
        "https://i.postimg.cc/tRcpj9Q5/IMG_1724.png",
      ],
      caption: `خامة تقيلة… راحة عالية… ستايل على مزاجك.
شروال ينفع للجامعة، للجيم، وللخروجة كلها.`,

      colors: ["black"],
      sizes: ["S", "M", "L", "XL"],
    },

    {
      id: 8,
      name: "Oil Sweatpants",
      price: 600,
      images: ["https://i.postimg.cc/fR7tH4zg/IMG_7126.jpg"],
      caption: `خامة تقيلة… راحة عالية… ستايل على مزاجك.
شروال ينفع للجامعة، للجيم، وللخروجة كلها.`,

      colors: ["oil", "brown"],
      sizes: ["M", "L", "XL"],
    },
  ];

  // ===========================

  return (
    <>
      <Navbar openCart={() => setIsCartOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage products={products} />} />
        <Route path="/product/:id" element={<ProductDetails products={products} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        closeDrawer={() => setIsCartOpen(false)}
        cartItems={cartItems}
        total={total}
        removeFromCart={removeFromCart}
      />

      {/* 🔥 زرار السلة العائم الشفاف */}
      <div
        style={{
          position: "fixed",
          bottom: "25px",
          right: "22px",
          zIndex: 3000,
        }}
      >
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
            color: "white",
            borderRadius: "50%",
            width: "65px",
            height: "65px",
            fontSize: "26px",
            border: "1px solid rgba(255,255,255,0.4)",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 6px 15px rgba(0,0,0,0.35)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(0,0,0,0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(0,0,0,0.4)";
          }}
        >
          🛒
          {cartItems.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                fontSize: "13px",
                width: "22px",
                height: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
              }}
            >
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
