import { useState, useEffect, useRef } from 'react';

/**
 * WaitlistModal
 *
 * mode: 'free' | 'demo'
 *
 * "free"  → email capture for early access / free-tier signup
 * "demo"  → name + email + company + message for sales/demo booking
 *
 * On submit the form POSTs to a serverless-friendly endpoint via fetch.
 * Replace SUBMIT_URL with your own (Formspree, EmailJS, your own API, etc.)
 * Out of the box it uses https://formspree.io — just swap in your form ID.
 */

const SUBMIT_URL = 'https://formspree.io/f/YOUR_FORM_ID'; // ← swap this

export default function WaitlistModal({ mode, plan, onClose }) {
  const [step, setStep] = useState('form'); // 'form' | 'success' | 'error'
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: '', name: '', company: '', message: '' });
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { mode, plan, ...values };
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStep('success');
      } else {
        setStep('error');
      }
    } catch {
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const isDemo = mode === 'demo';
  const title = isDemo ? 'Book a demo' : 'Start for free';
  const subtitle = isDemo
    ? "Tell us a bit about your team and we'll get back to you within one business day."
    : "Join the waitlist and we'll send you early access — no credit card required.";

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {step === 'form' && (
          <>
            <div className="modal-eyebrow">{isDemo ? '// schedule a call' : '// early access'}</div>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-sub">{subtitle}</p>

            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              {isDemo && (
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jordan Lee"
                      value={values.name}
                      onChange={handleChange}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Corp"
                      value={values.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="field">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={handleChange}
                  required
                  autoFocus={!isDemo}
                />
              </div>

              {isDemo && (
                <div className="field">
                  <label htmlFor="message">What are you trying to solve? <span className="field-optional">(optional)</span></label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="We have 3 analysts spending 60% of their time on ad-hoc queries..."
                    rows={3}
                    value={values.message}
                    onChange={handleChange}
                  />
                </div>
              )}

              {plan && (
                <input type="hidden" name="plan" value={plan} />
              )}

              <button type="submit" className="modal-submit" disabled={loading}>
                {loading ? (
                  <span className="modal-spinner" />
                ) : isDemo ? (
                  'Request demo →'
                ) : (
                  'Join waitlist →'
                )}
              </button>
            </form>

            <p className="modal-legal">
              By submitting you agree to our <a href="#">Privacy Policy</a>. No spam, ever.
            </p>
          </>
        )}

        {step === 'success' && (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h2 className="modal-title">
              {isDemo ? "Demo request received!" : "You're on the list!"}
            </h2>
            <p className="modal-sub">
              {isDemo
                ? "We'll reach out within one business day to schedule a time."
                : "We'll send your early access link as soon as a spot opens up."}
            </p>
            <button className="modal-submit" onClick={onClose}>
              Close
            </button>
          </div>
        )}

        {step === 'error' && (
          <div className="modal-success">
            <div className="modal-success-icon" style={{ background: 'rgba(255,95,87,0.15)', color: '#FF5F57' }}>✕</div>
            <h2 className="modal-title">Something went wrong</h2>
            <p className="modal-sub">
              Please try again or email us directly at{' '}
              <a href="mailto:hello@legible.ai">hello@legible.ai</a>
            </p>
            <button className="modal-submit" onClick={() => setStep('form')}>
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
