import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCode, HiShieldCheck, HiBell, HiDatabase,
  HiUsers, HiCube, HiCalendar, HiChartBar,
} from 'react-icons/hi';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    id: 'fullstack', icon: HiCode, label: 'Full Stack Development',
    headline: 'End-to-end applications built for scale',
    description: 'From sleek React frontends to robust Node.js backends — complete full-stack development tailored to your business. Modern stack, cloud deployment, production-ready.',
    accent: '#3B82F6', visual: 'code',
  },
  {
    id: 'auth', icon: HiShieldCheck, label: 'OTP Authentication',
    headline: 'Secure verification via SMS, Email & WhatsApp',
    description: 'Multi-channel OTP-based authentication with SMS, email, and WhatsApp integration. Bulletproof security with a seamless user experience your customers love.',
    accent: '#10B981', visual: 'auth',
  },
  {
    id: 'alerts', icon: HiBell, label: 'Alerts & Notifications',
    headline: 'Smart scheduling for every notification',
    description: 'Automated alert systems with intelligent scheduling. Push notifications, email alerts, SMS reminders — all timed perfectly for maximum engagement.',
    accent: '#F59E0B', visual: 'alerts',
  },
  {
    id: 'database', icon: HiDatabase, label: 'Database Management',
    headline: 'PostgreSQL-powered data architecture',
    description: 'Expert database architecture with PostgreSQL. Efficient data modeling, optimized queries, migrations, and rock-solid data integrity at any scale.',
    accent: '#8B5CF6', visual: 'database',
  },
  {
    id: 'booking', icon: HiCalendar, label: 'Booking Systems',
    headline: 'Complete booking lifecycle management',
    description: 'Full-featured booking platforms — create, manage, cancel, postpone, and prepone appointments across any industry. Calendar integration & automated reminders.',
    accent: '#06B6D4', visual: 'booking',
  },
  {
    id: 'analytics', icon: HiChartBar, label: 'Data Analytics',
    headline: 'Actionable insights from your data',
    description: 'Web-based analytics platforms with visual dashboards, real-time charts, and actionable business insights. See exactly what drives your users forward.',
    accent: '#EC4899', visual: 'analytics',
  },
  {
    id: 'inventory', icon: HiCube, label: 'Inventory & Billing',
    headline: 'Smart inventory with integrated billing',
    description: 'Web-based inventory management with real-time stock tracking, automated billing, GST-ready invoicing, and comprehensive reporting dashboards.',
    accent: '#F43F5E', visual: 'inventory',
  },
  {
    id: 'roles', icon: HiUsers, label: 'Role-Based Access',
    headline: 'Granular permissions and admin panels',
    description: 'User role-based applications with fine-grained permissions, multi-level admin panels, and secure access control — built for teams of any size.',
    accent: '#10B981', visual: 'roles',
  },
];

