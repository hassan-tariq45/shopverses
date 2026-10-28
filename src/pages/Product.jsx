import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch.js";
import { useCart } from "../CartContext.jsx";
import { Loader, ErrorBox } from "../components/Loader.jsx";

export default function Product() {
  const { id } = useParams();
  const { data: p, loading, error, retry } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const { addToCart } = useCart();

  if (loading) return <Loader />;
  if (error || !p) return <ErrorBox retry={retry} />;

  return (
    <>
      <Link to="/" className="back">← Back to shop</Link>
      <div className="detail">
        <div className="imgbox big"><img src={p.image} alt={p.title} /></div>
        <div>
          <small>{p.category}</small>
          <h1>{p.title}</h1>
          <p className="rate">Rated {p.rating?.rate} / 5 by {p.rating?.count} buyers</p>
          <p>{p.description}</p>
          <p className="price">${p.price.toFixed(2)}</p>
          <button className="btn lg" onClick={() => addToCart(p)}>Add to cart</button>
        </div>
      </div>
    </>
  );
}
