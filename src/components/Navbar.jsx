import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiExternalLink } from 'react-icons/hi';
import logo from '../images/serverpelogo_small1.jpg';

const navLinks = [
  { label: 'Home', href: '/#', isHash: true },
  { label: 'Services', href: '/#services', isHash: true },
  { label: 'Why Me', href: '/#why-me', isHash: true },
  { label: 'Pricing', href: '/pricing', isHash: false },
  { label: 'Vehicle Alerts', href: 'https://vehicle-alerts.in', isHash: false, external: true },
  { label: 'Contact', href: '/#contact', isHash: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isPricingPage = location.pathname === '/pricing';

  const scrollToHash = (href) => {
    const id = href.replace('/#', '');
    if (id === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <div className="bg-white rounded-xl overflow-hidden px-1.5 py-0.5 shadow-sm border border-black/5 transition-transform group-hover:scale-105">
            <img src={logo} alt="ServerPe" className="h-9 w-auto object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none tracking-tight" style={{ color: 'var(--ink-900)' }}>
              ServerPe
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase opacity-40" style={{ color: 'var(--ink-700)' }}>
              App Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <React.Fragment key={link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200"
                  style={{ color: 'var(--ink-500)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink-900)'; e.currentTarget.style.background = 'rgba(26, 26, 46, 0.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-500)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.label}
                  <HiExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              ) : link.isHash && location.pathname === '/' ? (
                <button
                  onClick={() => scrollToHash(link.href)}
                  className="px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200"
                  style={{ color: 'var(--ink-500)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink-900)'; e.currentTarget.style.background = 'rgba(26, 26, 46, 0.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-500)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.href.startsWith('/#') ? `/${link.href.replace('/#', '#')}` : link.href}
                  className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200 ${
                    location.pathname === link.href ? 'active-link' : ''
                  }`}
                  style={{ 
                    color: location.pathname === link.href ? 'var(--accent-amber)' : 'var(--ink-500)',
                    background: location.pathname === link.href ? 'rgba(232, 148, 26, 0.06)' : 'transparent'
                  }}
                  onMouseEnter={(e) => { 
                    if (location.pathname !== link.href) {
                      e.currentTarget.style.color = 'var(--ink-900)'; 
                      e.currentTarget.style.background = 'rgba(26, 26, 46, 0.04)'; 
                    }
                  }}
                  onMouseLeave={(e) => { 
                    if (location.pathname !== link.href) {
                      e.currentTarget.style.color = 'var(--ink-500)'; 
                      e.currentTarget.style.background = 'transparent'; 
                    }
                  }}
                >
                  {link.label}
                </Link>
              )}
            </React.Fragment>
          ))}
          
          <div className="w-px h-4 mx-2 bg-black/10" />
          
          <a
            href="/#contact"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                scrollToHash('/#contact');
              }
            }}
            className="btn-amber px-6 py-2.5 rounded-full text-[14px] font-semibold"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl transition-colors"
          style={{ background: 'rgba(26, 26, 46, 0.04)', color: 'var(--ink-900)' }}
        >
          {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t overflow-hidden"
            style={{ borderTopColor: 'var(--border-subtle)' }}
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-5 py-4 rounded-2xl text-[18px] font-semibold"
                      style={{ color: 'var(--ink-900)', background: 'rgba(26, 26, 46, 0.03)' }}
                    >
                      {link.label}
                      <HiExternalLink className="w-5 h-5 opacity-30" />
                    </a>
                  ) : link.isHash && location.pathname === '/' ? (
                    <button
                      onClick={() => scrollToHash(link.href)}
                      className="w-full text-left px-5 py-4 rounded-2xl text-[18px] font-semibold"
                      style={{ color: 'var(--ink-900)', background: 'rgba(26, 26, 46, 0.03)' }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href.startsWith('/#') ? `/${link.href.replace('/#', '#')}` : link.href}
                      className="block px-5 py-4 rounded-2xl text-[18px] font-semibold"
                      style={{ 
                        color: location.pathname === link.href ? 'var(--accent-amber)' : 'var(--ink-900)',
                        background: location.pathname === link.href ? 'rgba(232, 148, 26, 0.06)' : 'rgba(26, 26, 46, 0.03)'
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4"
              >
                <a
                  href="/#contact"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      scrollToHash('/#contact');
                    }
                    setIsOpen(false);
                  }}
                  className="btn-amber block w-full py-5 rounded-2xl text-center font-bold text-lg"
                >
                  Start a Project
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
