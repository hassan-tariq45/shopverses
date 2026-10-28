export function Loader() { return <p className="empty">Loading products…</p>; }
export function ErrorBox({ retry }) {
  return (
    <p className="empty">
      Could not load products. Check your connection. <button className="btn" onClick={retry}>Try again</button>
    </p>
  );
}
