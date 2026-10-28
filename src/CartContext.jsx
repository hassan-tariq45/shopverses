import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(items)); }, [items]);

  const addToCart = (p) =>
    setItems((prev) =>
      prev.find((i) => i.id === p.id)
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 }]
    );
  const changeQty = (id, d) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, changeQty, removeItem, clearCart, count, total }}>
      {children}
    </CartContext.Provider>
  );
}
