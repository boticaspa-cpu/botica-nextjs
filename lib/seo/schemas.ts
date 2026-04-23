/**
 * JSON-LD structured data generators for Botica Spa.
 * Each function returns a plain object ready for JSON.stringify().
 * Inject into pages via the <JsonLd> component.
 */

export interface LocalBusinessAddress {
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

export interface LocalBusinessParams {
  name: string;
  address: LocalBusinessAddress;
  phone: string;
  website: string;
  image: string;
  description?: string;
  ratingValue?: number;
  reviewCount?: number;
}

/** Generates a HealthAndBeautyBusiness / LocalBusiness schema */
export function generateLocalBusinessSchema(params: LocalBusinessParams) {
  const {
    name,
    address,
    phone,
    website,
    image,
    description = 'Premium mobile massage service. We bring certified therapists to your hotel, villa, or Airbnb.',
    ratingValue = 5.0,
    reviewCount = 47,
  } = params;

  return {
    '@context': 'https://schema.org',
    '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
    name,
    description,
    image,
    '@id': website,
    url: website,
    telephone: phone,
    serviceType: 'Mobile Massage / In Home Spa Service',
    areaServed: [
      { '@type': 'City', name: 'Playa del Carmen' },
      { '@type': 'City', name: 'Playacar' },
      { '@type': 'City', name: 'Puerto Aventuras' },
      { '@type': 'City', name: 'Puerto Morelos' },
      { '@type': 'City', name: 'Akumal' },
    ],
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '21:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(ratingValue),
      reviewCount: String(reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/boticaspa',
      'https://www.instagram.com/botica.spa/',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Spa Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Botica Signature Massage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Four Hands Massage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deep Tissue Massage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Relaxing Massage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Personalized Massage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Revitalizing Facial' } },
      ],
    },
  };
}

export interface ServiceSchemaParams {
  name: string;
  description: string;
  /** Price range string, e.g. "$1,700–$2,500 MXN" */
  priceRange: string;
  image: string;
  url?: string;
}

/** Generates a Service schema for individual massage/treatment pages */
export function generateServiceSchema(params: ServiceSchemaParams) {
  const { name, description, priceRange, image, url } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    image,
    ...(url && { url }),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Botica Spa',
      url: 'https://www.boticaspa.com',
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: priceRange,
        priceCurrency: 'MXN',
      },
      availability: 'https://schema.org/InStock',
    },
    areaServed: {
      '@type': 'City',
      name: 'Playa del Carmen',
    },
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

/** Generates a FAQPage schema. Compatible with FAQS_EN / FAQS_ES from data/faqs.ts */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** Generates a BreadcrumbList schema */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Pre-built Botica Spa LocalBusiness schema with canonical data */
export const BOTICA_SPA_SCHEMA = generateLocalBusinessSchema({
  name: 'Botica Spa',
  address: {
    addressLocality: 'Playa del Carmen',
    addressRegion: 'Quintana Roo',
    addressCountry: 'MX',
  },
  phone: '+52 984 268 7428',
  website: 'https://www.boticaspa.com',
  image: 'https://www.boticaspa.com/logo.png',
  description:
    'Premium mobile massage service in Playa del Carmen. We bring certified therapists to your hotel, villa, or Airbnb. Serving Playa del Carmen, Playacar, Tulum, Cancún, Akumal and Puerto Morelos.',
});
