import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAPI, strapiMediaURL } from '../lib/strapi';
import useHead from '../hooks/useHead';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

/** Render Strapi v5 "blocks" rich text content */
function BlocksRenderer({ content }) {
  if (!content || !Array.isArray(content)) return null;

  return content.map((block, i) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={i}>{renderChildren(block.children)}</p>;
      case 'heading': {
        const Tag = `h${block.level || 2}`;
        return <Tag key={i}>{renderChildren(block.children)}</Tag>;
      }
      case 'list':
        if (block.format === 'ordered') {
          return <ol key={i}>{block.children.map((li, j) => <li key={j}>{renderChildren(li.children)}</li>)}</ol>;
        }
        return <ul key={i}>{block.children.map((li, j) => <li key={j}>{renderChildren(li.children)}</li>)}</ul>;
      case 'quote':
        return <blockquote key={i}>{renderChildren(block.children)}</blockquote>;
      case 'code':
        return <pre key={i}><code>{renderChildren(block.children)}</code></pre>;
      case 'image':
        return (
          <figure key={i}>
            <img src={strapiMediaURL(block.image?.url)} alt={block.image?.alternativeText || ''} />
          </figure>
        );
      default:
        return null;
    }
  });
}

function renderChildren(children) {
  if (!children) return null;
  return children.map((child, i) => {
    if (child.type === 'text') {
      let text = child.text;
      if (child.bold) text = <strong key={i}>{text}</strong>;
      else if (child.italic) text = <em key={i}>{text}</em>;
      else if (child.code) text = <code key={i}>{text}</code>;
      else if (child.strikethrough) text = <s key={i}>{text}</s>;
      else text = <span key={i}>{text}</span>;
      return text;
    }
    if (child.type === 'link') {
      return <a key={i} href={child.url} target="_blank" rel="noopener noreferrer">{renderChildren(child.children)}</a>;
    }
    return null;
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchAPI(`/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`)
      .then((data) => {
        if (data && data.length > 0) {
          setPost(data[0]);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const cover = post?.coverImage?.url;
  const category = post?.category?.name;

  useHead({
    title: post ? post.title : 'Loading…',
    description: post ? (post.excerpt || `${post.title} — Legible Blog`) : '',
    image: cover ? strapiMediaURL(cover) : undefined,
    url: `/blog/${slug}`,
  });

  if (loading) return <div className="blog-page"><div className="blog-loading">Loading…</div></div>;
  if (notFound) return (
    <div className="blog-page">
      <div className="blog-empty">
        <h2>Post not found</h2>
        <Link to="/blog" className="btn-ghost">← Back to blog</Link>
      </div>
    </div>
  );

  return (
    <div className="blog-page">
      <article className="blog-article">
        <Link to="/blog" className="blog-back">← Back to blog</Link>

        <header className="blog-article-header">
          {category && <span className="blog-card-category">{category}</span>}
          <h1 className="blog-article-title">{post.title}</h1>
          <div className="blog-article-meta">
            {post.author && <span>{post.author}</span>}
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </header>

        {cover && (
          <div className="blog-article-cover">
            <img src={strapiMediaURL(cover)} alt={post.title} />
          </div>
        )}

        <div className="blog-article-content">
          <BlocksRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
}
