import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import ProductsPage from "./ProductsPage";
import CartPage from "./CartPage";
import About from "./About";

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
      </Routes>
    </Router>
  );
}

export default App;
