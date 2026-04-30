import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiExclamationCircle, HiRefresh, HiPuzzle } from 'react-icons/hi';
import { getProjectPricings } from '../api/apiClient';

const fallbackData = {
  categories: [
    { id: 1, name: 'ServerPe App Solutions', description: 'Professional app development services', project_types: [
      { id: 1, name: 'Static Pages (View Only)', plans: [{ plan_id: 1, plan_name: 'Basic', price: 3999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 6999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 11999, features: [] }]},
      { id: 2, name: 'Authentication-Based Apps (Email/SMS/WhatsApp)', plans: [{ plan_id: 1, plan_name: 'Basic', price: 5999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 9999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 15999, features: [] }]},
      { id: 3, name: 'Role-Based Projects', plans: [{ plan_id: 1, plan_name: 'Basic', price: 7999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 13999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 21999, features: [] }]},
      { id: 4, name: 'Booking Systems', plans: [{ plan_id: 1, plan_name: 'Basic', price: 9999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 15999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 24999, features: [] }]},
      { id: 5, name: 'Scheduler Systems', plans: [{ plan_id: 1, plan_name: 'Basic', price: 7999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 13999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 21999, features: [] }]},
    ]},
    { id: 2, name: 'Student Projects', description: 'Special pricing for students', project_types: [
      { id: 6, name: 'Mini Project (UI + Simple Logic)', plans: [{ plan_id: 1, plan_name: 'Basic', price: 1999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 3499, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 5999, features: [] }]},
      { id: 7, name: 'Final Year Project (Web App)', plans: [{ plan_id: 1, plan_name: 'Basic', price: 4999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 7999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 11999, features: [] }]},
      { id: 8, name: 'Desktop App (C# / Java)', plans: [{ plan_id: 1, plan_name: 'Basic', price: 3999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 6999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 9999, features: [] }]},
      { id: 9, name: 'API + Backend Project', plans: [{ plan_id: 1, plan_name: 'Basic', price: 4999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 7999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 11999, features: [] }]},
      { id: 10, name: 'Full Project (UI + Backend + DB)', plans: [{ plan_id: 1, plan_name: 'Basic', price: 6999, features: [] },{ plan_id: 2, plan_name: 'Standard', price: 11999, features: [] },{ plan_id: 3, plan_name: 'Premium', price: 17999, features: [] }]},
    ]},
  ],
  addons: [
    { id: 1, name: 'Project Report + Documentation', description: 'Complete project documentation', price_min: 999, price_max: 1999 },
    { id: 2, name: 'Source Code Explanation Documents', description: 'Detailed code walkthrough docs', price_min: 999, price_max: 999 },
    { id: 3, name: 'Deployment (Hosting / Server)', description: 'Full deployment setup', price_min: 1999, price_max: 1999 },
  ],
};

const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);

