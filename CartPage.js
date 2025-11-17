import { useContext } from "react";
import { CartContext } from "./CartContext";

function CartPage() {
  const { cart, removeFromCart, total } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "10px"
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "120px", borderRadius: "10px" }}
            />

            <div style={{ marginLeft: "20px" }}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "8px 12px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <h2>Total: ${total}</h2>
    </div>
  );
}

export default CartPage;
