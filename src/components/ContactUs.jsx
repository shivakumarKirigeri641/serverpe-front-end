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
  const [submitResult, setSubmitResult] = useState(null); // { type: 'success'|'error', message }

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
    } else if (form.user_name.trim().length < 2 || form.user_name.trim().length > 100) {
      newErrors.user_name = 'Name must be between 2 and 100 characters';
    }

    if (!form.mobile_number.trim()) {
      newErrors.mobile_number = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.mobile_number.trim())) {
      newErrors.mobile_number = 'Enter a valid 10-digit Indian mobile number';
    }

    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        newErrors.email = 'Enter a valid email address';
      }
    }

    if (!form.query_type_id) {
      newErrors.query_type_id = 'Please select a query type';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10 || form.message.trim().length > 500) {
      newErrors.message = 'Message must be between 10 and 500 characters';
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
        setSubmitResult({ type: 'error', message: data.message || 'Submission failed. Please try again.' });
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Something went wrong. Please try again later.';
      setSubmitResult({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const inputBase = 'w-full px-4 py-3.5 pl-12 text-[14px] rounded-xl outline-none transition-all duration-200 font-body';
  const inputStyles = (field) => ({
    background: '#131827',
    border: `1px solid ${errors[field] ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}`,
    color: 'rgba(255,255,255,0.85)',
  });

  const infoCards = [
    { icon: HiPhone, label: 'Direct Contact', sub: 'No middlemen, no ticket queues', accent: '#4F8EFF', bg: 'rgba(46,111,255,0.1)' },
    { icon: HiCheckCircle, label: 'Quick Response', sub: 'I\'ll review and respond personally', accent: '#34D399', bg: 'rgba(52,211,153,0.1)' },
    { icon: HiChat, label: 'Free Consultation', sub: 'Let\'s discuss your project requirements', accent: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0B0F1A' }}>
      {/* Background accents */}
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(46,111,255,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Info */}
          <div className="lg:sticky lg:top-32">
            <ScrollReveal direction="left">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
                style={{ background: 'rgba(46,111,255,0.1)', color: '#4F8EFF', border: '1px solid rgba(46,111,255,0.2)' }}
              >
                Contact Me
              </span>
              <h2 className="text-headline text-white mb-5">
                Let's build{' '}
                <span className="gradient-text">something great</span>{' '}
                together.
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Have a project idea? Need a custom web solution? Fill out the form
                and I'll get back to you personally. No customer care — just me.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <div className="space-y-3">
                {infoCards.map((card) => {
                  const CardIcon = card.icon;
                  return (
                    <div
                      key={card.label}
                      className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{ background: '#0F1321', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: card.bg }}
                      >
                        <CardIcon className="w-5 h-5" style={{ color: card.accent }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{card.label}</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{card.sub}</p>
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
              className="p-8 lg:p-10 rounded-3xl"
              style={{ background: '#0F1321', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Success / Error banner */}
              <AnimatePresence>
                {submitResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-6 p-4 rounded-xl flex items-start gap-3"
                    style={{
                      background: submitResult.type === 'success' ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)',
                      border: submitResult.type === 'success' ? '1px solid rgba(52,211,153,0.2)' : '1px solid rgba(248,113,113,0.2)',
                    }}
                  >
                    {submitResult.type === 'success' ? (
                      <HiCheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#34D399' }} />
                    ) : (
                      <HiExclamationCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#f87171' }} />
                    )}
                    <p className="text-sm" style={{ color: submitResult.type === 'success' ? '#34D399' : '#f87171' }}>
                      {submitResult.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Full Name <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <div className="relative">
                    <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <input
                      type="text"
                      name="user_name"
                      value={form.user_name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputBase}
                      style={inputStyles('user_name')}
                      maxLength={100}
                    />
                  </div>
                  {errors.user_name && (
                    <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: '#f87171' }}>
                      <HiExclamationCircle className="w-3.5 h-3.5" /> {errors.user_name}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Mobile Number <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <div className="relative">
                    <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <input
                      type="tel"
                      name="mobile_number"
                      value={form.mobile_number}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={inputBase}
                      style={inputStyles('mobile_number')}
                      maxLength={10}
                    />
                  </div>
                  {errors.mobile_number && (
                    <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: '#f87171' }}>
                      <HiExclamationCircle className="w-3.5 h-3.5" /> {errors.mobile_number}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Email{' '}
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>(optional)</span>
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputBase}
                      style={inputStyles('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: '#f87171' }}>
                      <HiExclamationCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Query Type */}
                <div>
                  <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Query Type <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <div className="relative">
                    <HiChat className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10" style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <select
                      name="query_type_id"
                      value={form.query_type_id}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none cursor-pointer`}
                      style={{ ...inputStyles('query_type_id'), color: form.query_type_id ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)' }}
                    >
                      <option value="" style={{ background: '#131827' }}>Select query type</option>
                      {queryTypes.map((qt) => (
                        <option key={qt.id} value={qt.id} style={{ background: '#131827', color: '#fff' }}>
                          {qt.query_type}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: 'rgba(255,255,255,0.2)' }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {fetchError && (
                    <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: '#F59E0B' }}>
                      <HiExclamationCircle className="w-3.5 h-3.5" /> {fetchError}
                      <button type="button" onClick={fetchQueryTypes} className="underline hover:no-underline ml-1">
                        Retry
                      </button>
                    </p>
                  )}
                  {errors.query_type_id && (
                    <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: '#f87171' }}>
                      <HiExclamationCircle className="w-3.5 h-3.5" /> {errors.query_type_id}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Message <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <div className="relative">
                    <HiChat className="absolute left-4 top-4 w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your project or query (min 10 characters)"
                      rows={4}
                      className={`w-full px-4 py-3.5 pl-12 text-[14px] rounded-xl outline-none transition-all duration-200 font-body resize-none`}
                      style={{
                        background: '#131827',
                        border: `1px solid ${errors.message ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}`,
                        color: 'rgba(255,255,255,0.85)',
                      }}
                      maxLength={500}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {errors.message ? (
                      <p className="text-xs flex items-center gap-1" style={{ color: '#f87171' }}>
                        <HiExclamationCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{form.message.length}/500</span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[14px] font-semibold text-white transition-all duration-300"
                  style={{
                    background: loading
                      ? 'rgba(255,255,255,0.1)'
                      : 'linear-gradient(135deg, #2e6fff 0%, #06b6d4 100%)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: loading ? 'none' : '0 8px 24px rgba(46,111,255,0.3)',
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-4 h-4 rotate-90" />
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
