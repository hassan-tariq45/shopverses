import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch.js";
import { useCart } from "../CartContext.jsx";
import { Loader, ErrorBox } from "../components/Loader.jsx";

export default function Home() {
  const { data, loading, error, retry } = useFetch("https://fakestoreapi.com/products");
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const categories = useMemo(() => ["all", ...new Set((data || []).map((p) => p.category))], [data]);

  const list = useMemo(() => {
    let r = (data || []).filter(
      (p) => (category === "all" || p.category === category) && p.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [data, search, category, sort]);

  if (loading) return <Loader />;
  if (error) return <ErrorBox retry={retry} />;

  return (
    <>
      <section className="hero">
        <h1>Everyday things, well chosen.</h1>
        <p>Clothing, jewellery and electronics in one place. Add what you like and check out in seconds.</p>
      </section>

      <div className="tools">
        <input placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      {list.length === 0 ? (
        <p className="empty">No products match your search. Try a different word or category.</p>
      ) : (
        <div className="grid">
          {list.map((p) => (
            <article className="card" key={p.id}>
              <Link to={`/product/${p.id}`} className="imgbox"><img src={p.image} alt={p.title} loading="lazy" /></Link>
              <div className="cbody">
                <small>{p.category}</small>
                <h3><Link to={`/product/${p.id}`}>{p.title}</Link></h3>
                <div className="row">
                  <strong>${p.price.toFixed(2)}</strong>
                  <button className="btn" onClick={() => addToCart(p)}>Add to cart</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
