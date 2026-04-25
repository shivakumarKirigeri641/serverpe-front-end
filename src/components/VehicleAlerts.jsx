import React from 'react';
import { motion } from 'framer-motion';
import { HiShieldCheck, HiQrcode, HiChatAlt2, HiBell, HiExternalLink } from 'react-icons/hi';
import ScrollReveal from './ScrollReveal';

const highlights = [
  {
    icon: HiBell,
    title: 'Expiry Alerts',
    description: 'Automated reminders for insurance, PUC, fitness, and other vehicle document expiry dates.',
    accent: '#00B09E',
    bg: 'rgba(0,176,158,0.08)',
  },
  {
    icon: HiQrcode,
    title: 'QR Stickers',
    description: 'Unique QR codes for your vehicle that let anyone contact you about parking concerns — securely.',
    accent: '#E8941A',
    bg: 'rgba(232,148,26,0.08)',
  },
  {
    icon: HiChatAlt2,
    title: 'Temporary Chat',
    description: 'Secure, anonymous temporary chat so the public can reach you without sharing personal information.',
    accent: '#2DD4BF',
    bg: 'rgba(45,212,191,0.08)',
  },
  {
    icon: HiShieldCheck,
    title: 'Privacy First',
    description: 'No personal data shared — phone number, name, and details stay completely private.',
    accent: '#00B09E',
    bg: 'rgba(0,176,158,0.08)',
  },
];

const VehicleAlerts = () => {
  return (
    <section id="vehicle-alerts" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#F0F9F8' }}>
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,176,158,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,148,26,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,176,158,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,176,158,0.2) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div>
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: 'rgba(0,176,158,0.08)', border: '1px solid rgba(0,176,158,0.2)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00B09E' }} />
                <span className="text-xs font-bold tracking-wide uppercase" style={{ color: '#00B09E', fontFamily: '"Sora", sans-serif' }}>
                  Live Product · vehicle-alerts.in
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <h2 className="text-headline mb-4" style={{ color: 'var(--ink-900)', fontFamily: '"Fraunces", Georgia, serif' }}>
                Vehicle Alerts.{' '}
                <span className="gradient-text-cool">
                  Already serving owners.
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--ink-500)' }}>
                <strong style={{ color: 'var(--ink-900)', fontWeight: 700 }}>vehicle-alerts.in</strong> is live —
                providing vehicle owners with document expiry alerts and QR stickers to resolve
                parking concerns through secure, anonymous temporary chat.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="https://vehicle-alerts.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold rounded-full transition-all duration-300 hover:-translate-y-[2px]"
                  style={{
                    background: 'linear-gradient(135deg, #00B09E, #2DD4BF)',
                    color: '#FFF',
                    boxShadow: '0 8px 24px rgba(0,176,158,0.25)',
                    fontFamily: '"Sora", sans-serif',
                  }}
                >
                  Visit vehicle-alerts.in
                  <HiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-outline px-7 py-4 text-[14px] font-bold rounded-full border-teal-500/20 text-teal-800 hover:bg-teal-50"
                >
                  Build something similar
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.25}>
              <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass-card"
                style={{ background: '#FFF', borderColor: 'rgba(0,176,158,0.1)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #00B09E, #2DD4BF)' }}>
                  <HiShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--ink-900)' }}>Trusted Aggregator Access</p>
                  <p style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 600 }}>Official vehicle details for accurate alerts &amp; reminders</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={0.1 + idx * 0.08} direction="right">
                  <motion.div
                    whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(0,176,158,0.08)' }}
                    transition={{ duration: 0.2 }}
                    className="p-7 rounded-2xl cursor-default transition-all duration-300 bg-white border border-teal-500/10 shadow-sm"
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: item.bg }}>
                      <Icon className="w-5.5 h-5.5" style={{ color: item.accent }} />
                    </div>
                    <h3 className="font-bold text-[16px] mb-3" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed font-medium" style={{ color: 'var(--ink-500)' }}>
                      {item.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleAlerts;
