import React from 'react';
import { Link } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi';
import logo from '../images/serverpe_logo.jpg';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Full Stack Development', href: '#services' },
      { label: 'OTP Authentication', href: '#services' },
      { label: 'Alerts & Notifications', href: '#services' },
      { label: 'Database Management', href: '#services' },
      { label: 'Booking Systems', href: '#services' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Vehicle Alerts', href: 'https://vehicle-alerts.in', external: true },
      { label: 'Inventory App', href: '#services' },
      { label: 'Billing App', href: '#services' },
      { label: 'Data Analytics', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#why-us' },
      { label: 'Contact', href: '#contact' },
      { label: 'Why Choose Us', href: '#why-us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', route: '/privacy-policy' },
      { label: 'Terms & Conditions', route: '/terms-and-conditions' },
    ],
  },
];

const Footer = () => {
  const handleClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-dark-900 text-white overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-gradient-radial from-primary-500/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* CTA Banner */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                  Ready to build?{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-cyan-300">
                    Let's make it happen.
                  </span>
                </h2>
                <p className="text-slate-400 text-[15px]">
                  Reach out today and let's discuss your next project.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, '#contact')}
                  className="px-7 py-3.5 bg-white text-dark-900 text-[14px] font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 shadow-xl text-center"
                >
                  Get in Touch
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleClick(e, '#services')}
                  className="px-7 py-3.5 text-white/60 text-[14px] font-medium border border-white/10 rounded-full hover:bg-white/5 hover:text-white transition-all duration-200 text-center"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-5">
                <div className="bg-white rounded-xl overflow-hidden inline-block px-3 py-2 shadow-md">
                  <img src={logo} alt="ServerPe" className="h-10 w-auto object-contain" />
                </div>
              </div>
              <p className="text-[13px] text-white/30 leading-relaxed mb-5">
                Smart clicks, Smart taps.
                <br />
                Affordable software solutions
                <br />
                by a sole proprietor.
              </p>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.route ? (
                        <Link
                          to={link.route}
                          className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => !link.external && handleClick(e, link.href)}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/25">
              &copy; {new Date().getFullYear()} ServerPe App Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/privacy-policy" className="text-[12px] text-white/25 hover:text-white/60 transition-colors duration-200">
                Privacy Policy
              </Link>
              <span className="text-white/10">·</span>
              <Link to="/terms-and-conditions" className="text-[12px] text-white/25 hover:text-white/60 transition-colors duration-200">
                Terms & Conditions
              </Link>
              <span className="text-white/10">·</span>
              <p className="text-[12px] text-white/25 flex items-center gap-1">
                Built with <HiHeart className="w-3 h-3 text-red-400" /> by ServerPe
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
