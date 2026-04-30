import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import logo from '../images/serverpelogo_small.jpg';

const footerLinks = [
  { title: 'Services', links: [
    { label: 'Full Stack Development', href: '/#services' },
    { label: 'OTP Authentication', href: '/#services' },
    { label: 'Alerts & Notifications', href: '/#services' },
    { label: 'Database Management', href: '/#services' },
    { label: 'Booking Systems', href: '/#services' },
  ]},
  { title: 'Products', links: [
    { label: 'Vehicle Alerts', href: 'https://vehicle-alerts.in', external: true },
    { label: 'Inventory App', href: '/#services' },
    { label: 'Billing App', href: '/#services' },
    { label: 'Data Analytics', href: '/#services' },
  ]},
  { title: 'Company', links: [
    { label: 'About Me', href: '/#why-me' },
    { label: 'Pricing', route: '/pricing' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Privacy Policy', route: '/privacy-policy', newTab: true },
  ]},
  { title: 'Legal', links: [
    { label: 'Privacy Policy', route: '/privacy-policy', newTab: true },
    { label: 'Terms & Conditions', route: '/terms-and-conditions', newTab: true },
  ]},
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
    <footer className="relative overflow-hidden" style={{ background: '#ffffff' }}>

      {/* CTA Section — massive typography */}
      <div style={{ borderBottom: '1px solid #e4e4e7' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <h2 className="text-massive" style={{ color: '#0a0a0a' }}>
                Ready to
                <br />
                build?
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:pb-4">
              <a href="#contact" onClick={(e) => handleClick(e, '/#contact')}
                className="btn-primary inline-flex items-center gap-3 justify-center">
                Start Project <HiArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" onClick={(e) => handleClick(e, '/#services')}
                className="btn-outline inline-flex items-center justify-center gap-3">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="w-16 h-16 mb-6">
              <img src={logo} alt="ServerPe" className="h-full w-full object-contain" style={{ mixBlendMode: 'multiply' }} />
            </div>
            <p className="text-[12px] font-medium leading-relaxed" style={{ color: '#52525b' }}>
              Smart clicks, Smart taps.
              <br />Premium web solution by
              <br />ServerPe App Solutions.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="mono-label mb-7" style={{ color: '#0a0a0a' }}>{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.route ? (
                      <Link to={link.route}
                        target={link.newTab ? '_blank' : undefined}
                        rel={link.newTab ? 'noopener noreferrer' : undefined}
                        className="text-[13px] font-semibold transition-all hover:text-black"
                        style={{ color: '#52525b' }}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href}
                        onClick={(e) => !link.external && handleClick(e, link.href)}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-[13px] font-semibold transition-all hover:text-black"
                        style={{ color: '#52525b' }}>
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
      <div style={{ borderTop: '1px solid #e4e4e7' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="mono-label flex items-center gap-1 !text-[13px]" style={{ color: '#52525b' }}>
            <span className="font-sans !text-[14px] leading-none">™</span> {new Date().getFullYear()} ServerPe App Solutions
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer"
              className="mono-label hover:text-black transition-colors !text-[13px]" style={{ color: '#52525b' }}>Privacy</Link>
            <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer"
              className="mono-label hover:text-black transition-colors !text-[13px]" style={{ color: '#52525b' }}>Terms</Link>
            <span className="mono-label !text-[13px]" style={{ color: '#d4d4d8' }}>|</span>
            <span className="mono-label !text-[13px]" style={{ color: '#0a0a0a' }}>Built by Proprietorship</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
