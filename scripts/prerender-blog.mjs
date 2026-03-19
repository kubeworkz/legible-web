/**
 * Post-build prerender script for blog SEO.
 *
 * Reads dist/index.html as a template, fetches blog posts from Strapi,
 * and generates static HTML files with proper <title>, meta/OG tags,
 * and visible content for each blog route.
 *
 * Usage: node scripts/prerender-blog.mjs
 */

const STRAPI_URL = process.env.VITE_STRAPI_URL || 'https://legiblequery.ai';
const STRAPI_INTERNAL = process.env.STRAPI_INTERNAL_URL || 'http://127.0.0.1:1337';
const SITE_URL = 'https://legiblequery.ai';
const DIST = new URL('../dist', import.meta.url).pathname;

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// ── Helpers ──

function strapiMediaURL(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${STRAPI_URL}${path}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

/** Convert Strapi v5 blocks to plain HTML */
function blocksToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${childrenToHtml(block.children)}</p>`;
      case 'heading': {
        const tag = `h${block.level || 2}`;
        return `<${tag}>${childrenToHtml(block.children)}</${tag}>`;
      }
      case 'list': {
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = (block.children || []).map(li =>
          `<li>${childrenToHtml(li.children)}</li>`
        ).join('');
        return `<${tag}>${items}</${tag}>`;
      }
      case 'quote':
        return `<blockquote>${childrenToHtml(block.children)}</blockquote>`;
      case 'code':
        return `<pre><code>${childrenToHtml(block.children)}</code></pre>`;
      case 'image':
        return `<figure><img src="${escapeHtml(strapiMediaURL(block.image?.url))}" alt="${escapeHtml(block.image?.alternativeText || '')}" /></figure>`;
      default:
        return '';
    }
  }).join('\n');
}

function childrenToHtml(children) {
  if (!children) return '';
  return children.map(child => {
    if (child.type === 'text') {
      let text = escapeHtml(child.text);
      if (child.bold) text = `<strong>${text}</strong>`;
      else if (child.italic) text = `<em>${text}</em>`;
      else if (child.code) text = `<code>${text}</code>`;
      else if (child.strikethrough) text = `<s>${text}</s>`;
      return text;
    }
    if (child.type === 'link') {
      return `<a href="${escapeHtml(child.url)}">${childrenToHtml(child.children)}</a>`;
    }
    return '';
  }).join('');
}

/** Inject meta tags and content into the index.html template */
function renderPage(template, { title, description, image, url, bodyHtml }) {
  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)} | Legible</title>`
  );

  // Build meta tags to inject before </head>
  const metas = [];
  if (description) {
    metas.push(`<meta name="description" content="${escapeHtml(description)}" />`);
  }
  metas.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
  if (description) metas.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
  if (image) metas.push(`<meta property="og:image" content="${escapeHtml(image)}" />`);
  metas.push(`<meta property="og:url" content="${escapeHtml(SITE_URL + url)}" />`);
  metas.push(`<meta property="og:type" content="article" />`);
  metas.push(`<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`);
  metas.push(`<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  if (description) metas.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  if (image) metas.push(`<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  metas.push(`<link rel="canonical" href="${escapeHtml(SITE_URL + url)}" />`);

  html = html.replace('</head>', `    ${metas.join('\n    ')}\n  </head>`);

  // Inject server-rendered content inside #root (React will replace it on hydration)
  if (bodyHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${bodyHtml}</div>`
    );
  }

  return html;
}

// ── Main ──

async function main() {
  const template = readFileSync(join(DIST, 'index.html'), 'utf-8');
  console.log('📄 Loaded dist/index.html template');

  // Fetch all published blog posts
  let posts = [];
  try {
    const url = new URL(`${STRAPI_INTERNAL}/api/blog-posts`);
    url.searchParams.set('populate', '*');
    url.searchParams.set('sort', 'publishedAt:desc');
    url.searchParams.set('pagination[pageSize]', '100');
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Strapi ${res.status}`);
    const json = await res.json();
    posts = json.data || [];
  } catch (err) {
    console.error('⚠️  Could not fetch blog posts from Strapi:', err.message);
    console.log('   Skipping prerender (blog pages will still work client-side)');
    return;
  }

  console.log(`📝 Found ${posts.length} blog post(s)`);

  // 1. Prerender /blog (listing page)
  const blogListBody = posts.length === 0
    ? '<p>No posts yet.</p>'
    : posts.map(p => {
      const cover = p.coverImage?.url;
      return `<article>
        ${cover ? `<img src="${escapeHtml(strapiMediaURL(cover))}" alt="${escapeHtml(p.title)}" />` : ''}
        <h2><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a></h2>
        ${p.excerpt ? `<p>${escapeHtml(p.excerpt)}</p>` : ''}
        ${p.author ? `<span>${escapeHtml(p.author)}</span>` : ''}
        <time>${formatDate(p.publishedAt)}</time>
      </article>`;
    }).join('\n');

  const blogDir = join(DIST, 'blog');
  mkdirSync(blogDir, { recursive: true });

  writeFileSync(
    join(blogDir, 'index.html'),
    renderPage(template, {
      title: 'Blog',
      description: 'Thoughts on data, AI, and building tools for teams that value accuracy.',
      url: '/blog',
      bodyHtml: blogListBody,
    })
  );
  console.log('  ✓ /blog/index.html');

  // 2. Prerender each /blog/:slug
  // Fetch full content for each post individually (listing may not include full content)
  for (const post of posts) {
    let fullPost = post;
    try {
      const u = new URL(`${STRAPI_INTERNAL}/api/blog-posts`);
      u.searchParams.set('filters[slug][$eq]', post.slug);
      u.searchParams.set('populate', '*');
      const res = await fetch(u);
      if (res.ok) {
        const json = await res.json();
        if (json.data?.[0]) fullPost = json.data[0];
      }
    } catch {}

    const cover = fullPost.coverImage?.url;
    const coverUrl = cover ? strapiMediaURL(cover) : undefined;

    const articleBody = `
      <article>
        <h1>${escapeHtml(fullPost.title)}</h1>
        <div>
          ${fullPost.author ? `<span>${escapeHtml(fullPost.author)}</span>` : ''}
          <time>${formatDate(fullPost.publishedAt)}</time>
        </div>
        ${coverUrl ? `<img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(fullPost.title)}" />` : ''}
        <div>${blocksToHtml(fullPost.content)}</div>
      </article>`;

    const slugDir = join(blogDir, post.slug);
    mkdirSync(slugDir, { recursive: true });

    writeFileSync(
      join(slugDir, 'index.html'),
      renderPage(template, {
        title: fullPost.title,
        description: fullPost.excerpt || `${fullPost.title} — Legible Blog`,
        image: coverUrl,
        url: `/blog/${post.slug}`,
        bodyHtml: articleBody,
      })
    );
    console.log(`  ✓ /blog/${post.slug}/index.html`);
  }

  console.log(`\n✅ Prerendered ${posts.length + 1} blog page(s)`);
}

main().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
