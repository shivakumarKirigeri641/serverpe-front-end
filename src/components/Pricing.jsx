import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiExclamationCircle, HiRefresh, HiSparkles, HiAcademicCap, HiPuzzle } from 'react-icons/hi';
import { getProjectPricings } from '../api/apiClient';
import ScrollReveal from './ScrollReveal';
import pricingBg from '../images/pricing_bg.png';

/* --- Fallback pricing data --- */
const fallbackData = {
  categories: [
    {
      id: 1, name: 'ServerPe App Solutions', description: 'Professional app development services',
      project_types: [
        { id: 1, name: 'Static Pages (View Only)', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 3999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 6999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 11999, features: [] },
        ]},
        { id: 2, name: 'Authentication-Based Apps (Email/SMS/WhatsApp)', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 5999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 9999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 15999, features: [] },
        ]},
        { id: 3, name: 'Role-Based Projects', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 7999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 13999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 21999, features: [] },
        ]},
        { id: 4, name: 'Booking Systems', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 9999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 15999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 24999, features: [] },
        ]},
        { id: 5, name: 'Scheduler Systems', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 7999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 13999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 21999, features: [] },
        ]},
      ],
    },
    {
      id: 2, name: 'Student Projects', description: 'Special pricing for students',
      project_types: [
        { id: 6, name: 'Mini Project (UI + Simple Logic)', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 1999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 3499, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 5999, features: [] },
        ]},
        { id: 7, name: 'Final Year Project (Web App)', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 4999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 7999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 11999, features: [] },
        ]},
        { id: 8, name: 'Desktop App (C# / Java)', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 3999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 6999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 9999, features: [] },
        ]},
        { id: 9, name: 'API + Backend Project', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 4999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 7999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 11999, features: [] },
        ]},
        { id: 10, name: 'Full Project (UI + Backend + DB)', plans: [
          { plan_id: 1, plan_name: 'Basic', price: 6999, features: [] },
          { plan_id: 2, plan_name: 'Standard', price: 11999, features: [] },
          { plan_id: 3, plan_name: 'Premium', price: 17999, features: [] },
        ]},
      ],
    },
  ],
  addons: [
    { id: 1, name: 'Project Report + Documentation', description: 'Complete project documentation', price_min: 999, price_max: 1999 },
    { id: 2, name: 'Source Code Explanation Documents', description: 'Detailed code walkthrough docs', price_min: 999, price_max: 999 },
    { id: 3, name: 'Deployment (Hosting / Server)', description: 'Full deployment setup', price_min: 1999, price_max: 1999 },
  ],
};

