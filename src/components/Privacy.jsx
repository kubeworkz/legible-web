import useHead from '../hooks/useHead';

export default function Privacy() {
  useHead({
    title: 'Privacy Policy',
    description: 'Legible privacy policy — how we collect, use, and protect your data.',
    url: '/privacy',
  });

  return (
    <div className="legal-page">
      <h1 className="legal-page-title" data-reveal>Privacy Policy</h1>
      <p className="legal-effective" data-reveal>Effective date: March 19, 2026</p>

      <section data-reveal>
        <h2>1. Introduction</h2>
        <p>
          Legible Inc. (&quot;Legible,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website at legiblequery.ai and the Legible platform (collectively, the &quot;Service&quot;).
        </p>
      </section>

      <section data-reveal>
        <h2>2. Information We Collect</h2>
        <p><strong>Account information:</strong> When you sign up, we collect your name, email address, and organization details.</p>
        <p><strong>Usage data:</strong> We automatically collect information about how you interact with the Service, including queries executed, features used, and session duration.</p>
        <p><strong>Technical data:</strong> We collect IP addresses, browser type, operating system, and device information for security and analytics purposes.</p>
        <p><strong>Database queries:</strong> Queries you run through Legible are processed in real time. We do not store the contents of your query results.</p>
      </section>

      <section data-reveal>
        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve the Service</li>
          <li>Process transactions and send related information</li>
          <li>Send administrative messages, updates, and security alerts</li>
          <li>Respond to your comments, questions, and support requests</li>
          <li>Monitor and analyze usage trends to improve user experience</li>
          <li>Detect, prevent, and address technical issues and fraud</li>
        </ul>
      </section>

      <section data-reveal>
        <h2>4. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share data with trusted third-party service providers who assist us in operating the Service (e.g., hosting, analytics), subject to confidentiality obligations. We may also disclose information if required by law or to protect our rights.
        </p>
      </section>

      <section data-reveal>
        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure.
        </p>
      </section>

      <section data-reveal>
        <h2>6. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, or as required by law. You may request deletion of your account and associated data at any time.
        </p>
      </section>

      <section data-reveal>
        <h2>7. Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. To exercise these rights, contact us at <a href="mailto:privacy@legiblequery.ai">privacy@legiblequery.ai</a>.
        </p>
      </section>

      <section data-reveal>
        <h2>8. Cookies</h2>
        <p>
          We use essential cookies to operate the Service and optional analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings.
        </p>
      </section>

      <section data-reveal>
        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised effective date.
        </p>
      </section>

      <section data-reveal>
        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at <a href="mailto:privacy@legiblequery.ai">privacy@legiblequery.ai</a>.
        </p>
      </section>
    </div>
  );
}
