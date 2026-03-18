const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || '';

// ── In-memory cache with TTL ──
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts < CACHE_TTL) return entry;
  return { ...entry, stale: true };
}

function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

/**
 * Fetch from the Strapi REST API with caching.
 * Returns cached data immediately if fresh; revalidates in background if stale.
 * @param {string} path  – e.g. "/hero?populate=*"
 * @returns {Promise<any>} – the `data` property from Strapi's response
 */
export async function fetchAPI(path) {
  const cached = getCached(path);

  // Fresh cache — return immediately
  if (cached && !cached.stale) return cached.data;

  const request = fetch(`${STRAPI_URL}/api${path}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .then((json) => {
      setCache(path, json.data);
      return json.data;
    });

  // Stale cache — return stale data, revalidate in background
  if (cached?.stale) {
    request.catch(() => {}); // swallow background revalidation errors
    return cached.data;
  }

  // No cache — await the request
  return request;
}

/**
 * Build a full URL for a Strapi media/upload asset.
 */
export function strapiMediaURL(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${STRAPI_URL}${path}`;
}
