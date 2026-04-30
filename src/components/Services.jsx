import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCode, HiShieldCheck, HiBell, HiDatabase, HiUsers, HiCube, HiCalendar, HiChartBar } from 'react-icons/hi';

const services = [
  { id: 'fullstack', icon: HiCode, num: '01', label: 'Full Stack Development', headline: 'End-to-end applications built for scale', description: 'From sleek React frontends to robust Node.js backends — complete full-stack development tailored to your business. Modern stack, cloud deployment, production-ready.' },
  { id: 'auth', icon: HiShieldCheck, num: '02', label: 'OTP Authentication', headline: 'Secure verification via SMS, Email & WhatsApp', description: 'Multi-channel OTP-based authentication with SMS, email, and WhatsApp integration. Bulletproof security with a seamless user experience your customers love.' },
  { id: 'alerts', icon: HiBell, num: '03', label: 'Alerts & Notifications', headline: 'Smart scheduling for every notification', description: 'Automated alert systems with intelligent scheduling. Push notifications, email alerts, SMS reminders — all timed perfectly for maximum engagement.' },
  { id: 'database', icon: HiDatabase, num: '04', label: 'Database Management', headline: 'PostgreSQL-powered data architecture', description: 'Expert database architecture with PostgreSQL. Efficient data modeling, optimized queries, migrations, and rock-solid data integrity at any scale.' },
  { id: 'booking', icon: HiCalendar, num: '05', label: 'Booking Systems', headline: 'Complete booking lifecycle management', description: 'Full-featured booking platforms — create, manage, cancel, postpone, and prepone appointments across any industry. Calendar integration & automated reminders.' },
  { id: 'analytics', icon: HiChartBar, num: '06', label: 'Data Analytics', headline: 'Actionable insights from your data', description: 'Web-based analytics platforms with visual dashboards, real-time charts, and actionable business insights. See exactly what drives your users forward.' },
  { id: 'inventory', icon: HiCube, num: '07', label: 'Inventory & Billing', headline: 'Smart inventory with integrated billing', description: 'Web-based inventory management with real-time stock tracking, automated billing, GST-ready invoicing, and comprehensive reporting dashboards.' },
  { id: 'roles', icon: HiUsers, num: '08', label: 'Role-Based Access', headline: 'Granular permissions and admin panels', description: 'User role-based applications with fine-grained permissions, multi-level admin panels, and secure access control — built for operations of any size.' },
];

const DURATION = 5000;

const Services = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef(Date.now());
  const rafRef = useRef(null);

  const current = services[active];

  const next = useCallback(() => {
    setActive(p => (p + 1) % services.length);
    setProgress(0);
    startRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return; }
    startRef.current = Date.now() - (progress / 100) * DURATION;
    const tick = () => {
      const pct = Math.min(((Date.now() - startRef.current) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) next();
      else rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, next]);

  const goTo = (idx) => {
    setActive(idx);
    setProgress(0);
    startRef.current = Date.now();
  };

  const Icon = current.icon;

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: '#f7f7f7' }}>
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-24 lg:pt-32">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-16">
            <div>
              <span className="marker marker-light mb-4 inline-block">Services</span>
              <h2 className="text-headline" style={{ maxWidth: 700 }}>
                Everything you need to build & grow
              </h2>
            </div>
            <p className="text-[15px] font-medium leading-[1.7] max-w-md" style={{ color: '#71717a' }}>
              Comprehensive software solutions covering the full spectrum of web application development — from auth to analytics.
            </p>
          </div>
        </div>

        {/* Active service — editorial layout */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-0"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

          <AnimatePresence mode="wait">
            <motion.div key={current.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-[120px_1fr_1fr] gap-0"
              style={{ borderTop: '4px solid #0a0a0a' }}>

              {/* Number column */}
              <div className="py-10 lg:py-16 flex items-start" style={{ borderRight: '1px solid #e5e7eb' }}>
                <span className="font-mono text-[64px] lg:text-[80px] font-black leading-none" style={{ color: '#e5e7eb' }}>
                  {current.num}
                </span>
              </div>

              {/* Content column */}
              <div className="py-10 lg:py-16 lg:px-12" style={{ borderRight: '1px solid #e5e7eb' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-5 h-5" style={{ color: '#0a0a0a' }} />
                  <span className="mono-label" style={{ color: '#0a0a0a' }}>{current.label}</span>
                </div>
                <h3 className="text-sub-headline mb-5" style={{ color: '#0a0a0a' }}>
                  {current.headline}
                </h3>
                <p className="text-[15px] leading-[1.8] font-medium mb-8" style={{ color: '#71717a' }}>
                  {current.description}
                </p>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] transition-all hover:gap-3"
                  style={{ color: '#0a0a0a' }}>
                  Start this project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>

              {/* Visual column — abstract data display */}
              <div className="py-10 lg:py-16 lg:px-12 hidden lg:block">
                <div className="h-full flex flex-col justify-between">
                  {/* Mini bars */}
                  <div className="flex items-end gap-[3px] h-24 mb-8">
                    {Array.from({ length: 20 }, (_, i) => {
                      const h = 20 + Math.sin(i * 0.8 + active * 2) * 60 + 20;
                      return <div key={i} className="flex-1 transition-all duration-700"
                        style={{ height: `${h}%`, background: i === active * 2 || i === active * 2 + 1 ? '#0a0a0a' : '#d4d4d8' }} />;
                    })}
                  </div>
                  {/* Monospace specs */}
                  <div className="space-y-3">
                    {[
                      ['Status', 'Production Ready'],
                      ['Stack', 'React · Node · PostgreSQL'],
                      ['Deploy', 'Cloud Infrastructure'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <span className="mono-label">{k}</span>
                        <span className="text-[12px] font-bold" style={{ color: '#0a0a0a' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Service index — horizontal strip */}
        <div style={{ background: '#0a0a0a' }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex overflow-x-auto no-scrollbar">
              {services.map((svc, idx) => {
                const SvcIcon = svc.icon;
                const isActive = idx === active;
                return (
                  <button key={svc.id} onClick={() => goTo(idx)}
                    className="relative flex-shrink-0 flex items-center gap-3 py-5 px-6 transition-all"
                    style={{ borderRight: '1px solid #1a1a1a', opacity: isActive ? 1 : 0.4 }}>
                    <SvcIcon className="w-4 h-4" style={{ color: '#ffffff' }} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.06em] whitespace-nowrap" style={{ color: '#ffffff' }}>
                      {svc.label}
                    </span>
                    {/* Progress line at bottom */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: '#27272a' }}>
                        <motion.div className="h-full" style={{ background: '#22c55e', width: `${progress}%` }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
