import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoSmall from '../images/serverpelogo_small1.jpg';
import heroBg from '../images/hero_bg.png';

/* --- Star field (Lighter version) ----------------------------------------- */
const StarField = () => {
  const stars = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: 'var(--accent-amber)',
            animation: `starPulse ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* --- Ambient Blobs (Bright version) --------------------------------------- */
const AmbientBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute rounded-full"
      style={{
        width: 800, height: 800, top: '-10%', left: '40%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(232,148,26,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'blobMove1 25s ease-in-out infinite',
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        width: 600, height: 600, bottom: '0%', left: '-5%',
        background: 'radial-gradient(circle, rgba(0,176,158,0.05) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'blobMove2 30s ease-in-out infinite',
      }}
    />
  </div>
);

/* --- Typewriter effect ---------------------------------------------------- */
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
      setDisplayed(prev =>
        isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index]);

  return (
    <em
      className="gradient-text"
      style={{ fontStyle: 'italic' }}
    >
      {displayed}
      <span className="animate-pulse" style={{ color: 'var(--accent-amber)' }}>|</span>
    </em>
  );
};

/* --- Dashboard mockup (Bright version) ------------------------------------ */
const DashboardMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    className="relative w-full max-w-5xl mx-auto"
  >
    {/* Ambient glow */}
    <div
      className="absolute -inset-x-20 -top-10 h-64 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,148,26,0.1) 0%, transparent 70%)' }}
    />

    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ 
        background: '#FFFFFF', 
        border: '1px solid var(--border-medium)', 
        boxShadow: '0 40px 100px rgba(26, 26, 46, 0.08), 0 0 0 1px rgba(232, 148, 26, 0.05)' 
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 border-b"
        style={{ background: '#F8F9FB', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="flex-1 flex justify-center">
          <div
            className="h-6 rounded-lg px-6 flex items-center justify-center"
            style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', minWidth: 200 }}
          >
            <span style={{ fontSize: 10, color: 'var(--ink-300)' }}>app.serverpe.in/dashboard</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* App body */}
      <div className="flex" style={{ minHeight: 400 }}>
        {/* Sidebar */}
        <div
          className="hidden sm:flex w-52 flex-shrink-0 flex-col p-5 border-r"
          style={{ background: '#FBFBFF', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 mb-7">
            <div className="bg-white rounded-md overflow-hidden px-1.5 py-0.5 border border-black/5 shadow-sm">
              <img src={logoSmall} alt="ServerPe" style={{ height: 18, width: 'auto', display: 'block' }} />
            </div>
          </div>
          <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-300)', marginBottom: 8, paddingLeft: 4 }}>Navigation</p>
          {[
            { label: 'Overview', active: true },
            { label: 'Projects', active: false },
            { label: 'Alerts', active: false, badge: '3' },
            { label: 'Database', active: false },
            { label: 'Bookings', active: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-2 py-2.5 rounded-lg mb-0.5 cursor-default"
              style={{ background: item.active ? 'rgba(232,148,26,0.08)' : 'transparent', color: item.active ? 'var(--accent-amber)' : 'var(--ink-500)' }}>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ background: 'currentColor', opacity: 0.7 }} />
                <span style={{ fontSize: 11, fontWeight: 600 }}>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{ fontSize: 8, background: 'var(--accent-amber)', color: '#FFF', borderRadius: 999, padding: '2px 6px' }}>{item.badge}</span>
              )}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)', marginBottom: 2 }}>Dashboard</h3>
              <p style={{ fontSize: 10, color: 'var(--ink-300)' }}>Real-time service monitoring</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg border text-[10px] font-medium" style={{ borderColor: 'var(--border-subtle)', color: 'var(--ink-500)' }}>Last 7 Days ▾</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Uptime', value: '99.9%', color: 'var(--accent-teal)' },
              { label: 'Requests', value: '1.2M', color: 'var(--accent-amber)' },
              { label: 'Errors', value: '0.01%', color: '#FB7185' },
            ].map((kpi) => (
              <div key={kpi.label} className="p-4 rounded-xl border border-black/[0.03]" style={{ background: '#FBFBFF' }}>
                <p style={{ fontSize: 9, color: 'var(--ink-300)', marginBottom: 4, fontWeight: 600 }}>{kpi.label}</p>
                <p style={{ fontWeight: 800, fontSize: 18, color: 'var(--ink-900)', lineHeight: 1 }}>{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-black/[0.03] p-4 h-32 flex items-end gap-1" style={{ background: '#FBFBFF' }}>
            {[40, 70, 45, 90, 65, 80, 50, 85, 60, 95, 75, 40].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i % 2 === 0 ? 'var(--accent-amber)' : 'var(--accent-teal)', opacity: 0.8 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

/* --- Hero Section --------------------------------------------------------- */
const Hero = () => {
  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (id === '') window.scrollTo({ top: 0, behavior: 'smooth' });
    else if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative overflow-hidden pt-[80px]"
      style={{ background: 'var(--bg-base)', minHeight: '100vh' }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.15 }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 0%, var(--bg-base) 90%)' }} />

      <AmbientBlobs />
      <StarField />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center pt-20 mb-8"
        >
          <div className="badge-amber px-5 py-2 rounded-full inline-flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-amber)' }} />
            <span>Available for new projects · 2025</span>
          </div>
        </motion.div>

        {/* Display headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-5xl mx-auto text-display"
          style={{ color: 'var(--ink-900)' }}
        >
          Software built for{' '}
          <TypewriterWord />{' '}
          businesses.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-8 text-center max-w-xl mx-auto text-[17px] leading-relaxed"
          style={{ color: 'var(--ink-500)', letterSpacing: '-0.01em' }}
        >
          From full-stack development to intelligent booking systems — affordable,
          production-grade web apps crafted by a dedicated sole proprietor.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="btn-amber group flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-bold"
          >
            Start a Project
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
            className="btn-outline px-8 py-4 rounded-full text-[15px] font-semibold"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Trust markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 pb-16"
        >
          {[
            { label: 'Production Ready', color: 'var(--accent-amber)' },
            { label: 'PostgreSQL Expert', color: 'var(--accent-teal)' },
            { label: 'GST Inclusive', color: '#FB7185' },
            { label: 'Direct Contact', color: 'var(--accent-amber-light)' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={badge.color}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600 }}>{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboard mockup */}
        <DashboardMockup />
        <div className="h-12" />
      </div>
    </section>
  );
};

export default Hero;
