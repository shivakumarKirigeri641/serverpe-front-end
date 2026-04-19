import React from 'react';
import { motion } from 'framer-motion';
import { HiUser, HiCurrencyRupee, HiPhone, HiLightningBolt } from 'react-icons/hi';
import ScrollReveal from './ScrollReveal';
import logo from '../images/serverpe_logo.jpg';

const stats = [
  { value: '1:1', label: 'Direct Access', sub: 'You talk to the engineer, not a PM' },
  { value: '₹', label: 'Budget-Friendly', sub: 'No agency overhead, honest pricing' },
  { value: '0', label: 'Middlemen', sub: 'Sole proprietor from start to finish' },
  { value: '100%', label: 'Ownership', sub: 'Full lifecycle from build to deploy' },
];

const reasons = [
  {
    icon: HiUser,
    title: 'Sole Proprietor',
    description: 'One dedicated software engineer handling your project end-to-end. No layers, no miscommunication — just direct, focused delivery.',
    gradient: 'from-primary-500 to-primary-600',
    accent: '#4F8EFF',
  },
  {
    icon: HiCurrencyRupee,
    title: 'Affordable Pricing',
    description: 'No bloated agency fees. Quality software at honest, affordable prices because I work solo with minimal overhead.',
    gradient: 'from-emerald-500 to-teal-500',
    accent: '#34D399',
  },
  {
    icon: HiPhone,
    title: 'Direct Contact',
    description: 'No customer care queues. Reach me directly. Expect some delay as I balance a full-time IT role, but you\'ll always get a response.',
    gradient: 'from-amber-500 to-orange-500',
    accent: '#F59E0B',
  },
  {
    icon: HiLightningBolt,
    title: 'Individual Handled',
    description: 'Every project receives my personal attention. From architecture to deployment — I own the full lifecycle of your application.',
    gradient: 'from-violet-500 to-purple-500',
    accent: '#A78BFA',
  },
];

const WhyChooseMe = () => {
  return (
    <section id="why-us" className="relative py-24 lg:py-32" style={{ background: '#0B0F1A' }}>
      {/* Background accents */}
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(46,111,255,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
              style={{ background: 'rgba(46,111,255,0.1)', color: '#4F8EFF', border: '1px solid rgba(46,111,255,0.2)' }}
            >
              Why Choose Me
            </span>
            <h2 className="text-headline text-white mb-5">
              Enterprise quality.{' '}
              <span className="gradient-text">Indie speed.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              I'm a software engineer and sole proprietor from{' '}
              <strong className="text-white font-semibold">ServerPe App Solutions</strong>
              {' '}— ready to deliver production-grade solutions at affordable prices.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal delay={0.05}>
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-16 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-8"
                style={{ background: '#0B0F1A' }}
              >
                <p
                  className="font-heading font-bold mb-2"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', lineHeight: 1 }}
                >
                  {stat.value}
                </p>
                <p className="font-semibold text-sm text-white mb-1">{stat.label}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <ScrollReveal key={reason.title} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="group relative h-full p-7 rounded-2xl overflow-hidden cursor-default"
                  style={{ background: '#0F1321', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${reason.accent}18 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }}
                  />

                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-white mb-3 tracking-tight">
                    {reason.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                    {reason.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Trademark badge */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <div
              className="inline-flex items-center gap-4 px-6 py-3 rounded-full"
              style={{ background: '#0F1321', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="bg-white rounded-lg overflow-hidden px-2 py-1">
                <img src={logo} alt="ServerPe" className="h-7 w-auto object-contain" />
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Smart clicks, Smart taps — Trademark raised</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  );
};

export default WhyChooseMe;
