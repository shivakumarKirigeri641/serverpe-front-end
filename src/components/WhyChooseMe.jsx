import React from 'react';
import { motion } from 'framer-motion';
import { HiUser, HiCurrencyRupee, HiPhone, HiLightningBolt } from 'react-icons/hi';
import ScrollReveal from './ScrollReveal';
import logo from '../images/serverpe_logo.jpg';

const stats = [
  { value: '1:1', label: 'Direct Access',    sub: 'You talk to the engineer, not a PM' },
  { value: '₹',   label: 'Budget-Friendly',  sub: 'No agency overhead, honest pricing' },
  { value: '0',   label: 'Middlemen',         sub: 'Sole proprietor from start to finish' },
  { value: '100%', label: 'Ownership',        sub: 'Full lifecycle from build to deploy' },
];

const reasons = [
  {
    icon: HiUser,
    title: 'Sole Proprietor',
    description: 'One dedicated software engineer handling your project end-to-end. No layers, no miscommunication — just direct, focused delivery.',
    accent: '#E8941A',
    iconBg: 'linear-gradient(135deg, #E8941A, #FFC150)',
  },
  {
    icon: HiCurrencyRupee,
    title: 'Affordable Pricing',
    description: 'No bloated agency fees. Quality software at honest, affordable prices because I work solo with minimal overhead.',
    accent: '#00C99A',
    iconBg: 'linear-gradient(135deg, #00C99A, #06b6d4)',
  },
  {
    icon: HiPhone,
    title: 'Direct Contact',
    description: "No customer care queues. Reach me directly. Expect some delay as I balance a full-time IT role, but you'll always get a response.",
    accent: '#FFC150',
    iconBg: 'linear-gradient(135deg, #FFC150, #FF8A50)',
  },
  {
    icon: HiLightningBolt,
    title: 'Individual Handled',
    description: 'Every project receives my personal attention. From architecture to deployment — I own the full lifecycle of your application.',
    accent: '#FF5E47',
    iconBg: 'linear-gradient(135deg, #FF5E47, #E8941A)',
  },
];

const WhyChooseMe = () => {
  return (
    <section id="why-us" className="relative py-24 lg:py-32" style={{ background: 'var(--bg-base)' }}>
      {/* Background Decor */}
      <div className="absolute inset-0 dot-pattern opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,148,26,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full badge-amber mb-5">Why Choose Me</span>
            <h2 className="text-headline mb-5">
              Enterprise quality.{' '}
              <span className="gradient-text">Indie speed.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--ink-500)' }}>
              I'm a software engineer and sole proprietor from{' '}
              <strong style={{ color: 'var(--ink-900)', fontWeight: 700 }}>ServerPe App Solutions</strong>
              {' '}— ready to deliver production-grade solutions at affordable prices.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal delay={0.05}>
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-16 rounded-3xl overflow-hidden shadow-md border"
            style={{ background: 'var(--border-subtle)', borderColor: 'var(--border-subtle)' }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center p-10 cursor-default"
                style={{ background: '#FFF' }}
                whileHover={{ background: 'var(--bg-elevated)' }}
                transition={{ duration: 0.2 }}
              >
                <p
                  className="font-display font-bold mb-3 gradient-text"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', lineHeight: 1 }}
                >
                  {stat.value}
                </p>
                <p className="font-bold text-[14px] mb-2 tracking-tight" style={{ color: 'var(--ink-900)' }}>{stat.label}</p>
                <p className="font-medium" style={{ fontSize: 12, color: 'var(--ink-300)' }}>{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <ScrollReveal key={reason.title} delay={idx * 0.08} spring>
                <motion.div
                  whileHover={{ y: -10, borderColor: `${reason.accent}40` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="group relative h-full p-8 rounded-3xl overflow-hidden cursor-default glass-card"
                  style={{ background: '#FFF' }}
                >
                  {/* Corner glow on hover */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${reason.accent}08 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }}
                  />

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                    style={{ background: reason.iconBg }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-bold text-lg mb-4 tracking-tight" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>
                    {reason.title}
                  </h3>
                  <p className="font-medium" style={{ fontSize: 14, color: 'var(--ink-500)', lineHeight: 1.7 }}>
                    {reason.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-3xl"
                    style={{ background: `linear-gradient(90deg, ${reason.accent}, transparent)` }}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Trademark badge */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <div
              className="inline-flex items-center gap-5 px-7 py-4 rounded-full shadow-sm border"
              style={{ background: '#FFF', borderColor: 'var(--border-subtle)' }}
            >
              <div className="bg-white rounded-lg overflow-hidden px-2.5 py-1.5 border border-black/5 shadow-sm">
                <img src={logo} alt="ServerPe" className="h-7 w-auto object-contain" />
              </div>
              <p className="font-bold" style={{ fontSize: 13, color: 'var(--ink-300)' }}>Smart clicks, Smart taps — Trademark raised</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  );
};

export default WhyChooseMe;
