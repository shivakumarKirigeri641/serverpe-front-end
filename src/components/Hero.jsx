import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Typewriter ───────────────────────────────────────────────────────── */
const words = ['smart', 'scalable', 'secure', 'modern'];
const TypewriterWord = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const speed = isDeleting ? 50 : 100;
    if (!isDeleting && displayed === word) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }
    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setDisplayed(prev => isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index]);

  return (
    <span style={{ color: '#2563eb', fontStyle: 'italic' }}>
      {displayed}<span className="animate-pulse">|</span>
    </span>
  );
};

/* ─── Hero ─────────────────────────────────────────────────────────────── */
const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Line grid texture */}
      <div className="absolute inset-0 line-grid pointer-events-none" />

      {/* Left vertical mono label */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 z-20">
        <div className="mono-label" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.25em' }}>
          ServerPe App Solutions · Est. 2024
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-[140px] lg:pt-[180px] pb-0">
        {/* Top bar — status + year */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full pulse-green" />
            <span className="mono-label">Available for projects</span>
          </div>
          <span className="mono-label hidden sm:block">©2025</span>
        </motion.div>

        {/* Massive headline */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <h1 className="text-massive mb-0">
            Software
            <br />
            built for <TypewriterWord />
            <br />
            businesses.
          </h1>
        </motion.div>

        {/* Description + CTA row */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 lg:mt-16 grid lg:grid-cols-[1fr_auto] gap-12 items-end pb-16 lg:pb-0">
          <div className="max-w-xl">
            <div className="brutalist-line mb-6" />
            <p className="text-[17px] lg:text-[19px] leading-[1.7] font-medium" style={{ color: '#52525b' }}>
              From full-stack development to intelligent booking systems — affordable,
              production-grade web apps crafted by a dedicated sole proprietor.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => scrollTo('contact')} className="btn-primary inline-flex items-center gap-3">
              Start a Project <HiArrowRight />
            </button>
            <button onClick={() => scrollTo('services')} className="btn-outline inline-flex items-center gap-3">
              Explore Services
            </button>
          </div>
        </motion.div>

        {/* Bottom metrics strip — full width black bar */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative -mx-6 lg:-mx-10">
          <div className="w-full" style={{ background: '#0a0a0a' }}>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {[
                  { value: '99.9%', label: 'Uptime', sub: 'Production reliability' },
                  { value: '50+', label: 'Projects', sub: 'Delivered successfully' },
                  { value: '₹3,999', label: 'Starting at', sub: 'GST inclusive pricing' },
                  { value: '1:1', label: 'Direct', sub: 'No middlemen involved' },
                ].map((stat, i) => (
                  <div key={stat.label}
                    className="py-8 lg:py-10 px-6 lg:px-10"
                    style={{ borderRight: i < 3 ? '1px solid #1a1a1a' : 'none' }}>
                    <p className="font-mono text-[28px] lg:text-[36px] font-bold mb-1" style={{ color: '#ffffff', letterSpacing: '-0.03em' }}>
                      {stat.value}
                    </p>
                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] mb-0.5" style={{ color: '#71717a' }}>{stat.label}</p>
                    <p className="text-[11px] font-medium" style={{ color: '#71717a' }}>{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HiArrowRight = (props) => (
  <svg {...props} className={`w-4 h-4 ${props.className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default Hero;
