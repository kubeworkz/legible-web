const PLANS = [
  {
    tier: 'Starter',
    price: 'Free',
    priceSub: '',
    desc: 'For individuals and small teams getting started',
    features: ['500 queries / month', '2 database connections', 'Full SQL transparency', 'Query history (30 days)', 'Community support'],
    cta: 'Get started free',
    ctaStyle: 'outline',
    featured: false,
  },
  {
    tier: 'Growth',
    price: '$0.02',
    priceSub: ' / query',
    desc: 'For growing data teams that need more power',
    features: ['Unlimited queries', '10 database connections', 'Multi-source queries', 'Full audit trail', 'Team workspaces', 'Priority support'],
    cta: 'Start free trial',
    ctaStyle: 'solid',
    featured: true,
    badge: 'Most popular',
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    priceSub: '',
    desc: 'For larger teams with advanced security and compliance needs',
    features: ['Volume discounts', 'Unlimited connections', 'SSO + RBAC', 'Custom data retention', 'SLA + dedicated support', 'On-premise option'],
    cta: 'Talk to sales',
    ctaStyle: 'outline',
    featured: false,
  },
];

export default function Pricing({ onCTAClick }) {
  return (
    <section id="pricing">
      <div className="pricing-header">
        <p className="section-eyebrow" data-reveal>Pricing</p>
        <h2 className="section-title" data-reveal>Usage-based. No surprises.</h2>
        <p className="section-sub" data-reveal>Pay for queries, not seats. Start free, scale without renegotiating.</p>
      </div>
      <div className="pricing-grid" data-reveal>
        {PLANS.map((plan) => (
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
              onClick={() => onCTAClick(plan.tier === 'Enterprise' ? 'demo' : 'free', plan.tier)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
