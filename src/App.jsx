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

export default function App() {
  useGlobalReveal();

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
      <Navbar onCTAClick={openModal} />
      <Hero onCTAClick={openModal} />
      <Logos />
      <HowItWorks />
      <Features />
      <Pricing onCTAClick={openModal} />
      <Proof />
      <CtaBanner onCTAClick={openModal} />
      <Footer />

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
