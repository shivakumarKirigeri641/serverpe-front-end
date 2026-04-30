import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiExternalLink, HiArrowRight } from 'react-icons/hi';
import logo from '../images/serverpelogo_small.jpg';

const navLinks = [
  { label: 'Home', href: '/#', isHash: true, sectionId: '' },
  { label: 'Services', href: '/#services', isHash: true, sectionId: 'services' },
  { label: 'Why Me', href: '/#why-me', isHash: true, sectionId: 'why-me' },
  { label: 'Pricing', href: '/pricing', isHash: false, sectionId: 'pricing' },
  { label: 'Vehicle Alerts', href: 'https://vehicle-alerts.in', isHash: false, external: true, sectionId: '' },
  { label: 'Contact', href: '/#contact', isHash: true, sectionId: 'contact' },
];

/* Section IDs to observe for scroll-spy */
const spySections = ['services', 'why-me', 'pricing', 'contact', 'vehicle-alerts'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const linkRefs = useRef({});

  /* ── Scroll listener ─────────────────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── IntersectionObserver scroll-spy ─────────────────────────────────── */
  const handleIntersect = useCallback((entries) => {
    /* Find the most visible section */
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible.length > 0) {
      setActiveSection(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0px -60% 0px', /* trigger when section is in middle-ish of viewport */
      threshold: [0, 0.1, 0.3, 0.5],
    });

    spySections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname, handleIntersect]);

  /* On non-home pages, detect route match */
  useEffect(() => {
    if (location.pathname !== '/') {
      if (location.pathname === '/pricing') setActiveSection('pricing');
      else setActiveSection('');
    }
  }, [location.pathname]);

  /* When at very top, highlight Home */
  useEffect(() => {
    const checkTop = () => {
      if (window.scrollY < 100 && location.pathname === '/') setActiveSection('');
    };
    window.addEventListener('scroll', checkTop);
    return () => window.removeEventListener('scroll', checkTop);
  }, [location.pathname]);

  useEffect(() => { setIsOpen(false); }, [location]);

  const scrollToHash = (href) => {
    const id = href.replace('/#', '');
    if (id === '') window.scrollTo({ top: 0, behavior: 'smooth' });
    else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* Determine if a link is "active" */
  const isActive = (link) => {
    if (link.external) return false;
    if (link.sectionId === '' && activeSection === '') return true; /* Home */
    return link.sectionId === activeSection;
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100]"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="glass-nav transition-all duration-500 ease-out"
        style={{
          pointerEvents: 'auto',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)'
            : '0 4px 16px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between" style={{ height: 64 }}>
            {/* Logo */}
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
              <div className="w-12 h-12 flex-shrink-0">
                <img src={logo} alt="ServerPe" className="h-full w-full object-contain" style={{ mixBlendMode: 'multiply' }} />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold leading-none tracking-tight" style={{ color: '#0a0a0a' }}>ServerPe</span>
                <span className="text-[8px] font-bold tracking-[0.2em] uppercase" style={{ color: '#a1a1aa' }}>App Solutions</span>
              </div>
            </Link>

            {/* Desktop links with sliding indicator */}
            <div className="hidden lg:flex items-center gap-0 relative">
              {navLinks.map((link) => {
                const active = isActive(link);
                return (
                  <React.Fragment key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        className="relative z-10 flex items-center gap-1 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] transition-colors duration-300"
                        style={{ color: '#71717a' }}>
                        {link.label}<HiExternalLink className="w-3 h-3 opacity-40" />
                      </a>
                    ) : link.isHash && location.pathname === '/' ? (
                      <button
                        ref={el => { linkRefs.current[link.label] = el; }}
                        onClick={() => scrollToHash(link.href)}
                        className="relative z-10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] transition-colors duration-300"
                        style={{ color: active ? '#0a0a0a' : '#71717a' }}>
                        {active && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-lg"
                            style={{
                              background: 'rgba(0,0,0,0.06)',
                              border: '1px solid rgba(0,0,0,0.08)',
                              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.04)',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                          />
                        )}
                        <span className="relative z-10">{link.label}</span>
                      </button>
                    ) : (
                      <Link
                        ref={el => { linkRefs.current[link.label] = el; }}
                        to={link.href.startsWith('/#') ? `/${link.href.replace('/#', '#')}` : link.href}
                        className="relative z-10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] transition-colors duration-300"
                        style={{ color: active ? '#0a0a0a' : '#71717a' }}>
                        {active && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-lg"
                            style={{
                              background: 'rgba(0,0,0,0.06)',
                              border: '1px solid rgba(0,0,0,0.08)',
                              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.04)',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                          />
                        )}
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}

              <div className="ml-4">
                <a href="/#contact"
                  onClick={(e) => { if (location.pathname === '/') { e.preventDefault(); scrollToHash('/#contact'); } }}
                  className="btn-primary inline-flex items-center gap-2 !py-3 !px-6 text-[11px]">
                  Start Project <HiArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center" style={{ color: '#0a0a0a' }}>
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden" style={{ background: '#0a0a0a', borderRadius: '0 0 16px 16px', marginTop: -1, pointerEvents: 'auto' }}>
              <div className="px-6 py-10 space-y-1">
                {navLinks.map((link, idx) => {
                  const active = isActive(link);
                  return (
                    <motion.div key={link.label} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between py-4 text-[18px] font-bold" style={{ color: '#ffffff', borderBottom: '1px solid #18181b' }}>
                          {link.label}<HiExternalLink className="w-4 h-4 opacity-30" />
                        </a>
                      ) : link.isHash && location.pathname === '/' ? (
                        <button onClick={() => scrollToHash(link.href)}
                          className="w-full text-left py-4 text-[18px] font-bold flex items-center gap-3"
                          style={{ color: active ? '#22c55e' : '#ffffff', borderBottom: '1px solid #18181b' }}>
                          {active && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#22c55e' }} />}
                          {link.label}
                        </button>
                      ) : (
                        <Link to={link.href.startsWith('/#') ? `/${link.href.replace('/#', '#')}` : link.href}
                          className="block py-4 text-[18px] font-bold flex items-center gap-3"
                          style={{ color: active ? '#22c55e' : '#ffffff', borderBottom: '1px solid #18181b' }}>
                          {active && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#22c55e' }} />}
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-6">
                  <a href="/#contact" onClick={(e) => { if (location.pathname === '/') { e.preventDefault(); scrollToHash('/#contact'); } setIsOpen(false); }}
                    className="btn-white w-full flex items-center justify-center gap-2 !text-[14px]">
                    Start a Project <HiArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
