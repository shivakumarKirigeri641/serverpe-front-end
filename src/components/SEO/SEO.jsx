import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for dynamic meta tags
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} keywords - SEO keywords
 * @param {string} image - Open Graph image URL
 * @param {string} url - Canonical URL
 * @param {string} type - Open Graph type (website, article, etc.)
 * @param {object} structuredData - JSON-LD structured data
 * @param {boolean} noIndex - Whether to prevent indexing
 */
const SEO = ({
  title = 'ServerPe - Last Minute Demo Projects for CS & IS Students',
  description = 'Get production-ready demo projects with complete documentation for your college presentations. Real-world projects for Computer Science students in India.',
  keywords = 'demo projects, college projects, CS projects, IS projects, final year projects, student projects India, computer science projects, information science projects',
  image = 'https://serverpe.in/og-image.jpg',
  url = 'https://serverpe.in',
  type = 'website',
  structuredData = null,
  noIndex = false,
}) => {
  const siteTitle = 'ServerPe';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots Meta */}
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="ServerPe" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