const Pricing = () => {
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);

  const fetchPricing = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const data = await getProjectPricings();
      if (data.successstatus && data.data) setPricingData(data.data);
      else setPricingData(fallbackData);
    } catch (err) { setPricingData(fallbackData); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPricing(); }, [fetchPricing]);

  const categories = pricingData?.categories || [];
  const currentCat = categories[activeCategory];

  return (
    <section id="pricing" className="relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="absolute inset-0 dot-grid-dark pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2.5 h-2.5 rounded-full pulse-green" />
            <span className="mono-label" style={{ color: '#22c55e' }}>Pricing</span>
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <h2 className="text-display" style={{ color: '#ffffff' }}>
              Transparent pricing.
              <br />
              <span style={{ color: '#22c55e' }}>No surprises.</span>
            </h2>
            <p className="text-[15px] font-medium leading-[1.7] max-w-md" style={{ color: '#a1a1aa' }}>
              Affordable, honest pricing for every project size — from student mini-projects to full-scale business applications.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-white/10 border-t-white/60 rounded-full" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center text-center py-16 gap-4">
            <HiExclamationCircle className="w-8 h-8 text-red-500" />
            <p className="font-bold text-red-400">{error}</p>
            <button onClick={fetchPricing} className="btn-ghost-white inline-flex items-center gap-2">
              <HiRefresh className="w-4 h-4" /> Try Again
            </button>
          </div>
        ) : pricingData ? (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Category tabs */}
              {categories.length > 1 && (
                <div className="flex gap-0 mb-12" style={{ borderBottom: '1px solid #1a1a1a' }}>
                  {categories.map((cat, idx) => (
                    <button key={cat.id} onClick={() => setActiveCategory(idx)}
                      className="relative py-4 px-8 text-[12px] font-bold uppercase tracking-[0.08em] transition-all"
                      style={{ color: idx === activeCategory ? '#ffffff' : '#a1a1aa', borderRight: '1px solid #1a1a1a' }}>
                      {cat.name}
                      {idx === activeCategory && (
                        <motion.div layoutId="cat-indicator" className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: '#22c55e' }} />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Pricing table — brutalist */}
              {currentCat && (
                <div className="overflow-x-auto mb-16">
                  <table className="w-full min-w-[700px]" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #27272a' }}>
                        <th className="text-left py-4 px-6 mono-label" style={{ color: '#a1a1aa' }}>Project Type</th>
                        {['Basic', 'Standard', 'Premium'].map((tier) => (
                          <th key={tier} className="text-center py-4 px-4 mono-label" style={{ color: tier === 'Premium' ? '#ffffff' : '#a1a1aa' }}>
                            {tier}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentCat.project_types?.map((pt, ptIdx) => (
                        <motion.tr key={pt.id || ptIdx}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: ptIdx * 0.05 }}
                          className="group"
                          style={{ borderBottom: '1px solid #1a1a1a' }}>
                          <td className="py-5 px-6">
                            <span className="text-[14px] font-bold group-hover:text-white transition-colors" style={{ color: '#a1a1aa' }}>
                              {pt.name}
                            </span>
                          </td>
                          {['Basic', 'Standard', 'Premium'].map((tierName) => {
                            const plan = pt.plans?.find(p => p.plan_name === tierName);
                            return (
                              <td key={tierName} className="text-center py-5 px-4">
                                {plan ? (
                                  <span className="font-mono text-[16px] font-bold group-hover:text-green-400 transition-colors"
                                    style={{ color: tierName === 'Premium' ? '#22c55e' : '#ffffff' }}>
                                    ₹{formatPrice(plan.price)}
                                  </span>
                                ) : <span style={{ color: '#27272a' }}>—</span>}
                              </td>
                            );
                          })}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Add-ons strip */}
              {pricingData.addons && pricingData.addons.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <HiPuzzle className="w-5 h-5" style={{ color: '#60a5fa' }} />
                    <span className="mono-label" style={{ color: '#60a5fa' }}>Add-ons</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-0" style={{ borderTop: '1px solid #1a1a1a' }}>
                    {pricingData.addons.map((addon, idx) => (
                      <div key={addon.id || idx} className="py-8 px-6" style={{ borderRight: idx < 2 ? '1px solid #1a1a1a' : 'none', borderBottom: '1px solid #1a1a1a' }}>
                        <h4 className="text-[14px] font-bold mb-2" style={{ color: '#ffffff' }}>{addon.name}</h4>
                        {addon.description && <p className="text-[12px] mb-4" style={{ color: '#a1a1aa' }}>{addon.description}</p>}
                        <p className="font-mono font-bold text-[20px]" style={{ color: '#22c55e' }}>
                          ₹{formatPrice(addon.price_min)}
                          {addon.price_max && addon.price_max !== addon.price_min && (
                            <span className="text-[14px] ml-1" style={{ color: '#a1a1aa' }}>– ₹{formatPrice(addon.price_max)}</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Callout + CTA */}
              <div className="py-10 px-10 mb-8" style={{ background: '#18181b', borderLeft: '4px solid #22c55e' }}>
                <p className="text-[18px] font-black mb-2" style={{ color: '#ffffff', fontStyle: 'italic' }}>
                  "Final year project with full explanation + viva support"
                </p>
                <p className="text-[13px] font-medium" style={{ color: '#a1a1aa' }}>
                  Complete hand-holding from code to documentation to viva preparation
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6" style={{ borderTop: '1px solid #1a1a1a' }}>
                <p className="text-[13px] font-bold" style={{ color: '#a1a1aa', fontStyle: 'italic' }}>
                  * All pricing is <span style={{ color: '#22c55e' }}>inclusive of GST</span>. No hidden charges.
                </p>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-white inline-flex items-center gap-3">
                  <HiCheckCircle className="w-5 h-5" /> Get a Quote
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>
    </section>
  );
};

export default Pricing;
