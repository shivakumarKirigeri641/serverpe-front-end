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
    accent: '#4F8EFF', visual: 'code',
  },
  {
    id: 'auth', icon: HiShieldCheck, label: 'OTP Authentication',
    headline: 'Secure verification via SMS, Email & WhatsApp',
    description: 'Multi-channel OTP-based authentication with SMS, email, and WhatsApp integration. Bulletproof security with a seamless user experience your customers love.',
    accent: '#34D399', visual: 'auth',
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
    accent: '#A78BFA', visual: 'database',
  },
  {
    id: 'booking', icon: HiCalendar, label: 'Booking Systems',
    headline: 'Complete booking lifecycle management',
    description: 'Full-featured booking platforms — create, manage, cancel, postpone, and prepone appointments across any industry. Calendar integration & automated reminders.',
    accent: '#22D3EE', visual: 'booking',
  },
  {
    id: 'analytics', icon: HiChartBar, label: 'Data Analytics',
    headline: 'Actionable insights from your data',
    description: 'Web-based analytics platforms with visual dashboards, real-time charts, and actionable business insights. See exactly what drives your users forward.',
    accent: '#F472B6', visual: 'analytics',
  },
  {
    id: 'inventory', icon: HiCube, label: 'Inventory & Billing',
    headline: 'Smart inventory with integrated billing',
    description: 'Web-based inventory management with real-time stock tracking, automated billing, GST-ready invoicing, and comprehensive reporting dashboards.',
    accent: '#FB7185', visual: 'inventory',
  },
  {
    id: 'roles', icon: HiUsers, label: 'Role-Based Access',
    headline: 'Granular permissions and admin panels',
    description: 'User role-based applications with fine-grained permissions, multi-level admin panels, and secure access control — built for teams of any size.',
    accent: '#34D399', visual: 'roles',
  },
];

