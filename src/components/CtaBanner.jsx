export default function CtaBanner({ onCTAClick, cms }) {
  const headline = cms?.headline ?? 'Stop guessing. Start asking.';
  const highlight = cms?.headlineHighlight ?? 'Start asking.';
  const subtitle = cms?.subtitle ?? 'Connect your first database in minutes. Your data has answers — Legible helps you find them.';
  const primaryCta = cms?.primaryCtaLabel ?? 'Start for free';
  const secondaryCta = cms?.secondaryCtaLabel ?? 'Book a demo';

  // Split headline around the highlighted portion
  const hlIdx = headline.indexOf(highlight);
  const before = hlIdx >= 0 ? headline.slice(0, hlIdx) : headline;
  const after = hlIdx >= 0 ? headline.slice(hlIdx + highlight.length) : '';

  return (
    <section id="cta">
      <h2 className="cta-title" data-reveal>
        {before}{before && <br />}
        {hlIdx >= 0 && <span style={{ color: 'var(--teal)' }}>{highlight}</span>}
        {after}
      </h2>
      <p className="cta-sub" data-reveal>{subtitle}</p>
      <div className="cta-actions" data-reveal>
        <button className="btn-primary" onClick={() => onCTAClick('free')}>
          {primaryCta}
        </button>
        <button className="btn-ghost" onClick={() => onCTAClick('demo')}>
          {secondaryCta}
        </button>
      </div>
    </section>
  );
}
