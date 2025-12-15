import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import "./Admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ Edit Product
  const [editingId, setEditingId] = useState(null);

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);

    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    const { data: ordersData } = await supabase
      .from("ofashop")
      .select("*")
      .order("id", { ascending: false });

    setProducts(productsData || []);
    setOrders(ordersData || []);
    setLoading(false);
  }

  /* =========================
     LOGOUT
  ========================= */
  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin-login");
  }

  /* =========================
     METRICS
  ========================= */
  const revenue = useMemo(
    () => orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0),
    [orders]
  );

  const lowStockProducts = useMemo(() => {
    return products.filter((p) =>
      (p.sizes || []).some((s) => Number(s.qty) <= 2)
    );
  }, [products]);

  /* =========================
     HELPERS
  ========================= */
  function isOutOfStock(product) {
    if (!Array.isArray(product.sizes)) return false;
    return product.sizes.every((s) => Number(s.qty) === 0);
  }

  /* =========================
     STOCK UPDATE
  ========================= */
  async function updateStock(productId, size, qty) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const updatedSizes = product.sizes.map((s) =>
      s.size === size ? { ...s, qty } : s
    );

    await supabase
      .from("products")
      .update({ sizes: updatedSizes })
      .eq("id", productId);

    loadAll();
  }

  /* =========================
     ORDER STATUS
  ========================= */
  async function updateOrderStatus(orderId, status) {
    await supabase.from("ofashop").update({ status }).eq("id", orderId);
    loadAll();
  }

  /* =========================
     DELETE
  ========================= */
  async function deleteProduct(id) {
    if (!window.confirm("Delete product?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadAll();
  }

  async function deleteOrder(id) {
    if (!window.confirm("Delete order?")) return;
    await supabase.from("ofashop").delete().eq("id", id);
    loadAll();
  }

  /* =========================
     FILTER ORDERS
  ========================= */
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.phone?.includes(search)
    );
  }, [orders, search]);

  /* =========================
     CSV EXPORT (موجود)
  ========================= */
  function exportCSV() {
    const headers = ["name", "price", "category", "colors", "sizes"];
    const rows = products.map((p) =>
      [
        p.name,
        p.price,
        p.category,
        (p.colors || []).join("|"),
        (p.sizes || []).map(s => `${s.size}:${s.qty}`).join("|")
      ].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
  }

  /* =========================
     CSV IMPORT (✨ الإضافة الجديدة)
  ========================= */
  async function importCSV(e) {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n").slice(1);

    const items = lines
      .map((line) => {
        if (!line.trim()) return null;

        const [name, price, category, colorsStr, sizesStr] = line.split(",");

        if (!name || !price) return null;

        const colors = colorsStr
          ? colorsStr.split("|").map((c) => c.trim())
          : [];

        const sizes = [];
        const stock = {};

        if (sizesStr) {
          sizesStr.split("|").forEach((s) => {
            const [size, qty] = s.split(":");
            if (size && qty) {
              sizes.push({ size, qty: Number(qty) });
              stock[size] = Number(qty);
            }
          });
        }

        return {
          name,
          price: Number(price),
          category,
          images: [],
          colors,
          sizes,
          stock,
        };
      })
      .filter(Boolean);

    if (!items.length) {
      alert("CSV فاضي أو غير صالح");
      return;
    }

    const { error } = await supabase.from("products").insert(items);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("تم إضافة كل المنتجات بنجاح ✅");
    loadAll();
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="admin-root">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>KORVEN</h2>

        <button onClick={() => setTab("overview")}>Overview</button>
        <button onClick={() => setTab("products")}>Products</button>
        <button onClick={() => setTab("orders")}>Orders</button>
        <button onClick={() => setTab("stock")}>Stock</button>
        <button onClick={() => setTab("add-product")}>Add Product</button>

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </aside>
{/* OVERVIEW */}
{tab === "overview" && (
  <>
    {loading ? (
      <p>Loading overview...</p>
    ) : (
      <>
        <h1>Dashboard Overview</h1>
        <div className="cards">
          <div className="card">
            <span>Products</span>
            <b>{products.length}</b>
          </div>
          <div className="card">
            <span>Orders</span>
            <b>{orders.length}</b>
          </div>
          <div className="card">
            <span>Revenue</span>
            <b>{revenue} EGP</b>
          </div>
          <div className="card warn">
            <span>Low Stock</span>
            <b>{lowStockProducts.length}</b>
          </div>
        </div>
      </>
    )}
  </>
)}

      {/* CONTENT */}
      <main className="admin-content">
        {loading && <p>Loading...</p>}

        {/* PRODUCTS */}
        {!loading && tab === "products" && (
          <>
            <h1>Products</h1>

            {/* ✅ Export + Import */}
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <button onClick={exportCSV}>Export CSV</button>

              <label className="csv-btn">
                Import CSV
                <input
                  type="file"
                  accept=".csv"
                  hidden
                  onChange={importCSV}
                />
              </label>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const out = isOutOfStock(p);
                  return (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.price} EGP</td>
                      <td>
                        <span className={`status ${out ? "out" : "in"}`}>
                          {out ? "Out" : "In"}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => setEditingId(p.id)}>
                          ✏️ Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="danger"
                          onClick={() => deleteProduct(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {editingId && (
              <EditProduct
                productId={editingId}
                onUpdated={() => {
                  setEditingId(null);
                  loadAll();
                }}
                onCancel={() => setEditingId(null)}
              />
            )}
          </>
        )}

        {/* باقي التابات زي ما هي */}
        {!loading && tab === "orders" && (
          <>
            <h1>Orders</h1>

            <input
              className="search"
              placeholder="Search name or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Change</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.name}</td>
                    <td>{o.phone}</td>
                    <td>{o.address}</td>
                    <td>
                      {(o.items || o.cart || []).length === 0 && (
                        <span style={{ color: "#999" }}>No items</span>
                      )}
                      {(o.items || o.cart || []).map((i, idx) => (
                        <div key={idx}>
                          {i.name}
                          {i.size && ` - ${i.size}`}
                          {i.color && ` - ${i.color}`}
                          {i.qty && ` × ${i.qty}`}
                        </div>
                      ))}
                    </td>
                    <td>{o.total} EGP</td>
                    <td>{o.status}</td>
                    <td>
                      <select
                        value={o.status || "pending"}
                        onChange={(e) =>
                          updateOrderStatus(o.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="danger"
                        onClick={() => deleteOrder(o.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {!loading && tab === "stock" && (
          <>
            <h1>Stock Management</h1>
            {products.map((p) => (
              <div key={p.id} className="stock-card">
                <b>{p.name}</b>
                <div className="stock-grid">
                  {(p.sizes || []).map((s, i) => (
                    <div key={i} className="stock-item">
                      <span>{s.size}</span>
                      <input
                        type="number"
                        min="0"
                        value={s.qty}
                        onChange={(e) =>
                          updateStock(
                            p.id,
                            s.size,
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {!loading && tab === "add-product" && (
          <AddProduct onAdded={loadAll} />
        )}
      </main>
    </div>
  );
}
