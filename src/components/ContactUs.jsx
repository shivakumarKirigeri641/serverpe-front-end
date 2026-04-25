import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiUser, HiPhone, HiMail, HiChat, HiPaperAirplane, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { getQueryTypes, submitContactQuery } from '../api/apiClient';
import ScrollReveal from './ScrollReveal';

const initialForm = {
  user_name: '',
  mobile_number: '',
  email: '',
  query_type_id: '',
  message: '',
};

const ContactUs = () => {
  const [form, setForm] = useState(initialForm);
  const [queryTypes, setQueryTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [submitResult, setSubmitResult] = useState(null);

  const fetchQueryTypes = useCallback(async () => {
    try {
      setFetchError('');
      const data = await getQueryTypes();
      if (data.successstatus && data.data) {
        setQueryTypes(data.data);
      } else {
        setFetchError(data.message || 'Failed to load query types');
      }
    } catch (err) {
      setFetchError('Unable to load query options. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchQueryTypes();
  }, [fetchQueryTypes]);

  const validate = () => {
    const newErrors = {};

    if (!form.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    } else if (form.user_name.trim().length < 2) {
      newErrors.user_name = 'Name is too short';
    }

    if (!form.mobile_number.trim()) {
      newErrors.mobile_number = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.mobile_number.trim())) {
      newErrors.mobile_number = 'Enter a valid 10-digit mobile number';
    }

    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        newErrors.email = 'Enter a valid email';
      }
    }

    if (!form.query_type_id) {
      newErrors.query_type_id = 'Please select a query type';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message is too short';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        user_name: form.user_name.trim(),
        mobile_number: form.mobile_number.trim(),
        email: form.email.trim() || null,
        query_type_id: parseInt(form.query_type_id, 10),
        message: form.message.trim(),
      };
      const data = await submitContactQuery(payload);
      if (data.successstatus) {
        setSubmitResult({ type: 'success', message: data.message });
        setForm(initialForm);
      } else {
        setSubmitResult({ type: 'error', message: data.message || 'Submission failed' });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong';
      setSubmitResult({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const inputBase = 'w-full px-5 py-4 pl-14 text-[15px] font-semibold rounded-2xl outline-none transition-all duration-200 input-bright';
  const inputBorderStyle = (field) => errors[field]
    ? { borderColor: '#FB7185', boxShadow: '0 0 0 4px rgba(251, 113, 133, 0.1)' }
    : {};

  const infoCards = [
    { icon: HiPhone, label: 'Direct Contact', sub: 'No middlemen, no ticket queues', accent: '#E8941A', bg: 'rgba(232,148,26,0.08)' },
    { icon: HiCheckCircle, label: 'Quick Response', sub: "I'll review and respond personally", accent: '#00C99A', bg: 'rgba(0,176,158,0.08)' },
    { icon: HiChat, label: 'Free Consultation', sub: "Let's discuss your project requirements", accent: '#FFC150', bg: 'rgba(255,193,80,0.08)' },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Background Decor */}
      <div className="absolute inset-0 dot-pattern opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[700px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,148,26,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,176,158,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Info */}
          <div className="lg:sticky lg:top-32">
            <ScrollReveal direction="left">
              <span className="inline-block px-4 py-1.5 rounded-full badge-amber mb-5">Contact Me</span>
              <h2 className="text-headline mb-5">
                Let's build{' '}
                <span className="gradient-text">something great</span>{' '}
                together.
              </h2>
              <p className="text-lg leading-relaxed mb-10 font-medium" style={{ color: 'var(--ink-500)' }}>
                Have a project idea? Need a custom web solution? Fill out the form
                and I'll get back to you personally. No customer care — just me.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <div className="grid sm:grid-cols-1 gap-4">
                {infoCards.map((card) => {
                  const CardIcon = card.icon;
                  return (
                    <div
                      key={card.label}
                      className="flex items-center gap-5 p-5 rounded-3xl glass-card-hover bg-white border border-black/5"
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: card.bg, border: `1px solid ${card.accent}20` }}>
                        <CardIcon className="w-6 h-6" style={{ color: card.accent }} />
                      </div>
                      <div>
                        <p className="text-md font-bold" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>{card.label}</p>
                        <p className="font-medium" style={{ fontSize: 13, color: 'var(--ink-300)' }}>{card.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form */}
          <ScrollReveal direction="right">
            <div
              className="p-8 lg:p-12 rounded-[40px] bg-white border border-black/[0.05] shadow-xl"
            >
              {/* Result banner */}
              <AnimatePresence>
                {submitResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-8 p-5 rounded-2xl flex items-start gap-4"
                    style={{
                      background: submitResult.type === 'success' ? '#F0FDF4' : '#FEF2F2',
                      border: `1px solid ${submitResult.type === 'success' ? '#DCFCE7' : '#FEE2E2'}`,
                    }}
                  >
                    {submitResult.type === 'success' ? (
                      <HiCheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#16A34A' }} />
                    ) : (
                      <HiExclamationCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#DC2626' }} />
                    )}
                    <p className="text-sm font-bold" style={{ color: submitResult.type === 'success' ? '#16A34A' : '#DC2626' }}>
                      {submitResult.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-[13px] font-bold mb-2 tracking-tight" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <HiUser className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--ink-100)' }} />
                    <input
                      type="text"
                      name="user_name"
                      value={form.user_name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={inputBase}
                      style={inputBorderStyle('user_name')}
                    />
                  </div>
                  {errors.user_name && <p className="mt-2 text-xs font-bold text-red-500">{errors.user_name}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-[13px] font-bold mb-2 tracking-tight" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <HiPhone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--ink-100)' }} />
                    <input
                      type="tel"
                      name="mobile_number"
                      value={form.mobile_number}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className={inputBase}
                      style={inputBorderStyle('mobile_number')}
                      maxLength={10}
                    />
                  </div>
                  {errors.mobile_number && <p className="mt-2 text-xs font-bold text-red-500">{errors.mobile_number}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[13px] font-bold mb-2 tracking-tight" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>
                    Email <span className="text-[11px] opacity-30">(optional)</span>
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--ink-100)' }} />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputBase}
                      style={inputBorderStyle('email')}
                    />
                  </div>
                </div>

                {/* Query Type */}
                <div>
                  <label className="block text-[13px] font-bold mb-2 tracking-tight" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>
                    Query Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <HiChat className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-10" style={{ color: 'var(--ink-100)' }} />
                    <select
                      name="query_type_id"
                      value={form.query_type_id}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none cursor-pointer`}
                      style={{ ...inputBorderStyle('query_type_id'), color: form.query_type_id ? 'var(--ink-900)' : 'var(--ink-100)' }}
                    >
                      <option value="">Select query type</option>
                      {queryTypes.map((qt) => (
                        <option key={qt.id} value={qt.id} style={{ color: 'var(--ink-900)' }}>
                          {qt.query_type}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.query_type_id && <p className="mt-2 text-xs font-bold text-red-500">{errors.query_type_id}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[13px] font-bold mb-2 tracking-tight" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <HiChat className="absolute left-5 top-5 w-5 h-5" style={{ color: 'var(--ink-100)' }} />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={4}
                      className="w-full px-5 py-5 pl-14 text-[15px] font-semibold rounded-3xl outline-none transition-all duration-200 input-bright resize-none"
                      style={inputBorderStyle('message')}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    {errors.message ? <p className="text-xs font-bold text-red-500">{errors.message}</p> : <span />}
                    <span className="text-[11px] font-bold opacity-30">{form.message.length}/500</span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-full text-lg font-bold transition-all duration-300"
                  style={{
                    background: loading ? 'var(--ink-100)' : 'linear-gradient(135deg, var(--accent-amber), var(--accent-amber-light))',
                    color: '#FFF',
                    boxShadow: loading ? 'none' : '0 12px 32px rgba(232, 148, 26, 0.2)',
                  }}
                >
                  {loading ? (
                    <div className="animate-spin w-6 h-6 border-4 border-white/20 border-t-white rounded-full" />
                  ) : (
                    <>
                      <HiPaperAirplane className="w-5 h-5 rotate-90" />
                      Submit Query
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  );
};

export default ContactUs;
