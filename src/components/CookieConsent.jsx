import { useState, useEffect } from 'react';

const CONSENT_KEY = 'legible_cookie_consent';

export function getCookieConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
  }, []);

  const respond = (value) => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p>
        We use cookies to improve your experience and analyze site usage.
        Read our <a href="/privacy">Privacy Policy</a> for details.
      </p>
      <div className="cookie-actions">
        <button className="cookie-btn accept" onClick={() => respond('accepted')}>Accept</button>
        <button className="cookie-btn decline" onClick={() => respond('declined')}>Decline</button>
      </div>
    </div>
  );
}
