const NEW_FEATURES = [
  {
    icon: '🐚',
    badge: 'NVIDIA',
    title: 'NVIDIA Openshell',
    body: 'Seamlessly integrate NVIDIA accelerated compute directly into your query pipeline. Openshell unlocks GPU-powered inference for complex analytical workloads — turning minutes into milliseconds.',
    highlights: ['GPU-accelerated queries', 'Native CUDA integration', 'Real-time inference'],
  },
  {
    icon: '🦞',
    badge: 'NEW',
    title: 'Nemoclaw',
    body: 'Intelligent query decomposition powered by NVIDIA NeMo. Nemoclaw breaks down complex multi-step questions into optimized sub-queries, then reassembles results with surgical precision.',
    highlights: ['Multi-step reasoning', 'Query decomposition', 'Automatic optimization'],
  },
  {
    icon: '📐',
    badge: 'NEW',
    title: 'Blueprint Management',
    body: 'Define, version, and share reusable query blueprints across your organization. Codify your team\'s best practices into templates that anyone can invoke with natural language.',
    highlights: ['Version-controlled templates', 'Team sharing', 'Natural language invocation'],
    link: { href: 'https://build.nvidia.com/blueprints', label: 'Explore NVIDIA Blueprints →' },
  },
];

export default function NewFeatures() {
  return (
    <section id="new-features">
      <div className="nf-inner">
        <div className="nf-header" data-reveal>
          <p className="section-eyebrow">What&rsquo;s New</p>
          <h2 className="section-title">
            Three powerful additions.<br />One smarter platform.
          </h2>
          <p className="nf-sub">
            The latest Legible release brings GPU-accelerated intelligence, advanced query decomposition, and enterprise-grade template management.
          </p>
        </div>

        <div className="nf-grid">
          {NEW_FEATURES.map(({ icon, badge, title, body, highlights, link }) => (
            <div className="nf-card" data-reveal key={title}>
              <div className="nf-card-top">
                <span className="nf-icon">{icon}</span>
                <span className="nf-badge">{badge}</span>
              </div>
              <h3>{title}</h3>
              <p className="nf-body">{body}</p>
              <ul className="nf-highlights">
                {highlights.map((h) => (
                  <li key={h}>
                    <span className="nf-check">✓</span> {h}
                  </li>
                ))}
              </ul>
              {link && (
                <a className="nf-link" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
