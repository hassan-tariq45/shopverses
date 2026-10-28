import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext.jsx";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 3) e.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (form.address.trim().length < 8) e.address = "Enter your full delivery address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setOrderId("SV" + Date.now().toString().slice(-6));
    clearCart();
  };

  if (orderId)
    return (
      <div className="done">
        <h1>Order placed</h1>
        <p>Thank you, {form.name}. Your order number is <strong>{orderId}</strong>. A confirmation will be sent to {form.email}.</p>
        <Link to="/" className="btn lg">Continue shopping</Link>
      </div>
    );

  if (items.length === 0)
    return <p className="empty">Your cart is empty. <Link to="/">Browse products</Link></p>;

  return (
    <>
      <h1>Checkout</h1>
      <div className="cartbox">
        <form onSubmit={submit} noValidate className="form">
          {[["name", "Full name"], ["email", "Email"], ["phone", "Phone"]].map(([k, l]) => (
            <label key={k}>{l}
              <input value={form[k]} onChange={set(k)} />
              {errors[k] && <span className="err">{errors[k]}</span>}
            </label>
          ))}
          <label>Delivery address
            <textarea rows="3" value={form.address} onChange={set("address")} />
            {errors.address && <span className="err">{errors.address}</span>}
          </label>
          <p className="note">Payment is cash on delivery. This is a demo project, so no real orders are placed.</p>
          <button className="btn lg" type="submit">Place order</button>
        </form>
        <aside className="sum">
          <h3>Your items</h3>
          {items.map((i) => (
            <div className="row" key={i.id}><span>{i.qty} × {i.title.slice(0, 28)}…</span><span>${(i.price * i.qty).toFixed(2)}</span></div>
          ))}
          <div className="row tot"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </aside>
      </div>
    </>
  );
}
