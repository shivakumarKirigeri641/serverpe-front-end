import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import VehicleAlerts from '../components/VehicleAlerts';
import WhyChooseMe from '../components/WhyChooseMe';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <VehicleAlerts />
        <WhyChooseMe />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
};

export default Home;
