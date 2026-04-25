import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import VehicleAlerts from '../components/VehicleAlerts';
import WhyChooseMe from '../components/WhyChooseMe';
import Pricing from '../components/Pricing';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="noise-overlay" style={{ background: 'var(--bg-base)' }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <VehicleAlerts />
        <WhyChooseMe />
        <Pricing />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