/* --- Service Visuals (Bright version) ------------------------------------- */
const ServiceVisual = ({ service }) => {
  const a = service.accent;

  if (service.visual === 'code') return (
    <div className="h-full rounded-xl overflow-hidden glass-card">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b bg-gray-50" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
        <span className="ml-3" style={{ fontSize: 10, color: 'var(--ink-300)' }}>App.jsx</span>
      </div>
      <div className="p-5 font-mono space-y-1.5" style={{ fontSize: 11 }}>
        <p><span style={{ color: '#8B5CF6' }}>import</span> <span style={{ color: 'var(--ink-900)' }}>React</span> <span style={{ color: '#8B5CF6' }}>from</span> <span style={{ color: '#10B981' }}>'react'</span>;</p>
        <p><span style={{ color: '#8B5CF6' }}>import</span> {'{'} useState {'}'} <span style={{ color: '#8B5CF6' }}>from</span> <span style={{ color: '#10B981' }}>'react'</span>;</p>
        <p className="opacity-0">&nbsp;</p>
        <p><span style={{ color: '#3B82F6' }}>const</span> <span style={{ color: '#06B6D4' }}>App</span> <span style={{ color: 'var(--ink-900)' }}>{`= () => {`}</span></p>
        <p className="ml-4"><span style={{ color: '#3B82F6' }}>const</span> <span style={{ color: 'var(--ink-900)' }}>[users, setUsers]</span> <span style={{ color: '#3B82F6' }}>=</span> <span style={{ color: '#06B6D4' }}>useState</span>([]);</p>
        <p className="ml-4 opacity-30">{'// PostgreSQL + Node.js backend'}</p>
        <p className="ml-4"><span style={{ color: '#3B82F6' }}>return</span> <span style={{ color: 'var(--ink-900)' }}>&lt;</span><span style={{ color: '#F43F5E' }}>Dashboard</span> <span style={{ color: '#3B82F6' }}>data</span>=<span style={{ color: 'var(--ink-900)' }}>{'{'}users{'}'}</span> /&gt;;</p>
        <p style={{ color: 'var(--ink-900)' }}>{'}'}</p>
      </div>
    </div>
  );

  if (service.visual === 'auth') return (
    <div className="h-full rounded-xl p-6 flex flex-col justify-center items-center glass-card">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${a}15`, border: `2px solid ${a}30` }}>
        <HiShieldCheck className="w-8 h-8" style={{ color: a }} />
      </div>
      <p className="font-bold mb-5" style={{ fontSize: 13, color: 'var(--ink-900)' }}>Verification Code</p>
      <div className="flex gap-2 mb-5">
        {['4','7','2','8','9','1'].map((d, i) => (
          <div key={i} className="w-9 h-11 rounded-lg flex items-center justify-center font-bold" style={{ background: `${a}08`, border: `1px solid ${a}30`, color: a, fontSize: 14 }}>{d}</div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${a}05`, border: `1px solid ${a}15` }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: a }} />
        <span style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 600 }}>Sent via SMS + WhatsApp</span>
      </div>
    </div>
  );

  if (service.visual === 'alerts') return (
    <div className="h-full rounded-xl p-5 glass-card">
      <p style={{ fontSize: 10, color: 'var(--ink-300)', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scheduled Alerts · Today</p>
      {[
        { time: '9:00 AM', title: 'PUC Expiry Reminder', channel: 'SMS', color: '#F59E0B' },
        { time: '11:30 AM', title: 'Booking Confirmation', channel: 'WhatsApp', color: '#10B981' },
        { time: '2:00 PM', title: 'Invoice Generated', channel: 'Email', color: '#3B82F6' },
        { time: '5:00 PM', title: 'Daily Summary', channel: 'Push', color: '#8B5CF6' },
      ].map((alert) => (
        <div key={alert.title} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: alert.color }} />
          <div className="flex-1">
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-900)' }}>{alert.title}</p>
            <p style={{ fontSize: 9, color: 'var(--ink-500)', marginTop: 2, fontWeight: 500 }}>{alert.time}</p>
          </div>
          <span className="px-2 py-0.5 rounded-full font-bold" style={{ fontSize: 9, background: `${alert.color}15`, color: alert.color }}>{alert.channel}</span>
        </div>
      ))}
    </div>
  );

  if (service.visual === 'database') return (
    <div className="h-full rounded-xl p-5 glass-card">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${a}15` }}>
          <HiDatabase className="w-3.5 h-3.5" style={{ color: a }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-700)' }}>PostgreSQL · serverpe_db</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
          <span style={{ fontSize: 9, color: '#10B981', fontWeight: 700 }}>Connected</span>
        </div>
      </div>
      {[
        { table: 'users', rows: '12,489', size: '4.2 MB' },
        { table: 'bookings', rows: '45,210', size: '12.1 MB' },
        { table: 'alerts', rows: '189,044', size: '28.5 MB' },
        { table: 'inventory', rows: '8,912', size: '2.8 MB' },
      ].map((tbl) => (
        <div key={tbl.table} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border-subtle)' }}>
          <span className="font-mono font-bold" style={{ fontSize: 10, color: a }}>◇ {tbl.table}</span>
          <span style={{ fontSize: 9, color: 'var(--ink-500)', fontWeight: 500 }}>{tbl.rows} rows · {tbl.size}</span>
        </div>
      ))}
    </div>
  );

  if (service.visual === 'booking') return (
    <div className="h-full rounded-xl p-5 glass-card">
      <div className="flex items-center justify-between mb-4">
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-900)' }}>April 2025</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: a }} /><span style={{ fontSize: 9, color: 'var(--ink-500)', fontWeight: 600 }}>Booked</span></span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-3">
        {['Mo','Tu','We','Th','Fr','Sa','Su'].map((d) => (
          <p key={d} className="text-center" style={{ fontSize: 8, color: 'var(--ink-300)', fontWeight: 700 }}>{d}</p>
        ))}
        {Array.from({ length: 28 }, (_, i) => (
          <div key={i} className="aspect-square rounded-md flex items-center justify-center font-bold"
            style={{
              fontSize: 9,
              background: [2,5,8,13,17,20,24].includes(i) ? a : 'var(--bg-elevated)',
              color: [2,5,8,13,17,20,24].includes(i) ? '#FFF' : 'var(--ink-300)',
            }}>
            {i + 1}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 9, color: 'var(--ink-500)', textAlign: 'center', fontWeight: 600 }}>8 bookings this week</p>
    </div>
  );

  if (service.visual === 'analytics') return (
    <div className="h-full rounded-xl p-5 glass-card">
      <div className="flex items-center justify-between mb-3">
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-900)' }}>User Growth</p>
        <span style={{ fontSize: 9, color: '#10B981', fontWeight: 700 }}>↑ 23% this month</span>
      </div>
      <svg viewBox="0 0 220 80" style={{ width: '100%', height: 64, marginBottom: 12 }}>
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={a} stopOpacity="0.2" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,70 C20,65 35,60 55,52 C75,44 85,48 105,38 C125,28 135,30 155,20 C175,10 185,14 205,8 L220,5" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0,70 C20,65 35,60 55,52 C75,44 85,48 105,38 C125,28 135,30 155,20 C175,10 185,14 205,8 L220,5 L220,80 L0,80 Z" fill="url(#sg)" />
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[{ l: 'Views', v: '124K' }, { l: 'Sessions', v: '89K' }, { l: 'Conv.', v: '12%' }].map((m) => (
          <div key={m.l} className="text-center p-2 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
            <p className="font-bold" style={{ fontSize: 14, color: 'var(--ink-900)' }}>{m.v}</p>
            <p style={{ fontSize: 8, color: 'var(--ink-300)', fontWeight: 700 }}>{m.l}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (service.visual === 'inventory') return (
    <div className="h-full rounded-xl p-5 glass-card">
      <div className="flex items-center justify-between mb-4">
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-900)' }}>Stock Status</p>
        <span className="px-2 py-0.5 rounded-full font-bold" style={{ fontSize: 9, background: '#F43F5E15', color: '#F43F5E' }}>3 Low</span>
      </div>
      {[
        { name: 'Product A', pct: 82, color: '#10B981' },
        { name: 'Product B', pct: 34, color: '#F59E0B' },
        { name: 'Product C', pct: 12, color: '#F43F5E' },
      ].map((item) => (
        <div key={item.name} className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span style={{ fontSize: 10, color: 'var(--ink-500)', fontWeight: 600 }}>{item.name}</span>
            <span style={{ fontSize: 9, color: item.color, fontWeight: 700 }}>{item.pct} units</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--bg-elevated)' }}>
            <div className="h-1.5 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full rounded-xl p-5 glass-card">
      <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-900)', marginBottom: 16 }}>ACCESS ROLES</p>
      {[
        { role: 'Super Admin', color: '#8B5CF6', users: 1 },
        { role: 'Manager', color: '#3B82F6', users: 4 },
        { role: 'Operator', color: '#10B981', users: 12 },
        { role: 'Viewer', color: '#94A3B8', users: 28 },
      ].map((r) => (
        <div key={r.role} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-900)' }}>{r.role}</p>
          </div>
          <span style={{ fontSize: 9, color: 'var(--ink-500)', fontWeight: 600 }}>{r.users} Users</span>
        </div>
      ))}
    </div>
  );
};

/* --- Services Section ----------------------------------------------------- */
const Services = () => {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = current.icon;

  return (
    <section id="services" className="relative py-24 lg:py-32" style={{ background: 'var(--bg-base)' }}>
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,148,26,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full badge-amber mb-5">Services</span>
            <h2 className="text-headline mb-5">
              Everything you need to{' '}
              <span className="gradient-text">build & grow</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--ink-500)' }}>
              Comprehensive software solutions covering the full spectrum of web
              application development — from auth to analytics.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-column layout */}
        <ScrollReveal delay={0.1}>
          <div className="grid lg:grid-cols-[280px_1fr] gap-5 lg:gap-10 items-start">

            {/* Left: Nav list */}
            <div className="lg:sticky lg:top-28 space-y-1">
              {services.map((svc, idx) => {
                const NavIcon = svc.icon;
                const isActive = idx === active;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setActive(idx)}
                    className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-300"
                    style={{
                      background: isActive ? 'var(--bg-surface)' : 'transparent',
                      boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                      border: isActive ? '1px solid var(--border-subtle)' : '1px solid transparent',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? 'rgba(232,148,26,0.1)' : 'var(--bg-elevated)' }}
                    >
                      <NavIcon className="w-4.5 h-4.5" style={{ color: isActive ? 'var(--accent-amber)' : 'var(--ink-300)' }} />
                    </div>
                    <span
                      className="text-[14px] font-bold flex-1"
                      style={{ color: isActive ? 'var(--ink-900)' : 'var(--ink-500)' }}
                    >
                      {svc.label}
                    </span>
                    {isActive && (
                      <motion.span layoutId="svc-arrow" style={{ color: 'var(--accent-amber)', fontSize: 18 }}>→</motion.span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Feature panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-3xl overflow-hidden glass-card"
                style={{ background: 'var(--bg-surface)' }}
              >
                {/* Visual */}
                <div className="p-6 lg:p-8" style={{ background: 'var(--bg-elevated)', height: 280 }}>
                  <ServiceVisual service={current} />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: `${current.accent}15`, border: `1px solid ${current.accent}30` }}>
                      <Icon className="w-6 h-6" style={{ color: current.accent }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: current.accent }}>
                      {current.label}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold mb-5 tracking-tight font-display" style={{ color: 'var(--ink-900)' }}>
                    {current.headline}
                  </h3>
                  <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--ink-500)' }}>
                    {current.description}
                  </p>

                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 text-[15px] font-bold transition-all duration-200 hover:gap-3"
                    style={{ color: 'var(--accent-amber)' }}
                  >
                    Start this project
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>

      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  );
};

export default Services;
