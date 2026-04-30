import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiUser, HiPhone, HiMail, HiChat, HiPaperAirplane, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { getQueryTypes, submitContactQuery } from '../api/apiClient';

const initialForm = { user_name: '', mobile_number: '', email: '', query_type_id: '', message: '' };

const ContactUs = () => {
  const [form, setForm] = useState(initialForm);
  const [queryTypes, setQueryTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const fetchQueryTypes = useCallback(async () => {
    try {
      const data = await getQueryTypes();
      if (data.successstatus && data.data) setQueryTypes(data.data);
    } catch (err) { /* silently fallback */ }
  }, []);

  useEffect(() => { fetchQueryTypes(); }, [fetchQueryTypes]);

  const validate = () => {
    const newErrors = {};
    if (!form.user_name.trim()) newErrors.user_name = 'Name is required';
    else if (form.user_name.trim().length < 2) newErrors.user_name = 'Name is too short';
    if (!form.mobile_number.trim()) newErrors.mobile_number = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile_number.trim())) newErrors.mobile_number = 'Enter a valid 10-digit mobile number';
    if (form.email.trim()) { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = 'Enter a valid email'; }
    if (!form.query_type_id) newErrors.query_type_id = 'Please select a query type';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 10) newErrors.message = 'Message is too short';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const u = { ...prev }; delete u[name]; return u; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitResult(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = { user_name: form.user_name.trim(), mobile_number: form.mobile_number.trim(), email: form.email.trim() || null, query_type_id: parseInt(form.query_type_id, 10), message: form.message.trim() };
      const data = await submitContactQuery(payload);
      if (data.successstatus) { setSubmitResult({ type: 'success', message: data.message }); setForm(initialForm); }
      else setSubmitResult({ type: 'error', message: data.message || 'Submission failed' });
    } catch (err) { setSubmitResult({ type: 'error', message: err.response?.data?.message || 'Something went wrong' }); }
    finally { setLoading(false); }
  };

  const inputStyle = (field) => ({
    ...(errors[field] ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239,68,68,0.1)' } : {}),
  });

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="absolute inset-0 line-grid-dark pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Two column: headline left, form right */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-20 items-start">

          {/* Left — editorial */}
          <div className="lg:sticky lg:top-32">
            <span className="marker marker-outline mb-6 inline-block">Contact</span>

            <h2 className="text-display mb-8" style={{ color: '#ffffff' }}>
              Let's build
              <br />
              something
              <br />
              <span style={{ color: '#22c55e' }}>great.</span>
            </h2>

            <div className="brutalist-line-white mb-8" />

            <p className="text-[17px] leading-[1.7] font-medium mb-12" style={{ color: '#a1a1aa' }}>
              Have a project idea? Need a custom web solution? Fill out the form
              and I'll get back to you personally. No customer care — just me.
            </p>

            {/* Info rows */}
            <div style={{ borderTop: '1px solid #1a1a1a' }}>
              {[
                { icon: HiPhone, label: 'Direct Contact', sub: 'No middlemen, no ticket queues' },
                { icon: HiCheckCircle, label: 'Quick Response', sub: "I'll review and respond personally" },
                { icon: HiChat, label: 'Free Consultation', sub: "Let's discuss your project requirements" },
              ].map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-5 py-5"
                    style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <ItemIcon className="w-5 h-5 flex-shrink-0" style={{ color: '#ffffff' }} />
                    <div>
                      <p className="text-[13px] font-bold" style={{ color: '#ffffff' }}>{item.label}</p>
                      <p className="text-[11px] font-medium" style={{ color: '#71717a' }}>{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <AnimatePresence>
              {submitResult && (
                <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mb-8 py-5 px-6 flex items-start gap-4"
                  style={{ background: submitResult.type === 'success' ? '#052e16' : '#450a0a', borderLeft: `4px solid ${submitResult.type === 'success' ? '#22c55e' : '#ef4444'}` }}>
                  {submitResult.type === 'success' ? <HiCheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#22c55e' }} /> : <HiExclamationCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#ef4444' }} />}
                  <p className="text-[13px] font-bold" style={{ color: submitResult.type === 'success' ? '#22c55e' : '#ef4444' }}>{submitResult.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div>
                <label className="mono-label block mb-3">Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="relative">
                  <HiUser className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#71717a' }} />
                  <input type="text" name="user_name" value={form.user_name} onChange={handleChange} placeholder="Enter your name"
                    className="input-brutal" style={inputStyle('user_name')} />
                </div>
                {errors.user_name && <p className="mt-2 text-xs font-bold text-red-400">{errors.user_name}</p>}
              </div>

              {/* Mobile */}
              <div>
                <label className="mono-label block mb-3">Mobile Number <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="relative">
                  <HiPhone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#71717a' }} />
                  <input type="tel" name="mobile_number" value={form.mobile_number} onChange={handleChange} placeholder="10-digit mobile"
                    className="input-brutal" style={inputStyle('mobile_number')} maxLength={10} />
                </div>
                {errors.mobile_number && <p className="mt-2 text-xs font-bold text-red-400">{errors.mobile_number}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="mono-label block mb-3">Email <span className="opacity-30">(optional)</span></label>
                <div className="relative">
                  <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#71717a' }} />
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                    className="input-brutal" style={inputStyle('email')} />
                </div>
              </div>

              {/* Query Type */}
              <div>
                <label className="mono-label block mb-3">Query Type <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="relative">
                  <HiChat className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-10" style={{ color: '#71717a' }} />
                  <select name="query_type_id" value={form.query_type_id} onChange={handleChange}
                    className="input-brutal appearance-none cursor-pointer"
                    style={{ ...inputStyle('query_type_id'), color: form.query_type_id ? '#ffffff' : 'rgba(255,255,255,0.25)' }}>
                    <option value="">Select query type</option>
                    {queryTypes.map((qt) => (<option key={qt.id} value={qt.id} style={{ color: '#ffffff', background: '#18181b' }}>{qt.query_type}</option>))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.query_type_id && <p className="mt-2 text-xs font-bold text-red-400">{errors.query_type_id}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="mono-label block mb-3">Message <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="relative">
                  <HiChat className="absolute left-5 top-5 w-5 h-5" style={{ color: '#71717a' }} />
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5}
                    className="input-brutal resize-none" style={{ ...inputStyle('message'), paddingTop: 20 }} />
                </div>
                <div className="flex justify-between mt-2">
                  {errors.message ? <p className="text-xs font-bold text-red-400">{errors.message}</p> : <span />}
                  <span className="mono-label" style={{ color: '#27272a' }}>{form.message.length}/500</span>
                </div>
              </div>

              {/* Submit */}
              <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.01 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                className="btn-white w-full flex items-center justify-center gap-3 !py-5 !text-[14px]"
                style={{ opacity: loading ? 0.6 : 1 }}>
                {loading ? (
                  <div className="animate-spin w-5 h-5 border-3 border-black/20 border-t-black rounded-full" />
                ) : (
                  <><HiPaperAirplane className="w-5 h-5 rotate-90" />Submit Query</>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
