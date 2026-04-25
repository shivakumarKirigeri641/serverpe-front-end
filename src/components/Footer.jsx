import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHeart } from 'react-icons/hi';
import logo from '../images/serverpe_logo.jpg';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Full Stack Development', href: '/#services' },
      { label: 'OTP Authentication',     href: '/#services' },
      { label: 'Alerts & Notifications', href: '/#services' },
      { label: 'Database Management',    href: '/#services' },
      { label: 'Booking Systems',        href: '/#services' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Vehicle Alerts', href: 'https://vehicle-alerts.in', external: true },
      { label: 'Inventory App',  href: '/#services' },
      { label: 'Billing App',    href: '/#services' },
      { label: 'Data Analytics', href: '/#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',       href: '/#why-us' },
      { label: 'Pricing',        route: '/pricing' },
      { label: 'Contact',        href: '/#contact' },
      { label: 'Privacy Policy', route: '/privacy-policy', newTab: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',     route: '/privacy-policy', newTab: true },
      { label: 'Terms & Conditions', route: '/terms-and-conditions', newTab: true },
    ],
  },
];

const Footer = () => {
  const location = useLocation();

  const handleClick = (e, href) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-subtle)' }}>
      {/* Background Decor */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,148,26,0.03) 0%, transparent 70%)' }} />

      <div className="relative z-10">
        {/* CTA Banner */}
        <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left"
            >
              <div className="max-w-2xl">
                <h2 className="text-headline mb-4" style={{ color: 'var(--ink-900)' }}>
                  Ready to build something{' '}
                  <span className="gradient-text">extraordinary?</span>
                </h2>
                <p className="text-lg font-medium" style={{ color: 'var(--ink-500)' }}>
                  Let's turn your idea into a production-grade application.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, '/#contact')}
                  className="btn-amber px-10 py-4 rounded-full text-md font-bold"
                >
                  Start Project
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleClick(e, '/#services')}
                  className="btn-outline px-10 py-4 rounded-full text-md font-bold bg-white"
                >
                  Explore Services
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-6">
                <div className="bg-white rounded-2xl overflow-hidden inline-block px-4 py-2 shadow-sm border border-black/5">
                  <img src={logo} alt="ServerPe" className="h-10 w-auto object-contain" />
                </div>
              </div>
              <p className="text-[14px] font-medium leading-relaxed opacity-60" style={{ color: 'var(--ink-700)' }}>
                Smart clicks, Smart taps.
                <br />
                Premium web solutions by
                <br />
                ServerPe App Solutions.
              </p>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-7" style={{ color: 'var(--ink-300)' }}>
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.route ? (
                        <Link
                          to={link.route}
                          target={link.newTab ? '_blank' : undefined}
                          rel={link.newTab ? 'noopener noreferrer' : undefined}
                          className="text-[14px] font-semibold transition-all duration-200 hover:text-[var(--accent-amber)]"
                          style={{ color: 'var(--ink-500)' }}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => !link.external && handleClick(e, link.href)}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="text-[14px] font-semibold transition-all duration-200 hover:text-[var(--accent-amber)]"
                          style={{ color: 'var(--ink-500)' }}
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

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.3)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[13px] font-bold opacity-40" style={{ color: 'var(--ink-900)' }}>
              &copy; {new Date().getFullYear()} ServerPe App Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold opacity-40 hover:opacity-100 transition-opacity" style={{ color: 'var(--ink-900)' }}>Privacy</Link>
              <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold opacity-40 hover:opacity-100 transition-opacity" style={{ color: 'var(--ink-900)' }}>Terms</Link>
              <div className="w-px h-4 bg-black/10 mx-2" />
              <p className="text-[13px] font-bold opacity-40 flex items-center gap-1.5" style={{ color: 'var(--ink-900)' }}>
                Built with <HiHeart className="text-red-500" /> by ServerPe
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
