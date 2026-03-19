const DEFAULT_LINKS = [
  { label: 'Product', href: '#' },
  { label: 'Docs', href: 'https://docs.legiblequery.ai' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export default function Footer({ cms }) {
  const logoText = cms?.logoText ?? 'Legible';
  const links = cms?.links ?? DEFAULT_LINKS;
  const copyright = cms?.copyright ?? '© 2026 Legible Inc. All rights reserved.';

  return (
    <footer>
      <div className="footer-logo">{logoText}</div>
      <div className="footer-links">
        {links.map((l) => {
          const label = typeof l === 'string' ? l : l.label;
          const href = typeof l === 'string' ? '#' : (l.href ?? '#');
          return <a href={href} key={label}>{label}</a>;
        })}
      </div>
      <div className="footer-copy">{copyright}</div>
    </footer>
  );
}
