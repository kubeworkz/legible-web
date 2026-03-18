import { useEffect, useState } from 'react';

const DEFAULT_LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#proof' },
];

export default function Navbar({ onCTAClick, cms }) {
  const logoText = cms?.logoText ?? 'Legible';
  const links = cms?.links ?? DEFAULT_LINKS;
  const ctaLabel = cms?.ctaLabel ?? 'Start free →';

  const [active, setActive] = useState('');

  useEffect(() => {
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
  }, []);

  return (
    <nav>
      <a className="nav-logo" href="#">
        <span className="nav-logo-dot"></span>
        {logoText}
      </a>
      <ul className="nav-links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              style={{ color: active === href.slice(1) ? 'var(--teal)' : '' }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => onCTAClick('nav')}>
        {ctaLabel}
      </button>
    </nav>
  );
}
