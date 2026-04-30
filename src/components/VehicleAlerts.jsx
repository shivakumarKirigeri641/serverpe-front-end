import React from 'react';
import { motion } from 'framer-motion';
import { HiShieldCheck, HiQrcode, HiChatAlt2, HiBell, HiExternalLink } from 'react-icons/hi';

const features = [
  { icon: HiBell, title: 'Expiry Alerts', description: 'Automated reminders for insurance, PUC, fitness, and other vehicle document expiry dates.' },
  { icon: HiQrcode, title: 'QR Stickers', description: 'Unique QR codes for your vehicle that let anyone contact you about parking concerns — securely.' },
  { icon: HiChatAlt2, title: 'Temporary Chat', description: 'Secure, anonymous temporary chat so the public can reach you without sharing personal information.' },
  { icon: HiShieldCheck, title: 'Privacy First', description: 'No personal data shared — phone number, name, and details stay completely private.' },
];

const VehicleAlerts = () => {
  return (
    <section id="vehicle-alerts" className="relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="absolute inset-0 line-grid-dark pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Top bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-2.5 h-2.5 rounded-full pulse-green" />
          <span className="mono-label" style={{ color: '#22c55e' }}>Live Product</span>
          <span className="mono-label">·</span>
          <span className="mono-label">vehicle-alerts.in</span>
        </div>

        {/* Massive headline */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start mb-20">
          <div>
            <h2 className="text-display mb-8" style={{ color: '#ffffff' }}>
              Vehicle Alerts.
              <br />
              <span style={{ color: '#22c55e' }}>Already serving owners.</span>
            </h2>
            <div className="brutalist-line-white mb-6" />
            <p className="text-[17px] leading-[1.7] font-medium max-w-lg" style={{ color: '#71717a' }}>
              <strong style={{ color: '#ffffff' }}>vehicle-alerts.in</strong> is live —
              providing vehicle owners with document expiry alerts and QR stickers to resolve
              parking concerns through secure, anonymous temporary chat.
            </p>
          </div>

          {/* CTA column */}
          <div className="flex flex-col gap-4 lg:pt-8">
            <a href="https://vehicle-alerts.in" target="_blank" rel="noopener noreferrer"
              className="btn-white inline-flex items-center gap-3 justify-center">
              Visit vehicle-alerts.in <HiExternalLink className="w-4 h-4" />
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-ghost-white inline-flex items-center justify-center gap-3">
              Build something similar
            </a>
            <div className="flex items-center gap-3 mt-4 px-1">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: '#ffffff' }}>
                <HiShieldCheck className="w-5 h-5" style={{ color: '#0a0a0a' }} />
              </div>
              <div>
                <p className="text-[12px] font-bold" style={{ color: '#ffffff' }}>Trusted Aggregator Access</p>
                <p className="text-[10px] font-medium" style={{ color: '#a1a1aa' }}>Official vehicle details for accurate alerts & reminders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features — horizontal strip layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0" style={{ borderTop: '1px solid #1a1a1a' }}>
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="py-10 px-8 group cursor-default"
                style={{ borderRight: idx < 3 ? '1px solid #1a1a1a' : 'none' }}>
                <div className="flex items-center gap-3 mb-5">
                  <Icon className="w-5 h-5" style={{ color: '#22c55e' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: '#ffffff' }}>
                    {item.title}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.7] font-medium" style={{ color: '#a1a1aa' }}>
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VehicleAlerts;
