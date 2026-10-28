import { Link, NavLink } from "react-router-dom";
import { useCart } from "../CartContext.jsx";

export default function Navbar() {
  const { count } = useCart();
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link to="/" className="logo">ShopVerse</Link>
        <nav>
          <NavLink to="/">Shop</NavLink>
          <NavLink to="/cart" className="cartlink">Cart <span className="badge">{count}</span></NavLink>
        </nav>
      </div>
    </header>
  );
}
