const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || '';

/**
 * Fetch from the Strapi REST API.
 * @param {string} path  – e.g. "/hero?populate=*"
 * @returns {Promise<any>} – the `data` property from Strapi's response
 */
export async function fetchAPI(path) {
  const res = await fetch(`${STRAPI_URL}/api${path}`);
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

/**
 * Build a full URL for a Strapi media/upload asset.
 */
export function strapiMediaURL(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${STRAPI_URL}${path}`;
}
