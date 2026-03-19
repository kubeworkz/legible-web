import { useReveal } from '../hooks/useReveal';

const DEFAULT_STEPS = [
  { num: '01', icon: '🔌', title: 'Connect your database', body: 'Add an MCP connection to any of our supported databases. Legible queries in place — your data never moves.' },
  { num: '02', icon: '💬', title: 'Ask in plain English', body: 'Type any business question. Legible understands your schema, relationships, and context to generate accurate SQL — automatically.' },
  { num: '03', icon: '✓', title: 'Get verified answers', body: 'See the generated SQL alongside the results. Every query is validated before execution. Full transparency, always.' },
];

function toSteps(cmsSteps) {
  if (!cmsSteps?.length) return DEFAULT_STEPS;
  return cmsSteps
    .sort((a, b) => a.stepNumber - b.stepNumber)
    .map((s, i) => ({
      num: String(s.stepNumber).padStart(2, '0'),
      icon: s.icon,
      title: s.title,
      body: s.description,
    }));
}

export default function HowItWorks({ cms }) {
  const ref = useReveal();
  const steps = toSteps(cms);

  return (
    <section id="how">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
        <p className="section-eyebrow" data-reveal>How it works</p>
        <h2 className="section-title" data-reveal>From question<br />to answer in seconds.</h2>
        <p className="section-sub" data-reveal>No data engineering degree required. No waiting for a ticket response. Just answers.</p>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
        <div className="steps-grid" data-reveal ref={ref}>
          {steps.map(({ num, icon, title, body }) => (
            <div className="step" key={num}>
              <div className="step-num">{num}</div>
              <div className="step-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
