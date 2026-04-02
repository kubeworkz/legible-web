import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DEFAULT_LINKS = [
  { label: 'Skills Resources', href: '/skills-resources', isRoute: true },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#proof' },
];

export default function Navbar({ onCTAClick, cms, isBlog }) {
  const logoText = cms?.logoText ?? 'Legible';
  const links = cms?.links ?? DEFAULT_LINKS;
  const ctaLabel = cms?.ctaLabel ?? 'Start free →';

  const location = useLocation();
  const [active, setActive] = useState('');

  useEffect(() => {
    if (isBlog) return;
    const sections = document.querySelectorAll('section[id]');
    const handler = () => {
      let current = '';
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [isBlog]);

  return (
    <nav>
      <Link className="nav-logo" to="/">
        <span className="nav-logo-dot"></span>
        {logoText}
      </Link>
      <ul className="nav-links">
        {!isBlog && links.map(({ href, label, isRoute }) => (
          <li key={href}>
            {isRoute ? (
              <Link
                to={href}
                style={{ color: location.pathname === href ? 'var(--teal)' : '' }}
              >
                {label}
              </Link>
            ) : (
              <a
                href={href}
                style={{ color: active === href.slice(1) ? 'var(--teal)' : '' }}
              >
                {label}
              </a>
            )}
          </li>
        ))}
        <li>
          <Link to="/blog" style={{ color: isBlog ? 'var(--teal)' : '' }}>Blog</Link>
        </li>
        <li>
          <a href="/legible-security.html">On-Premise</a>
        </li>
        <li>
          <a href="https://docs.legiblequery.ai" target="_blank" rel="noopener noreferrer">Docs</a>
        </li>
      </ul>
      <div className="nav-actions">
        <a
          className="nav-download"
          href="/legible-cli/legible"
          download
        >
          Download Legible Cli
        </a>
        <button className="nav-cta" onClick={() => onCTAClick('nav')}>
          {ctaLabel}
        </button>
      </div>
    </nav>
  );
}
