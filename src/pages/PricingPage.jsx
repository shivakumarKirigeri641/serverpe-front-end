import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Pricing from '../components/Pricing';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="noise-overlay" style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      <Navbar />
      <div className="pt-[72px]">
        <Pricing />
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
