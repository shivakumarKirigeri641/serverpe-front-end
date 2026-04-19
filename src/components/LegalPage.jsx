import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiExclamationCircle, HiRefresh } from 'react-icons/hi';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from '../images/serverpe_logo.jpg';

const Skeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-5 rounded-lg w-2/3" style={{ background: 'rgba(255,255,255,0.06)' }} />
    <div className="h-4 rounded-lg w-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
    <div className="h-4 rounded-lg w-5/6" style={{ background: 'rgba(255,255,255,0.04)' }} />
    <div className="h-4 rounded-lg w-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
    <div className="h-4 rounded-lg w-4/5" style={{ background: 'rgba(255,255,255,0.04)' }} />
    <div className="h-5 rounded-lg w-1/2 mt-8" style={{ background: 'rgba(255,255,255,0.06)' }} />
    <div className="h-4 rounded-lg w-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
    <div className="h-4 rounded-lg w-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
    <div className="h-4 rounded-lg w-3/4" style={{ background: 'rgba(255,255,255,0.04)' }} />
    <div className="h-5 rounded-lg w-1/2 mt-8" style={{ background: 'rgba(255,255,255,0.06)' }} />
    <div className="h-4 rounded-lg w-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
    <div className="h-4 rounded-lg w-5/6" style={{ background: 'rgba(255,255,255,0.04)' }} />
  </div>
);

/**
 * LegalPage — reusable component for Privacy Policy & Terms and Conditions.
 *
 * @param {string}   title       - Page title shown in the hero header
 * @param {string}   subtitle    - Short descriptor shown below the title
 * @param {Function} fetchFn     - Async API function that returns the content
 * @param {string}   accentColor - Hex accent colour for the hero gradient
 */
const LegalPage = ({ title, subtitle, fetchFn, accentColor = '#4F8EFF' }) => {
  const [content, setContent] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchFn();
      if (data.successstatus && data.data) {
        // Handle array response from API
        if (Array.isArray(data.data)) {
          // Format array of objects into HTML content
          const formattedContent = data.data
            .map(item => `<section style="margin-bottom: 2rem;"><h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">${item.title}</h3><div style="line-height: 1.6; color: #e0e0e0;">${item.description}</div></section>`)
            .join('');
          setContent(formattedContent);
        } else {
          // Handle object response with content property
          setContent(data.data.content ?? data.data);
          setLastUpdated(data.data.last_updated ?? data.data.updated_at ?? null);
        }
      } else {
        setError(data.message || 'Failed to load content. Please try again.');
      }
    } catch {
      setError('Unable to load content. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ background: '#0B0F1A', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero header */}
      <div
        className="relative pt-32 pb-16 px-6 lg:px-8 overflow-hidden"
        style={{ background: `linear-gradient(180deg, #080B14 0%, #0B0F1A 100%)` }}
      >
        {/* Radial glow behind header */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentColor}18 0%, transparent 70%)` }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-200 hover:text-white"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white rounded-lg overflow-hidden px-2.5 py-1.5">
              <img src={logo} alt="ServerPe" className="h-7 w-auto object-contain" />
            </div>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}25` }}
            >
              Legal
            </span>
            <h1 className="font-heading font-bold text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              {title}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, lineHeight: 1.6 }}>
              {subtitle}
            </p>
            {lastUpdated && (
              <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Last updated: {new Date(lastUpdated).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Divider line */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {loading && <Skeleton />}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-16 gap-4"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}
            >
              <HiExclamationCircle className="w-6 h-6" style={{ color: '#f87171' }} />
            </div>
            <p className="text-white font-semibold">{error}</p>
            <button
              onClick={load}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <HiRefresh className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        )}

        {content && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="legal-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LegalPage;
