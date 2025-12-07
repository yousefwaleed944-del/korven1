import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState("");

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState("");
  const [productCaption, setProductCaption] = useState("");
  const [productColors, setProductColors] = useState("");
  const [productSizes, setProductSizes] = useState("");

  const navigate = useNavigate();

  // LOGOUT
  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin-login");
  }

  // LOAD DATA
  async function loadData() {
    const { data: prod } = await supabase.from("products").select("*");
    const { data: ord } = await supabase.from("ofashop").select("*");
    setProducts(prod || []);
    setOrders(ord || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  // TOTAL REVENUE
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  );

  // FILTER BY DATE
  const filteredOrders = filterDate
    ? orders.filter((o) => o.created_at?.startsWith(filterDate))
    : orders;

  // SEARCH
  const searchedOrders = filteredOrders.filter((o) =>
    (o.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (o.phone || "").toLowerCase().includes(search.toLowerCase())
  );

  // ADD PRODUCT
  async function handleAddProduct(e) {
    e.preventDefault();
    await supabase.from("products").insert([
      {
        name: productName,
        price: Number(productPrice),
        images: productImages.split(",").map((i) => i.trim()),
        caption: productCaption,
        colors: productColors.split(",").map((i) => i.trim()),
        sizes: productSizes.split(",").map((i) => i.trim()),
      },
    ]);

    setProductName("");
    setProductPrice("");
    setProductImages("");
    setProductCaption("");
    setProductColors("");
    setProductSizes("");

    loadData();
  }

  // DELETE PRODUCT
  async function deleteProduct(id) {
    await supabase.from("products").delete().eq("id", id);
    loadData();
  }

  // DELETE ORDER
  async function deleteOrder(id) {
    await supabase.from("ofashop").delete().eq("id", id);
    loadData();
  }

  // EXPORT EXCEL
  function exportExcel() {
    const ws = XLSX.utils.json_to_sheet(orders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders.xlsx");
  }

  // CHART DATA
  const revenueByDay = {};
  orders.forEach((o) => {
    const d = o.created_at?.split("T")[0];
    revenueByDay[d] = (revenueByDay[d] || 0) + (o.total || 0);
  });

  const chartData = {
    labels: Object.keys(revenueByDay),
    datasets: [
      {
        label: "Daily Revenue",
        data: Object.values(revenueByDay),
        backgroundColor: "rgba(0, 150, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="admin-root">

      {/* TOP BAR */}
      <div className="admin-top">
        <h2>Admin Dashboard</h2>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>

      {/* CARDS */}
      <div className="cards-grid">
        <div className="card">
          <h3>Products</h3>
          <p>{products.length} items</p>
        </div>
        <div className="card">
          <h3>Orders</h3>
          <p>{orders.length} orders</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>{totalRevenue} EGP</p>
        </div>
      </div>

      {/* EXPORT */}
      <button className="btn-main" onClick={exportExcel}>Export Excel</button>

      {/* CHART */}
      <div className="card" style={{ margin: "20px 0" }}>
        <h3>Revenue Chart</h3>
        <Bar data={chartData} />
      </div>

      {/* FILTER */}
      <div className="card">
        <h3>Filter by Date</h3>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* SEARCH */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Search</h3>
        <input
          placeholder="Search name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCTS LIST */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Products List</h3>
        {products.map((p) => (
          <div key={p.id} className="product-item">
            <b>{p.name}</b> — {p.price} EGP
            <button
              className="btn-main"
              style={{ marginLeft: 12 }}
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Orders ({searchedOrders.length})</h3>

        {searchedOrders.map((o) => (
          <div key={o.id} className="order-item">
            <b>Name:</b> {o.name}<br />
            <b>Phone:</b> {o.phone}<br />
            <b>Address:</b> {o.address}<br />
            <b>Total:</b> {o.total} EGP<br />

            <button
              className="btn-main"
              style={{ marginTop: 6 }}
              onClick={() => deleteOrder(o.id)}
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;
