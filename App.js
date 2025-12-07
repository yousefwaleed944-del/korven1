import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import ProductsPage from "./ProductsPage";
import CartPage from "./CartPage";
import About from "./About";

// 🟢 IMPORT ADMIN FILES
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />

        {/* صفحة المنتجات */}
        <Route path="/products" element={<ProductsPage />} />

        {/* صفحة السلة */}
        <Route path="/cart" element={<CartPage />} />

        {/* صفحة About */}
        <Route path="/about" element={<About />} />

        {/* 🟡 LOGIN ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🔐 DASHBOARD PROTECTED */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
