import { useEffect, useState } from 'react';

export default function Navbar({ onCTAClick }) {
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
        Legible
      </a>
      <ul className="nav-links">
        {[['#how', 'How it works'], ['#features', 'Features'], ['#pricing', 'Pricing'], ['#proof', 'Customers']].map(([href, label]) => (
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
        Start free →
      </button>
    </nav>
  );
}
