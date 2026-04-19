import React from 'react';
import { motion } from 'framer-motion';
import logoSmall from '../images/serverpelogo_small1.jpg';

/* ─── Dashboard Mockup ─────────────────────────────────────── */
const DashboardMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    className="relative w-full max-w-5xl mx-auto"
  >
    {/* Ambient glow */}
    <div
      className="absolute -inset-x-20 -top-10 h-64 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(46,111,255,0.22) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)' }}
    />

    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ background: '#0F1321', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 50px 100px rgba(0,0,0,0.7)' }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.05]"
        style={{ background: '#12141D' }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="flex-1 flex justify-center">
          <div
            className="h-6 rounded-lg px-6 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', minWidth: 200 }}
          >
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>app.serverpe.in/dashboard</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* App body */}
      <div className="flex" style={{ minHeight: 390 }}>
        {/* Sidebar */}
        <div
          className="hidden sm:flex w-52 flex-shrink-0 flex-col p-5 border-r border-white/[0.05]"
          style={{ background: '#0B0D18' }}
        >
          <div className="flex items-center gap-2 mb-7">
            <div className="bg-white rounded-md overflow-hidden px-1.5 py-0.5">
              <img src={logoSmall} alt="ServerPe" style={{ height: 20, width: 'auto', display: 'block' }} />
            </div>
          </div>

          <p style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', marginBottom: 8, paddingLeft: 4 }}>
            Navigation
          </p>

          {[
            { label: 'Overview', active: true },
            { label: 'Projects', active: false },
            { label: 'Alerts', active: false, badge: '3' },
            { label: 'Database', active: false },
            { label: 'Bookings', active: false },
            { label: 'Analytics', active: false },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-2 py-2 rounded-lg mb-0.5 cursor-default"
              style={{
                background: item.active ? 'rgba(46,111,255,0.12)' : 'transparent',
                color: item.active ? '#4F8EFF' : 'rgba(255,255,255,0.35)',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ background: 'currentColor', opacity: 0.7 }} />
                <span style={{ fontSize: 11, fontWeight: 500 }}>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  style={{ fontSize: 8, background: 'rgba(46,111,255,0.2)', color: '#4F8EFF', borderRadius: 999, padding: '2px 6px' }}
                >
                  {item.badge}
                </span>
              )}
            </div>
          ))}

          <div className="mt-auto pt-4 border-t border-white/[0.05]">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', fontSize: 9 }}
              >
                A
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.6)', lineHeight: 1 }}>Admin</p>
                <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>Pro Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 lg:p-6 overflow-hidden">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 3 }}>Overview</h3>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>April 2025 · All services</p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="px-3 py-1.5 rounded-lg cursor-default"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}
              >
                Last 30 days ▾
              </div>
              <div
                className="px-3 py-1.5 rounded-lg cursor-default font-medium"
                style={{ background: 'rgba(46,111,255,0.15)', border: '1px solid rgba(46,111,255,0.3)', fontSize: 10, color: '#4F8EFF' }}
              >
                + New Project
              </div>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Active Users', value: '2,847', change: '↑ 12%', color: '#4F8EFF' },
              { label: 'Live Projects', value: '18', change: '↑ 3 new', color: '#34D399' },
              { label: 'Uptime', value: '99.7%', change: '● Stable', color: '#F59E0B' },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="p-3 rounded-xl"
                style={{ background: '#131827', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>{kpi.label}</p>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#fff', lineHeight: 1, marginBottom: 6 }}>{kpi.value}</p>
                <p style={{ fontSize: 9, fontWeight: 500, color: kpi.color }}>{kpi.change}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: '#131827', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>Request Volume</p>
              <div className="flex items-center gap-3">
                {[
                  { color: '#2e6fff', label: 'API Calls' },
                  { color: '#22d3ee', label: 'DB Queries', dashed: true },
                ].map((l) => (
                  <span key={l.label} className="flex items-center gap-1">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ background: l.color }}
                    />
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{l.label}</span>
                  </span>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 340 65" style={{ width: '100%', height: 52 }}>
              <defs>
                <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2e6fff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2e6fff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,52 C30,47 50,43 70,36 C90,29 105,34 125,26 C145,18 158,20 175,14 C192,8 205,11 222,8 C239,5 255,9 272,6 C289,3 305,6 320,4 C330,3 336,5 340,4"
                fill="none" stroke="#2e6fff" strokeWidth="1.5" strokeLinecap="round"
              />
              <path
                d="M0,52 C30,47 50,43 70,36 C90,29 105,34 125,26 C145,18 158,20 175,14 C192,8 205,11 222,8 C239,5 255,9 272,6 C289,3 305,6 320,4 C330,3 336,5 340,4 L340,65 L0,65 Z"
                fill="url(#hg1)"
              />
              <path
                d="M0,60 C25,56 45,52 65,48 C85,44 100,47 120,42 C140,37 152,38 168,33 C184,28 197,30 214,26 C231,22 247,24 264,20 C281,17 296,18 312,15 C325,13 334,14 340,13"
                fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 3"
              />
              <path
                d="M0,60 C25,56 45,52 65,48 C85,44 100,47 120,42 C140,37 152,38 168,33 C184,28 197,30 214,26 C231,22 247,24 264,20 C281,17 296,18 312,15 C325,13 334,14 340,13 L340,65 L0,65 Z"
                fill="url(#hg2)"
              />
            </svg>
          </div>

          {/* Activity list */}
          <div>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>
              Recent Activity
            </p>
            {[
              { name: 'User Auth Service', time: '2m ago', status: '● Running', color: '#34D399' },
              { name: 'OTP Dispatch Queue', time: '15m ago', status: '● Running', color: '#34D399' },
              { name: 'Booking Reminder', time: '1h ago', status: '◐ Scheduled', color: '#F59E0B' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between py-1.5 px-2 rounded-lg">
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{item.name}</span>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{item.time}</span>
                  <span style={{ fontSize: 9, fontWeight: 500, color: item.color }}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Bottom fade */}
    <div
      className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
      style={{ background: 'linear-gradient(to top, #0B0F1A 0%, transparent 100%)' }}
    />
  </motion.div>
);

/* ─── Hero Section ─────────────────────────────────────────── */
const Hero = () => {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      className="relative overflow-hidden pt-[72px]"
      style={{ background: '#0B0F1A', minHeight: '100vh' }}
    >
      {/* Ambient radial glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(46,111,255,0.13) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)' }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center pt-20 mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: 'rgba(46,111,255,0.1)', border: '1px solid rgba(46,111,255,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs font-semibold text-primary-300 tracking-wide">
              Available for new projects · 2025
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-display text-center text-white max-w-4xl mx-auto"
          style={{ lineHeight: '1.05' }}
        >
          Software solutions{' '}
          <span className="gradient-text">reimagined</span>{' '}
          for smart businesses
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-subheadline text-center max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.42)' }}
        >
          From full-stack development to intelligent booking systems — affordable,
          production-grade web applications built by a dedicated sole proprietor.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300 hover:-translate-y-[2px]"
            style={{ background: '#fff', color: '#0B0F1A', boxShadow: '0 8px 24px rgba(255,255,255,0.12)' }}
          >
            Get in Touch
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
            className="px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-200 hover:-translate-y-[1px]"
            style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
          >
            Explore Services
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 pb-16"
        >
          {['Production Ready', 'PostgreSQL Expert', 'Affordable Pricing', 'Direct Contact'].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{badge}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboard mockup */}
        <DashboardMockup />

        <div className="h-8" />
      </div>
    </section>
  );
};

export default Hero;
