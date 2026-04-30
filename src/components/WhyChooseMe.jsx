import React from 'react';
import { motion } from 'framer-motion';
import logo from '../images/serverpelogo_small.jpg';

const reasons = [
  { num: '01', title: 'Sole Proprietor', description: 'One dedicated software engineer handling your project end-to-end. No layers, no miscommunication — just direct, focused delivery.' },
  { num: '02', title: 'Affordable Pricing', description: 'No bloated agency fees. Quality software at honest, affordable prices because I work solo with minimal overhead.' },
  { num: '03', title: 'Direct Contact', description: "No customer care queues. Reach me directly. Expect some delay as I balance a full-time IT role, but you'll always get a response." },
  { num: '04', title: 'Individual Handled', description: 'Every project receives my personal attention. From architecture to deployment — I own the full lifecycle of your application.' },
];

const WhyChooseMe = () => {
  return (
    <section id="why-me" className="relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0 line-grid pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Header — asymmetric */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-20">
          <div>
            <span className="marker marker-light mb-4 inline-block">Why Choose Me</span>
            <h2 className="text-headline">
              Enterprise quality.
              <br />
              <span style={{ color: '#2563eb' }}>Indie speed.</span>
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-[15px] font-medium leading-[1.7]" style={{ color: '#71717a' }}>
              I'm a software engineer and sole proprietor from{' '}
              <strong style={{ color: '#0a0a0a' }}>ServerPe App Solutions</strong>
              {' '}— ready to deliver production-grade solutions at affordable prices.
            </p>
          </div>
        </div>

        {/* Giant stats band */}
        <div className="mb-20" style={{ borderTop: '4px solid #0a0a0a', borderBottom: '1px solid #e5e7eb' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: '1:1', label: 'Direct Access', sub: 'You talk to the engineer, not a PM' },
              { value: '₹', label: 'Budget-Friendly', sub: 'No agency overhead, honest pricing' },
              { value: '0', label: 'Middlemen', sub: 'Sole proprietor from start to finish' },
              { value: '100%', label: 'Ownership', sub: 'Full lifecycle from build to deploy' },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-10 px-6 lg:px-10 cursor-default group"
                style={{ borderRight: i < 3 ? '1px solid #e5e7eb' : 'none' }}>
                <p className="font-black mb-2 group-hover:text-blue-600 transition-colors"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 0.9, color: '#0a0a0a', letterSpacing: '-0.05em' }}>
                  {stat.value}
                </p>
                <p className="text-[13px] font-bold mb-1" style={{ color: '#0a0a0a' }}>{stat.label}</p>
                <p className="text-[12px] font-medium" style={{ color: '#a1a1aa' }}>{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reasons — editorial numbered list */}
        <div className="grid lg:grid-cols-2 gap-0" style={{ borderTop: '1px solid #e5e7eb' }}>
          {reasons.map((reason, idx) => (
            <motion.div key={reason.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="py-10 px-0 lg:px-10 group cursor-default"
              style={{
                borderBottom: '1px solid #e5e7eb',
                borderRight: idx % 2 === 0 ? '1px solid #e5e7eb' : 'none',
                background: idx === 3 ? '#0a0a0a' : 'transparent',
              }}>
              <div className="flex gap-6">
                <span className="font-mono text-[48px] font-black leading-none flex-shrink-0 group-hover:text-blue-600 transition-colors"
                  style={{ color: idx === 3 ? '#27272a' : '#f3f4f6' }}>
                  {reason.num}
                </span>
                <div>
                  <h3 className="text-[20px] font-black mb-3"
                    style={{ color: idx === 3 ? '#ffffff' : '#0a0a0a', letterSpacing: '-0.02em' }}>
                    {reason.title}
                  </h3>
                  <p className="text-[14px] leading-[1.7] font-medium"
                    style={{ color: idx === 3 ? '#71717a' : '#71717a' }}>
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand stamp */}
        <div className="mt-16 flex items-center gap-6">
          <div className="w-12 h-12 flex-shrink-0">
            <img src={logo} alt="ServerPe" className="h-full w-full object-contain" style={{ mixBlendMode: 'multiply' }} />
          </div>
          <div>
            <p className="text-[13px] font-bold" style={{ color: '#0a0a0a' }}>Smart clicks, Smart taps</p>
            <p className="text-[11px] font-medium" style={{ color: '#a1a1aa' }}>Trademark raised — ServerPe App Solutions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
