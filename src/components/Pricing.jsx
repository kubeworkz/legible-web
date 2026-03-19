const DEFAULT_PLANS = [
  {
    tier: 'Fully Open Source', price: 'Free', priceSub: '',
    desc: 'For individuals, teams and enterprises getting familiar with Legible. Stay tuned for our self-hosted LLM offering coming soon.',
    features: ['All database connections', 'All features', 'Full audit trail', 'SSO + RBAC', 'Community support'],
    cta: 'Get started free', ctaType: 'free', ctaStyle: 'outline', featured: false, ctaLink: 'https://github.com/kubeworkz/legible',
  },
  {
    tier: 'Legible Cloud', price: '$0.02', priceSub: ' / query',
    descHighlight: '25 FREE queries per month.',
    desc: 'For growing data teams who need reliability and support without the overhead of managing infrastructure',
    features: ['Unlimited queries', 'All database connections', 'Multi-source queries', 'All features'],
    cta: 'Start free', ctaType: 'free', ctaStyle: 'solid', featured: true, badge: 'Most popular',
  },
];

function toPlans(cmsPlans) {
  if (!cmsPlans?.length) return DEFAULT_PLANS;
  return cmsPlans
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((p) => ({
      tier: p.name,
      price: p.price,
      priceSub: p.priceLabel ? ` ${p.priceLabel}` : '',
      desc: p.description,
      features: Array.isArray(p.features) ? p.features : [],
      cta: p.ctaLabel,
      ctaType: p.ctaType ?? 'free',
      ctaStyle: p.featured ? 'solid' : 'outline',
      featured: !!p.featured,
      badge: p.featuredLabel || null,
    }));
}

export default function Pricing({ onCTAClick, cms }) {
  const plans = toPlans(cms);

  return (
    <section id="pricing">
      <div className="pricing-header">
        <p className="section-eyebrow" data-reveal>Pricing</p>
        <h2 className="section-title" data-reveal>Usage-based. No surprises.</h2>
        <p className="section-sub" data-reveal>Pay for queries, not seats. Start free, scale without renegotiating.</p>
      </div>
      <div className="pricing-grid" data-reveal>
        {plans.map((plan) => (
          <div className={`pricing-card${plan.featured ? ' featured' : ''}`} key={plan.tier}>
            {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
            <div className="pricing-tier">{plan.tier}</div>
            <div className="pricing-price">
              {plan.price}
              {plan.priceSub && <sub>{plan.priceSub}</sub>}
            </div>
            <p className="pricing-desc">{plan.descHighlight && <><strong>{plan.descHighlight}</strong>{' '}</>}{plan.desc}</p>
            <ul className="pricing-features">
              {plan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            {plan.ctaLink ? (
              <a
                className={`pricing-cta ${plan.ctaStyle}`}
                href={plan.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.cta}
              </a>
            ) : (
              <button
                className={`pricing-cta ${plan.ctaStyle}`}
                onClick={() => onCTAClick(plan.ctaType === 'demo' ? 'demo' : 'free', plan.tier)}
              >
                {plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