/* ─── Service Visuals ──────────────────────────────────────── */
const ServiceVisual = ({ service }) => {
  const a = service.accent;

  if (service.visual === 'code') return (
    <div className="h-full rounded-xl overflow-hidden" style={{ background: '#0B0D18', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
        <span className="ml-3" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>App.jsx</span>
      </div>
      <div className="p-5 font-mono space-y-1.5" style={{ fontSize: 11 }}>
        <p><span style={{ color: '#A78BFA' }}>import</span> <span style={{ color: '#E2E8F0' }}>React</span> <span style={{ color: '#A78BFA' }}>from</span> <span style={{ color: '#34D399' }}>'react'</span>;</p>
        <p><span style={{ color: '#A78BFA' }}>import</span> {'{'} useState {'}'} <span style={{ color: '#A78BFA' }}>from</span> <span style={{ color: '#34D399' }}>'react'</span>;</p>
        <p style={{ color: 'rgba(255,255,255,0.15)' }}>&nbsp;</p>
        <p><span style={{ color: '#4F8EFF' }}>const</span> <span style={{ color: '#22D3EE' }}>App</span> <span style={{ color: '#E2E8F0' }}>= () =&gt; {'{'}</span></p>
        <p className="ml-4"><span style={{ color: '#4F8EFF' }}>const</span> <span style={{ color: '#E2E8F0' }}>[users, setUsers]</span> <span style={{ color: '#4F8EFF' }}>=</span> <span style={{ color: '#22D3EE' }}>useState</span>([]);</p>
        <p className="ml-4" style={{ color: 'rgba(255,255,255,0.2)' }}>{'// PostgreSQL + Node.js backend'}</p>
        <p className="ml-4"><span style={{ color: '#4F8EFF' }}>return</span> <span style={{ color: '#E2E8F0' }}>&lt;</span><span style={{ color: '#FB7185' }}>Dashboard</span> <span style={{ color: '#4F8EFF' }}>data</span>=<span style={{ color: '#E2E8F0' }}>{'{'}users{'}'}</span> /&gt;;</p>
        <p style={{ color: '#E2E8F0' }}>{'}'}</p>
      </div>
    </div>
  );

  if (service.visual === 'auth') return (
    <div className="h-full rounded-xl p-6 flex flex-col justify-center items-center" style={{ background: '#0B0D18', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${a}18`, border: `2px solid ${a}35` }}>
        <HiShieldCheck className="w-8 h-8" style={{ color: a }} />
      </div>
      <p className="text-white font-semibold mb-5" style={{ fontSize: 13 }}>Verification Code</p>
      <div className="flex gap-2 mb-5">
        {['4','7','2','8','9','1'].map((d, i) => (
          <div key={i} className="w-9 h-11 rounded-lg flex items-center justify-center font-bold" style={{ background: `${a}18`, border: `1px solid ${a}40`, color: a, fontSize: 14 }}>{d}</div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${a}10`, border: `1px solid ${a}20` }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: a }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Sent via SMS + WhatsApp</span>
      </div>
    </div>
  );

  if (service.visual === 'alerts') return (
    <div className="h-full rounded-xl p-5" style={{ background: '#0B0D18', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginBottom: 16 }}>Scheduled Alerts · Today</p>
      {[
        { time: '9:00 AM', title: 'PUC Expiry Reminder', channel: 'SMS', color: '#F59E0B' },
        { time: '11:30 AM', title: 'Booking Confirmation', channel: 'WhatsApp', color: '#34D399' },
        { time: '2:00 PM', title: 'Invoice Generated', channel: 'Email', color: '#4F8EFF' },
        { time: '5:00 PM', title: 'Daily Summary', channel: 'Push', color: '#A78BFA' },
      ].map((alert) => (
        <div key={alert.title} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: alert.color }} />
          <div className="flex-1">
            <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{alert.title}</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{alert.time}</p>
          </div>
          <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 9, background: `${alert.color}20`, color: alert.color }}>{alert.channel}</span>
        </div>
      ))}
    </div>
  );

  if (service.visual === 'database') return (
    <div className="h-full rounded-xl p-5" style={{ background: '#0B0D18', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${a}20` }}>
          <HiDatabase className="w-3.5 h-3.5" style={{ color: a }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>PostgreSQL · serverpe_db</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span style={{ fontSize: 9, color: '#34D399' }}>Connected</span>
        </div>
      </div>
      {[
        { table: 'users', rows: '12,489', size: '4.2 MB' },
        { table: 'bookings', rows: '45,210', size: '12.1 MB' },
        { table: 'alerts', rows: '189,044', size: '28.5 MB' },
        { table: 'inventory', rows: '8,912', size: '2.8 MB' },
      ].map((tbl) => (
        <div key={tbl.table} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
          <span className="font-mono" style={{ fontSize: 10, color: `${a}CC` }}>▦ {tbl.table}</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{tbl.rows} rows · {tbl.size}</span>
        </div>
      ))}
    </div>
  );

  if (service.visual === 'booking') return (
    <div className="h-full rounded-xl p-5" style={{ background: '#0B0D18', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-4">
        <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>April 2025</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: a }} /><span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>Booked</span></span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white/10" /><span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>Available</span></span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-3">
        {['Mo','Tu','We','Th','Fr','Sa','Su'].map((d) => (
          <p key={d} className="text-center" style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>{d}</p>
        ))}
        {Array.from({ length: 28 }, (_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md flex items-center justify-center font-medium"
            style={{
              fontSize: 9,
              background: [2,5,8,13,17,20,24].includes(i) ? a : 'rgba(255,255,255,0.03)',
              color: [2,5,8,13,17,20,24].includes(i) ? '#0B0F1A' : 'rgba(255,255,255,0.35)',
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>8 bookings this week</p>
    </div>
  );

  if (service.visual === 'analytics') return (
    <div className="h-full rounded-xl p-5" style={{ background: '#0B0D18', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-3">
        <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>User Growth</p>
        <span style={{ fontSize: 9, color: '#34D399' }}>↑ 23% this month</span>
      </div>
      <svg viewBox="0 0 220 80" style={{ width: '100%', height: 64, marginBottom: 12 }}>
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={a} stopOpacity="0.3" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,70 C20,65 35,60 55,52 C75,44 85,48 105,38 C125,28 135,30 155,20 C175,10 185,14 205,8 L220,5" fill="none" stroke={a} strokeWidth="1.5" />
        <path d="M0,70 C20,65 35,60 55,52 C75,44 85,48 105,38 C125,28 135,30 155,20 C175,10 185,14 205,8 L220,5 L220,80 L0,80 Z" fill="url(#ag)" />
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[{ l: 'Page Views', v: '124K' }, { l: 'Sessions', v: '89K' }, { l: 'Conversions', v: '12%' }].map((m) => (
          <div key={m.l} className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <p className="text-white font-bold" style={{ fontSize: 14 }}>{m.v}</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{m.l}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (service.visual === 'inventory') return (
    <div className="h-full rounded-xl p-5" style={{ background: '#0B0D18', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-4">
        <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>Inventory Status</p>
        <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 9, background: 'rgba(251,113,133,0.15)', color: '#FB7185' }}>3 Low Stock</span>
      </div>
      {[
        { name: 'Product A', pct: 82, color: '#34D399' },
        { name: 'Product B', pct: 34, color: '#F59E0B' },
        { name: 'Product C', pct: 12, color: '#FB7185' },
        { name: 'Product D', pct: 95, color: '#34D399' },
      ].map((item) => (
        <div key={item.name} className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{item.name}</span>
            <span style={{ fontSize: 9, color: item.color }}>{item.pct} units</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-1.5 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
          </div>
        </div>
      ))}
    </div>
  );

  // roles
  return (
    <div className="h-full rounded-xl p-5" style={{ background: '#0B0D18', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Access Roles</p>
      {[
        { role: 'Super Admin', perms: ['All Access'], color: '#A78BFA', users: 1 },
        { role: 'Manager', perms: ['Read', 'Write'], color: '#4F8EFF', users: 4 },
        { role: 'Operator', perms: ['Read', 'Execute'], color: '#34D399', users: 12 },
        { role: 'Viewer', perms: ['Read'], color: '#94A3B8', users: 28 },
      ].map((r) => (
        <div key={r.role} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
            <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}>{r.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {r.perms.map((p) => (
                <span key={p} className="px-1.5 py-0.5 rounded" style={{ fontSize: 8, background: `${r.color}20`, color: r.color }}>{p}</span>
              ))}
            </div>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{r.users}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─── Services Section ─────────────────────────────────────── */
const Services = () => {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = current.icon;

  return (
    <section id="services" className="relative py-24 lg:py-32" style={{ background: '#0B0F1A' }}>
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
              style={{ background: 'rgba(46,111,255,0.1)', color: '#4F8EFF', border: '1px solid rgba(46,111,255,0.2)' }}
            >
              Services
            </span>
            <h2 className="text-headline text-white mb-5">
              Everything you need to{' '}
              <span className="gradient-text">build & grow</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Comprehensive software solutions covering the full spectrum of web
              application development — from auth to analytics.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-column layout */}
        <ScrollReveal delay={0.1}>
          <div className="grid lg:grid-cols-[280px_1fr] gap-5 lg:gap-8 items-start">

            {/* Left: Nav list */}
            <div className="lg:sticky lg:top-28 space-y-0.5">
              {services.map((svc, idx) => {
                const NavIcon = svc.icon;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setActive(idx)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: idx === active ? `${svc.accent}12` : 'transparent',
                      border: idx === active ? `1px solid ${svc.accent}25` : '1px solid transparent',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: idx === active ? `${svc.accent}20` : 'rgba(255,255,255,0.05)' }}
                    >
                      <NavIcon
                        className="w-4 h-4"
                        style={{ color: idx === active ? svc.accent : 'rgba(255,255,255,0.35)' }}
                      />
                    </div>
                    <span
                      className="text-[13px] font-medium flex-1"
                      style={{ color: idx === active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}
                    >
                      {svc.label}
                    </span>
                    {idx === active && (
                      <motion.span layoutId="arrow" style={{ color: svc.accent, fontSize: 14 }}>→</motion.span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Feature panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#0F1321', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Visual */}
                <div className="p-5" style={{ height: 260 }}>
                  <ServiceVisual service={current} />
                </div>

                {/* Content */}
                <div
                  className="p-6 lg:p-8"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${current.accent}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: current.accent }} />
                    </div>
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: current.accent }}
                    >
                      {current.label}
                    </span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight">
                    {current.headline}
                  </h3>
                  <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {current.description}
                  </p>

                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                    style={{ color: current.accent }}
                  >
                    Start this project
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
