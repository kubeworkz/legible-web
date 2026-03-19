import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI, strapiMediaURL } from '../lib/strapi';
import useHead from '../hooks/useHead';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useHead({
    title: 'Blog',
    description: 'Thoughts on data, AI, and building tools for teams that value accuracy.',
    url: '/blog',
  });

  const pageRef = useRef(null);

  useEffect(() => {
    fetchAPI('/blog-posts?populate=*&sort=publishedAt:desc')
      .then((data) => setPosts(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Reveal elements after render (including dynamically loaded cards)
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.05}s`;
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    root.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  return (
    <div className="blog-page" ref={pageRef}>
      <div className="blog-header">
        <p className="section-eyebrow" data-reveal>Blog</p>
        <h1 className="blog-page-title" data-reveal>Insights & Updates</h1>
        <p className="section-sub" data-reveal>
          Thoughts on data, AI, and building tools for teams that value accuracy.
        </p>
      </div>

      {loading ? (
        <div className="blog-loading">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="blog-empty">
          <p>No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => {
            const cover = post.coverImage?.url;
            const category = post.category?.name;
            return (
              <Link to={`/blog/${post.slug}`} className="blog-card" key={post.documentId || post.id} data-reveal>
                {cover && (
                  <div className="blog-card-image">
                    <img src={strapiMediaURL(cover)} alt={post.title} loading="lazy" />
                  </div>
                )}
                <div className="blog-card-body">
                  {category && <span className="blog-card-category">{category}</span>}
                  <h2 className="blog-card-title">{post.title}</h2>
                  {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                  <div className="blog-card-meta">
                    {post.author && <span>{post.author}</span>}
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