const tierConfig = {
  Basic:    { emoji: '🟢', color: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #34D399)' },
  Standard: { emoji: '🔵', color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)' },
  Premium:  { emoji: '🔴', color: '#E8941A', gradient: 'linear-gradient(135deg, #E8941A, #FFC150)' },
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

/* --- Skeleton loader --- */
const PricingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {[1, 2].map((i) => (
      <div key={i}>
        <div className="h-6 w-48 rounded-lg mb-6" style={{ background: 'var(--ink-100)' }} />
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="h-12 rounded-t-2xl mb-px" style={{ background: 'var(--ink-100)', opacity: 0.5 }} />
            {[1,2,3,4].map((r) => (
              <div key={r} className="h-14 mb-px" style={{ background: 'var(--bg-elevated)', opacity: 0.3 }} />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* --- Pricing Table for a Category --- */
const PricingTable = ({ category, index }) => {
  const isStudent = category.name?.toLowerCase().includes('student');
  const CategoryIcon = isStudent ? HiAcademicCap : HiSparkles;

  return (
    <ScrollReveal delay={index * 0.15}>
      <div className="mb-16">
        {/* Category header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ 
              background: isStudent ? 'rgba(167,139,250,0.1)' : 'rgba(232,148,26,0.1)',
              border: `1px solid ${isStudent ? 'rgba(167,139,250,0.2)' : 'rgba(232,148,26,0.2)'}`
            }}
          >
            <CategoryIcon className="w-6 h-6" style={{ color: isStudent ? '#8B5CF6' : '#E8941A' }} />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--ink-900)' }}>
              {isStudent ? '🎓 ' : '💼 '}{category.name}
            </h3>
            {category.description && (
              <p className="font-medium" style={{ fontSize: 13, color: 'var(--ink-500)' }}>{category.description}</p>
            )}
          </div>
        </div>

        {/* Pricing table */}
        <div className="overflow-x-auto rounded-3xl shadow-lg border bg-white" style={{ borderColor: 'var(--border-subtle)' }}>
          <table className="w-full min-w-[700px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th
                  className="text-left px-8 py-5"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--ink-300)',
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontFamily: '"Sora", sans-serif',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  Project Type
                </th>
                {['Basic', 'Standard', 'Premium'].map((tier) => {
                  const config = tierConfig[tier];
                  return (
                    <th
                      key={tier}
                      className="text-center px-4 py-5"
                      style={{
                        background: 'var(--bg-elevated)',
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontFamily: '"Sora", sans-serif',
                        borderBottom: '1px solid var(--border-subtle)',
                        color: config.color,
                      }}
                    >
                      {config.emoji} {tier}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {category.project_types?.map((pt, ptIdx) => (
                <motion.tr
                  key={pt.id || ptIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * ptIdx }}
                  style={{ background: ptIdx % 2 === 0 ? '#FFF' : 'var(--bg-elevated)05' }}
                  className="group"
                >
                  <td
                    className="px-8 py-5 transition-colors duration-200"
                    style={{
                      color: 'var(--ink-900)',
                      fontSize: 14,
                      fontWeight: 600,
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                      {pt.name}
                    </span>
                  </td>
                  {['Basic', 'Standard', 'Premium'].map((tierName) => {
                    const plan = pt.plans?.find(p => p.plan_name === tierName);
                    const config = tierConfig[tierName];
                    return (
                      <td
                        key={tierName}
                        className="text-center px-4 py-5 transition-colors duration-200"
                        style={{
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                      >
                        {plan ? (
                          <span
                            className="inline-block px-4 py-2 rounded-xl font-bold transition-all duration-300 group-hover:scale-110 shadow-sm"
                            style={{
                              fontSize: 15,
                              color: config.color,
                              background: '#FFF',
                              border: `1px solid ${config.color}20`,
                              fontFamily: '"Outfit", sans-serif',
                            }}
                          >
                            ₹{formatPrice(plan.price)}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--ink-100)', fontSize: 13 }}>—</span>
                        )}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  );
};

/* --- Add-ons section --- */
const AddonsSection = ({ addons }) => (
  <ScrollReveal delay={0.3}>
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
          <HiPuzzle className="w-6 h-6" style={{ color: '#06B6D4' }} />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--ink-900)' }}>
            🧩 Add-ons
          </h3>
          <p className="font-medium" style={{ fontSize: 13, color: 'var(--ink-500)' }}>Enhance your project with additional services</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addons?.map((addon, idx) => (
          <motion.div
            key={addon.id || idx}
            whileHover={{ y: -8, borderColor: 'rgba(6,182,212,0.3)' }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl cursor-default bg-white border border-black/[0.05] shadow-sm"
          >
            <h4 className="font-bold mb-3" style={{ color: 'var(--ink-900)', fontSize: 16, fontFamily: '"Sora", sans-serif' }}>
              {addon.name}
            </h4>
            {addon.description && (
              <p className="mb-5 font-medium" style={{ fontSize: 13, color: 'var(--ink-500)', lineHeight: 1.6 }}>
                {addon.description}
              </p>
            )}
            <p className="font-bold" style={{ fontSize: 18, color: '#06B6D4', fontFamily: '"Outfit", sans-serif' }}>
              ₹{formatPrice(addon.price_min)}
              {addon.price_max && addon.price_max !== addon.price_min && (
                <span className="opacity-60 text-sm ml-1"> – ₹{formatPrice(addon.price_max)}</span>
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </ScrollReveal>
);

/* --- Main Pricing Component --- */
const Pricing = () => {
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPricing = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProjectPricings();
      if (data.successstatus && data.data) {
        setPricingData(data.data);
      } else {
        setPricingData(fallbackData);
      }
    } catch (err) {
      setPricingData(fallbackData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPricing();
  }, [fetchPricing]);

  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.12 }}>
        <img src={pricingBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, var(--bg-base) 0%, transparent 50%, var(--bg-base) 100%)' }} />

      {/* Glows */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,148,26,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,176,158,0.05) 0%, transparent 70%)' }} />

      <div className="absolute inset-0 dot-pattern opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full badge-amber mb-5">Pricing</span>
            <h2 className="text-headline mb-5">
              Transparent pricing.{' '}
              <span className="gradient-text">No surprises.</span>
            </h2>
            <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--ink-500)' }}>
              Affordable, honest pricing for every project size — from student mini-projects
              to full-scale business applications. Choose your tier and get started.
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        {loading ? (
          <PricingSkeleton />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-16 gap-4"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-50 border border-red-100 shadow-sm">
              <HiExclamationCircle className="w-7 h-7 text-red-500" />
            </div>
            <p className="font-bold text-red-800">{error}</p>
            <button
              onClick={fetchPricing}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 btn-outline"
            >
              <HiRefresh className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        ) : pricingData ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category tables */}
              {pricingData.categories?.map((category, idx) => (
                <PricingTable key={category.id || idx} category={category} index={idx} />
              ))}

              {/* Add-ons */}
              {pricingData.addons && pricingData.addons.length > 0 && (
                <AddonsSection addons={pricingData.addons} />
              )}

              {/* Special callout */}
              <ScrollReveal delay={0.4}>
                <div
                  className="p-10 rounded-3xl mb-8 text-center shadow-sm border"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232,148,26,0.04) 0%, rgba(167,139,250,0.03) 100%)',
                    borderColor: 'rgba(232,148,26,0.15)',
                  }}
                >
                  <p className="text-xl font-bold mb-3 font-display italic" style={{ color: 'var(--accent-amber)' }}>
                    "Final year project with full explanation + viva support"
                  </p>
                  <p className="font-medium" style={{ fontSize: 14, color: 'var(--ink-500)' }}>
                    Complete hand-holding from code to documentation to viva preparation
                  </p>
                </div>
              </ScrollReveal>

              {/* GST disclaimer - UPDATED TO INCLUSIVE */}
              <ScrollReveal delay={0.45}>
                <div className="text-center mb-12">
                  <p className="font-bold" style={{ fontSize: 14, color: 'var(--ink-300)', fontStyle: 'italic' }}>
                    * All the above pricing is <span style={{ color: 'var(--accent-amber)' }}>inclusive of GST</span>. No hidden charges.
                  </p>
                </div>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal delay={0.5}>
                <div className="text-center">
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="btn-amber inline-flex items-center gap-3 px-10 py-5 rounded-full text-[16px] font-bold"
                  >
                    <HiCheckCircle className="w-6 h-6" />
                    Get a Quote — Contact Me
                  </a>
                  <p className="mt-5 font-bold" style={{ fontSize: 13, color: 'var(--ink-300)' }}>
                    Discuss your requirements and get a custom quote
                  </p>
                </div>
              </ScrollReveal>
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>

      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  );
};

export default Pricing;
