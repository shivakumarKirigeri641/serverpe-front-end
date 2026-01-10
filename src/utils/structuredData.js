/**
 * Structured Data (JSON-LD) Helper Functions for SEO
 */

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ServerPe',
  description: 'Helping CS & IS students with last-minute demo projects',
  url: 'https://serverpe.in',
  logo: 'https://serverpe.in/ServerPe_Logo.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9886122415',
    contactType: 'Customer Service',
    email: 'support@serverpe.in',
    areaServed: 'IN',
    availableLanguage: 'English',
  },
  sameAs: [
    // Add social media links here when available
  ],
});

export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ServerPe',
  url: 'https://serverpe.in',
  description: 'Production-ready demo projects for CS & IS students',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://serverpe.in/projects?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
});

export const getProductSchema = (project) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: project.title,
  description: project.description,
  category: project.category,
  offers: {
    '@type': 'Offer',
    price: project.base_price,
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
  brand: {
    '@type': 'Brand',
    name: 'ServerPe',
  },
});

export const getBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const getReviewSchema = (testimonials) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ServerPe',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: calculateAverageRating(testimonials),
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  },
});

const calculateAverageRating = (testimonials) => {
  if (!testimonials || testimonials.length === 0) return 5;
  const sum = testimonials.reduce((acc, t) => acc + (t.rating || 5), 0);
  return (sum / testimonials.length).toFixed(1);
};

export const getServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Demo Project Solutions',
  provider: {
    '@type': 'Organization',
    name: 'ServerPe',
  },
  serviceType: 'Educational Project Services',
  description: 'Complete demo projects for CS & IS students with documentation, source code, and viva support',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '499',
    highPrice: '2999',
  },
});
