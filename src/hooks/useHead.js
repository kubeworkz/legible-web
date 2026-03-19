import { useEffect } from 'react';

const DEFAULT_TITLE = 'Legible — Your data. Plain language. Accurate answers.';
const SITE_URL = 'https://legiblequery.ai';

/**
 * Set document <title>, meta description, and Open Graph tags.
 * Restores defaults on unmount.
 */
export default function useHead({ title, description, image, url } = {}) {
  useEffect(() => {
    const prev = document.title;

    if (title) document.title = `${title} | Legible`;

    setMeta('description', description);
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:image', image);
    setMeta('og:url', url ? `${SITE_URL}${url}` : undefined);
    setMeta('og:type', 'article');
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    return () => {
      document.title = prev;
      removeMeta('description');
      removeMeta('og:title');
      removeMeta('og:description');
      removeMeta('og:image');
      removeMeta('og:url');
      removeMeta('og:type');
      removeMeta('twitter:card');
      removeMeta('twitter:title');
      removeMeta('twitter:description');
      removeMeta('twitter:image');
    };
  }, [title, description, image, url]);
}

function setMeta(name, content) {
  if (!content) return;
  const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(name) {
  const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name';
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.remove();
}
