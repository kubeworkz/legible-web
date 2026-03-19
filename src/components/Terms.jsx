import useHead from '../hooks/useHead';

export default function Terms() {
  useHead({
    title: 'Terms of Service',
    description: 'Legible terms of service — the agreement governing your use of the Legible platform.',
    url: '/terms',
  });

  return (
    <div className="legal-page">
      <h1 className="legal-page-title" data-reveal>Terms of Service</h1>
      <p className="legal-effective" data-reveal>Effective date: March 19, 2026</p>

      <section data-reveal>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Legible platform and website at legiblequery.ai (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use the Service.
        </p>
      </section>

      <section data-reveal>
        <h2>2. Description of Service</h2>
        <p>
          Legible provides a natural-language interface for querying databases. The Service translates plain-language questions into database queries and returns results from your connected data sources.
        </p>
      </section>

      <section data-reveal>
        <h2>3. Account Registration</h2>
        <p>
          You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account.
        </p>
      </section>

      <section data-reveal>
        <h2>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
          <li>Attempt to gain unauthorized access to any part of the Service or its related systems</li>
          <li>Interfere with or disrupt the integrity or performance of the Service</li>
          <li>Reverse-engineer, decompile, or disassemble any part of the Service (except the open-source components)</li>
          <li>Use the Service to transmit any malicious code or harmful content</li>
        </ul>
      </section>

      <section data-reveal>
        <h2>5. Your Data</h2>
        <p>
          You retain all rights to the data you connect to Legible. We do not claim ownership of your data. Legible processes queries in real time and does not persistently store your query results. See our <a href="/privacy">Privacy Policy</a> for details on data handling.
        </p>
      </section>

      <section data-reveal>
        <h2>6. Pricing and Payment</h2>
        <p>
          The open-source version of Legible is free. Legible Cloud is billed on a per-query basis as described on our <a href="/#pricing">Pricing page</a>. We reserve the right to change pricing with 30 days&apos; notice. You are responsible for all charges incurred under your account.
        </p>
      </section>

      <section data-reveal>
        <h2>7. Intellectual Property</h2>
        <p>
          The Legible name, logo, and proprietary cloud platform are owned by Legible Inc. The open-source components of Legible are licensed under their respective open-source licenses. These Terms do not grant you any rights to use Legible trademarks without prior written consent.
        </p>
      </section>

      <section data-reveal>
        <h2>8. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
      </section>

      <section data-reveal>
        <h2>9. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEGIBLE INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUE, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING FROM YOUR USE OF THE SERVICE.
        </p>
      </section>

      <section data-reveal>
        <h2>10. Termination</h2>
        <p>
          We may suspend or terminate your access to the Service at any time for violation of these Terms or for any other reason at our sole discretion, with or without notice.
        </p>
      </section>

      <section data-reveal>
        <h2>11. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. We will notify you of material changes by posting the revised Terms on this page. Continued use of the Service after changes constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section data-reveal>
        <h2>12. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
        </p>
      </section>

      <section data-reveal>
        <h2>13. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at <a href="mailto:legal@legiblequery.ai">legal@legiblequery.ai</a>.
        </p>
      </section>
    </div>
  );
}
