const DEFAULT_PLANS = [
  {
    tier: 'Starter', price: 'Free', priceSub: '',
    desc: 'For individuals and small teams getting started',
    features: ['500 queries / month', '2 database connections', 'Full SQL transparency', 'Query history (30 days)', 'Community support'],
    cta: 'Get started free', ctaType: 'free', ctaStyle: 'outline', featured: false,
  },
  {
    tier: 'Growth', price: '$0.02', priceSub: ' / query',
    desc: 'For growing data teams that need more power',
    features: ['Unlimited queries', '10 database connections', 'Multi-source queries', 'Full audit trail', 'Team workspaces', 'Priority support'],
    cta: 'Start free trial', ctaType: 'free', ctaStyle: 'solid', featured: true, badge: 'Most popular',
  },
  {
    tier: 'Enterprise', price: 'Custom', priceSub: '',
    desc: 'For larger teams with advanced security and compliance needs',
    features: ['Volume discounts', 'Unlimited connections', 'SSO + RBAC', 'Custom data retention', 'SLA + dedicated support', 'On-premise option'],
    cta: 'Talk to sales', ctaType: 'demo', ctaStyle: 'outline', featured: false,
  },
];

function toPlans(cmsPlans) {
  if (!cmsPlans) return DEFAULT_PLANS;
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
            <p className="pricing-desc">{plan.desc}</p>
            <ul className="pricing-features">
              {plan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <button
              className={`pricing-cta ${plan.ctaStyle}`}
              onClick={() => onCTAClick(plan.ctaType === 'demo' ? 'demo' : 'free', plan.tier)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
