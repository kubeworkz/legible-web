import { useState, useEffect } from 'react';
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
import { fetchAPI } from './lib/strapi';

// Set up the global reveal observer once the app mounts.
function useGlobalReveal() {
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
      document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);
}

// Fetch all CMS data in parallel; returns null values on failure (components use defaults)
function useCmsData() {
  const [cms, setCms] = useState({});

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

    Promise.allSettled(
      Object.entries(endpoints).map(([key, path]) =>
        fetchAPI(path).then((data) => [key, data])
      )
    ).then((results) => {
      const data = {};
      for (const result of results) {
        if (result.status === 'fulfilled') {
          const [key, value] = result.value;
          data[key] = value;
        }
      }
      setCms(data);
    });
  }, []);

  return cms;
}

export default function App() {
  useGlobalReveal();
  const cms = useCmsData();

  // modal: null | { mode: 'free' | 'demo', plan?: string }
  const [modal, setModal] = useState(null);

  const openModal = (type, plan) => {
    // 'demo' stays demo; everything else is 'free'
    const mode = type === 'demo' ? 'demo' : 'free';
    setModal({ mode, plan });
  };

  const closeModal = () => setModal(null);

  return (
    <>
      <Navbar onCTAClick={openModal} cms={cms.navbar} />
      <Hero onCTAClick={openModal} cms={cms.hero} />
      <Logos cms={cms.databases} />
      <HowItWorks cms={cms.steps} />
      <Features cms={cms.features} />
      <Pricing onCTAClick={openModal} cms={cms.plans} />
      <Proof cms={cms.testimonials} />
      <CtaBanner onCTAClick={openModal} cms={cms.ctaBanner} />
      <Footer cms={cms.footer} />

      {modal && (
        <WaitlistModal
          mode={modal.mode}
          plan={modal.plan}
          onClose={closeModal}
        />
      )}
    </>
  );
}
