import { useState, useEffect } from 'react';
import { fetchAPI } from '../lib/strapi';

/**
 * Generic hook to fetch a Strapi endpoint once on mount.
 * Returns { data, loading, error } with `fallback` used until
 * the fetch resolves (or if it fails).
 *
 * @param {string} path      – Strapi API path, e.g. "/hero?populate=*"
 * @param {any}    fallback  – default data returned while loading / on error
 */
export default function useStrapiData(path, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchAPI(path)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err) => {
        console.warn(`[useStrapiData] ${path}:`, err.message);
        if (!cancelled) setError(err);
        // data stays at fallback
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [path]);

  return { data, loading, error };
}
