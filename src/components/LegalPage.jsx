import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExclamationCircle, HiRefresh, HiShieldCheck } from 'react-icons/hi';
import Navbar from './Navbar';
import Footer from './Footer';

const LegalPage = ({ title, subtitle, fetchFn, accentColor = '#E8941A' }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchFn();
      if (data.successstatus && data.data) {
        // Content might be in html_content or similar field depending on API
        setContent(data.data.html_content || data.data.content || data.data);
      } else {
        setError(data.message || 'Failed to load content');
      }
    } catch (err) {
      setError('Unable to load document. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

  return (
    <div className="min-h-screen flex flex-col noise-overlay" style={{ background: 'var(--bg-base)' }}>
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm"
              style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
            >
              <HiShieldCheck className="w-8 h-8" style={{ color: accentColor }} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold mb-6 font-display"
              style={{ color: 'var(--ink-900)' }}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-medium max-w-2xl mx-auto"
              style={{ color: 'var(--ink-500)' }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Content Area */}
          <div
            className="rounded-[40px] p-8 lg:p-16 bg-white border border-black/[0.05] shadow-xl min-h-[400px] relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white z-10"
                >
                  <div className="animate-spin w-10 h-10 border-4 border-amber-100 border-t-amber-500 rounded-full" />
                  <p className="text-sm font-bold tracking-widest text-amber-900/30 uppercase">Loading Document</p>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center py-20 gap-6"
                >
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center bg-red-50 border border-red-100">
                    <HiExclamationCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="max-w-xs">
                    <p className="font-bold text-red-950 mb-2">{error}</p>
                    <p className="text-sm text-red-900/40 font-medium">Please check your connection and try again.</p>
                  </div>
                  <button
                    onClick={fetchData}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 btn-outline border-red-200 text-red-800 hover:bg-red-50"
                  >
                    <HiRefresh className="w-4 h-4" />
                    Retry Load
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="prose prose-slate prose-amber max-w-none"
                >
                  <div className="legal-content-rendered">
                    {Array.isArray(content) ? (
                      <div className="space-y-10">
                        {content.map((item, idx) => (
                          <div key={item.id || idx}>
                            {item.title && (
                              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--ink-900)', fontFamily: '"Sora", sans-serif' }}>
                                {item.title}
                              </h3>
                            )}
                            <div 
                              className="font-medium leading-relaxed text-[15px]" 
                              style={{ color: 'var(--ink-700)' }}
                              dangerouslySetInnerHTML={{ __html: item.description || item.content || item }} 
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div 
                        className="font-medium leading-relaxed text-[15px]" 
                        style={{ color: 'var(--ink-700)' }}
                        dangerouslySetInnerHTML={{ __html: content }} 
                      />
                    )}
                  </div>
                  
                  {/* Decorative stamp */}
                  <div className="mt-20 pt-12 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                        <HiShieldCheck className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-900/40">Verified Document</p>
                        <p className="text-[10px] font-bold text-amber-900/20">© ServerPe App Solutions</p>
                      </div>
                    </div>
                    <p className="text-[11px] font-bold opacity-30 italic">Effective Date: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
