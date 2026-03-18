const DEFAULT_FEATURES = [
  { icon: '🔍', title: 'Full SQL Transparency', body: 'Every answer comes with the exact SQL query that produced it. No black boxes. Verify, edit, or export any query.' },
  { icon: '🎯', title: 'Schema-Aware Queries', body: 'Legible learns your table structure, relationships, and naming conventions — so queries match your actual data model.' },
  { icon: '🛡️', title: 'Data Stays in Place', body: 'Your data never leaves your infrastructure. Legible connects and queries directly — no copies, no warehousing required.' },
  { icon: '⚡', title: 'Multi-Source Queries', body: 'Connect multiple databases and query across them. Combine your MySQL and PostgreSQL data in a single natural language question.' },
  { icon: '📋', title: 'Audit Trail', body: 'Every query is logged with who asked, what SQL was generated, and what was returned. Built-in compliance from day one.' },
  { icon: '💳', title: 'Usage-Based Pricing', body: 'Pay for what you use. No seat licenses, no enterprise negotiations. Scales from a 2-person data team to hundreds of users.' },
];

function toFeatures(cmsFeatures) {
  if (!cmsFeatures) return DEFAULT_FEATURES;
  return cmsFeatures
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((f) => ({ icon: f.icon, title: f.title, body: f.description }));
}

export default function Features({ cms }) {
  const features = toFeatures(cms);

  return (
    <section id="features">
      <div className="features-inner">
        <div className="features-header">
          <div>
            <p className="section-eyebrow" data-reveal>Why Legible</p>
            <h2 className="section-title" data-reveal>Built for teams that<br />can't afford to be wrong.</h2>
          </div>
          <div>
            <p style={{ fontSize: '16px', fontWeight: 300, color: 'var(--white-dim)', lineHeight: 1.7 }} data-reveal>
              Most AI tools optimize for speed at the cost of accuracy. Legible doesn't make that tradeoff. Every feature is designed around the principle that wrong data is worse than slow data.
            </p>
          </div>
        </div>
        <div className="features-grid">
          {features.map(({ icon, title, body }) => (
            <div className="feature-card" data-reveal key={title}>
              <span className="feature-icon">{icon}</span>
              <h4>{title}</h4>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
