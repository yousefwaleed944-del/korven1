import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./Admin.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("ofashop")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setOrders(data);
    }
  };

  const updateStatus = async (id, status) => {
    await supabase.from("ofashop").update({ status }).eq("id", id);
    fetchOrders();
  };

  return (
    <div className="admin-page">
      <h2>Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <strong>Order #{order.id}</strong>
            <span>{order.status}</span>
          </div>

          <p><b>Name:</b> {order.name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Address:</b> {order.address}</p>

          <div className="order-items">
            <h4>Items</h4>

            {order.items?.map((item, i) => (
              <div key={i} className="order-item">
                <span>{item.name}</span>
                <span>Size: {item.size}</span>
                <span>Qty: {item.qty}</span>
                <span>{item.price} EGP</span>
              </div>
            ))}
          </div>

          <p><b>Total:</b> {order.total} EGP</p>

          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}
