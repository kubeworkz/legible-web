const DEFAULT_TESTIMONIALS = [
  { initials: 'SR', name: 'Sarah R.', role: 'Head of Analytics · Series B SaaS', quote: 'We used to spend half our sprint responding to ad-hoc data requests. Legible cut that to near zero. Our stakeholders now answer their own questions before they even reach us.' },
  { initials: 'MK', name: 'Marcus K.', role: 'VP Engineering · FinTech startup', quote: 'The SQL transparency is the killer feature for us. We can\'t ship answers to the board that we can\'t verify. Legible shows its work. That\'s non-negotiable in our environment.' },
  { initials: 'JL', name: 'Jordan L.', role: 'Data Engineer · eCommerce scale-up', quote: 'We connected our ClickHouse cluster in under 10 minutes and our marketing team was self-serving campaign data the same afternoon. That would have taken weeks with our old setup.' },
];

function getInitials(name) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

function toTestimonials(cmsItems) {
  if (!cmsItems) return DEFAULT_TESTIMONIALS;
  return cmsItems
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((t) => ({
      initials: getInitials(t.authorName),
      name: t.authorName,
      role: `${t.authorRole} · ${t.authorCompany}`,
      quote: t.quote,
    }));
}

export default function Proof({ cms }) {
  const testimonials = toTestimonials(cms);

  return (
    <section id="proof">
      <div className="proof-inner">
        <p className="section-eyebrow" data-reveal>Customer stories</p>
        <h2 className="section-title" data-reveal>Data teams that trust<br />every answer.</h2>
        <div className="testimonials">
          {testimonials.map(({ initials, name, role, quote }) => (
            <div className="testimonial" data-reveal key={name}>
              <p className="testimonial-quote">{quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{initials}</div>
                <div>
                  <div className="author-name">{name}</div>
                  <div className="author-title">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
