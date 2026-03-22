import useHead from '../hooks/useHead';

export default function Contact() {
  useHead({
    title: 'Contact Us',
    description: 'Get in touch with the Legible team. We\'d love to hear from you.',
    url: '/contact',
  });

  return (
    <div className="legal-page">
      <h1 className="legal-page-title" data-reveal>Contact Us</h1>
      <p className="legal-effective" data-reveal>We'd love to hear from you.</p>

      <section data-reveal>
        <h2>Get in Touch</h2>
        <p>
          Whether you have a question about features, pricing, on-premise deployment, or anything else — our team is ready to help.
        </p>
        <p>
          Email us at <a href="mailto:hello@legiblequery.ai">hello@legiblequery.ai</a>
        </p>
      </section>

      <section data-reveal>
        <h2>Enterprise &amp; On-Premise</h2>
        <p>
          For enterprise deployments, on-premise architecture reviews, and dedicated onboarding, reach out to our enterprise team:
        </p>
        <p>
          <a href="mailto:enterprise@legiblequery.ai">enterprise@legiblequery.ai</a>
        </p>
      </section>

      <section data-reveal>
        <h2>Open Source</h2>
        <p>
          Legible is fully open source. Report bugs, request features, or contribute on GitHub:
        </p>
        <p>
          <a href="https://github.com/kubeworkz/legible" target="_blank" rel="noopener noreferrer">github.com/kubeworkz/legible</a>
        </p>
      </section>
    </div>
  );
}
