import { Link } from "react-router-dom";
import { useCart } from "../CartContext.jsx";

export default function Cart() {
  const { items, changeQty, removeItem, total } = useCart();

  if (items.length === 0)
    return <p className="empty">Your cart is empty. <Link to="/">Browse products</Link></p>;

  return (
    <>
      <h1>Your cart</h1>
      <div className="cartbox">
        <div>
          {items.map((i) => (
            <div className="line" key={i.id}>
              <img src={i.image} alt={i.title} />
              <div className="grow">
                <Link to={`/product/${i.id}`}>{i.title}</Link>
                <div>${i.price.toFixed(2)}</div>
                <div className="qty">
                  <button onClick={() => changeQty(i.id, -1)} aria-label="Decrease quantity">−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => changeQty(i.id, 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="end">
                <strong>${(i.price * i.qty).toFixed(2)}</strong>
                <button className="link" onClick={() => removeItem(i.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <aside className="sum">
          <h3>Order summary</h3>
          <div className="row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="row"><span>Shipping</span><span>Free</span></div>
          <div className="row tot"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <Link to="/checkout" className="btn lg block">Go to checkout</Link>
        </aside>
      </div>
    </>
  );
}
