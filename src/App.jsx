import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logos from './components/Logos';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Proof from './components/Proof';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Contact from './components/Contact';
import Marketplace from './components/Marketplace';
import SkillsResources from './components/SkillsResources';
import CookieConsent from './components/CookieConsent';
import NewFeatures from './components/NewFeatures';
import { fetchAPI } from './lib/strapi';

// Set up the global reveal observer once the app mounts.
function useGlobalReveal(...deps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.05}s`;
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Small timeout so all components have rendered
    const t = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, deps);
}

// Fetch all CMS data in parallel; returns null values on failure (components use defaults)
function useCmsData() {
  const [cms, setCms] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const endpoints = {
      hero:       '/hero',
      navbar:     '/navbar',
      ctaBanner:  '/cta-banner',
      footer:     '/footer',
      steps:      '/how-it-works-steps?sort=stepNumber:asc',
      features:   '/features?sort=sortOrder:asc',
      plans:      '/pricing-plans?sort=sortOrder:asc',
      testimonials: '/testimonials?sort=sortOrder:asc',
      databases:  '/supported-databases?sort=sortOrder:asc',
    };

    const timeout = setTimeout(() => {
      // If CMS hasn't responded in 3s, show defaults without waiting
      if (!ready) setReady(true);
    }, 3000);

    Promise.allSettled(
      Object.entries(endpoints).map(([key, path]) =>
        fetchAPI(path).then((data) => [key, data])
      )
    ).then((results) => {
      clearTimeout(timeout);
      const data = {};
      for (const result of results) {
        if (result.status === 'fulfilled') {
          const [key, value] = result.value;
          data[key] = value;
        }
      }
      setCms(data);
      setReady(true);
    });

    return () => clearTimeout(timeout);
  }, []);

  return { cms, ready };
}

export default function App() {
  const { cms, ready } = useCmsData();
  const location = useLocation();
  useGlobalReveal(ready, location.pathname);

  // modal: null | { mode: 'free' | 'demo', plan?: string }
  const [modal, setModal] = useState(null);

  const openModal = (type, plan) => {
    if (type !== 'demo') {
      window.location.href = 'https://legible.legiblequery.ai';
      return;
    }
    setModal({ mode: 'demo', plan });
  };

  const closeModal = () => setModal(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isBlog = location.pathname.startsWith('/blog');

  return (
    <div className={ready ? 'cms-ready' : 'cms-loading'}>
      <Navbar onCTAClick={openModal} cms={cms.navbar} isBlog={isBlog} />

      <Routes>
        <Route path="/" element={
          <>
            <Hero onCTAClick={openModal} cms={cms.hero} />
            <Logos cms={cms.databases} />
            <HowItWorks cms={cms.steps} />
            <Features cms={cms.features} />
            <NewFeatures />
            <Pricing onCTAClick={openModal} cms={cms.plans} />
            <Proof cms={cms.testimonials} />
            <CtaBanner onCTAClick={openModal} cms={cms.ctaBanner} />
          </>
        } />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/skills-resources" element={<SkillsResources />} />
      </Routes>

      <Footer cms={cms.footer} />

      <CookieConsent />

      {modal && (
        <WaitlistModal
          mode={modal.mode}
          plan={modal.plan}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
