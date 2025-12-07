import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const found = prev.find(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
      );

      if (found) {
        return prev.map((i) =>
          i === found ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, item];
    });
  };

  const increaseQty = (item) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === item.id &&
        i.color === item.color &&
        i.size === item.size
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQty = (item) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (item) => {
    setCartItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.id === item.id &&
            i.color === item.color &&
            i.size === item.size
          )
      )
    );
  };

  const clearCart = () => {
    setCartItems([]); // ← حل المشكلة
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        total,
        clearCart,   // ← مهم
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
