const LINKS = ['Product', 'Docs', 'Pricing', 'Blog', 'Careers', 'Privacy'];

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">Legible</div>
      <div className="footer-links">
        {LINKS.map((l) => (
          <a href="#" key={l}>{l}</a>
        ))}
      </div>
      <div className="footer-copy">© 2026 Legible Inc. All rights reserved.</div>
    </footer>
  );
}
