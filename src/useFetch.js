import { useEffect, useState, useCallback } from "react";

// Small custom hook: fetches JSON and tracks loading/error state.
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let live = true;
    setLoading(true); setError(false);
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => live && setData(d))
      .catch(() => live && setError(true))
      .finally(() => live && setLoading(false));
    return () => { live = false; };
  }, [url, tick]);

  const retry = useCallback(() => setTick((t) => t + 1), []);
  return { data, loading, error, retry };
}
