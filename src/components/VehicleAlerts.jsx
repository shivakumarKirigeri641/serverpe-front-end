import React from 'react';
import { motion } from 'framer-motion';
import { HiShieldCheck, HiQrcode, HiChatAlt2, HiBell, HiExternalLink } from 'react-icons/hi';
import ScrollReveal from './ScrollReveal';

const highlights = [
  {
    icon: HiBell,
    title: 'Expiry Alerts',
    description: 'Automated reminders for insurance, PUC, fitness, and other vehicle document expiry dates.',
  },
  {
    icon: HiQrcode,
    title: 'QR Stickers',
    description: 'Unique QR codes for your vehicle that let anyone contact you about parking concerns — securely.',
  },
  {
    icon: HiChatAlt2,
    title: 'Temporary Chat',
    description: 'Secure, anonymous temporary chat so the public can reach you without sharing personal information.',
  },
  {
    icon: HiShieldCheck,
    title: 'Privacy First',
    description: 'No personal data shared — phone number, name, and details stay completely private.',
  },
];

const VehicleAlerts = () => {
  return (
    <section id="vehicle-alerts" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #080B14 0%, #0B0F1A 50%, #0D1020 100%)' }} />

      {/* Decorative radial glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(46,111,255,0.09) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">
                    Live Product · vehicle-alerts.in
                  </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <h2 className="text-headline text-white mb-4">
                Vehicle Alerts.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-primary-300">
                  Already serving owners.
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                <strong className="text-white font-medium">vehicle-alerts.in</strong> is live —
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
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-dark-900 text-[14px] font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 shadow-xl"
                >
                  Visit vehicle-alerts.in
                  <HiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-white/70 text-[14px] font-medium border border-white/10 rounded-full hover:bg-white/5 hover:text-white transition-all duration-200"
                >
                  Build something similar
                </a>
              </div>
            </ScrollReveal>

            {/* Trusted aggregator badge */}
            <ScrollReveal direction="left" delay={0.25}>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <HiShieldCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70">Trusted Aggregator Access</p>
                  <p className="text-[11px] text-white/40">Official vehicle details for accurate alerts &amp; reminders</p>
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
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-primary-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-primary-500/30 transition-all">
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <h3 className="font-heading font-semibold text-[15px] text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-white/40 leading-relaxed">
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
