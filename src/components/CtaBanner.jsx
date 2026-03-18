export default function CtaBanner({ onCTAClick }) {
  return (
    <section id="cta">
      <h2 className="cta-title" data-reveal>
        Stop guessing.<br />
        <span style={{ color: 'var(--teal)' }}>Start asking.</span>
      </h2>
      <p className="cta-sub" data-reveal>
        Connect your first database in minutes. Your data has answers — Legible helps you find them.
      </p>
      <div className="cta-actions" data-reveal>
        <button className="btn-primary" onClick={() => onCTAClick('free')}>
          Start for free
        </button>
        <button className="btn-ghost" onClick={() => onCTAClick('demo')}>
          Book a demo
        </button>
      </div>
    </section>
  );
}
