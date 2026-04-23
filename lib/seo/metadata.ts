import type { Metadata } from 'next';

export interface SEOProps {
  /** Page title shown in browser tab and search results */
  title: string;
  /** Meta description — keep under 160 characters */
  description: string;
  /** Comma-separated keywords (5–8 recommended) */
  keywords: string;
  /** Absolute canonical URL for this page */
  canonical: string;
  /** Absolute URL of the Open Graph image (1200×630px recommended) */
  ogImage: string;
  /** Open Graph content type */
  ogType: 'website' | 'article';
  /** Hides page from search engine indexes when true */
  noindex?: boolean;
  /** ISO 8601 date string — only used when ogType is 'article' */
  publishedDate?: string;
  /** ISO 8601 date string for last update — falls back to publishedDate */
  updatedDate?: string;
}

const SITE_NAME = 'Botica Spa';
const DEFAULT_OG_IMAGE = 'https://www.boticaspa.com/og-image.jpg';

/**
 * Generates a fully typed Next.js Metadata object from SEO props.
 *
 * Usage in a page or layout:
 *   export const metadata = generateSEOMetadata({ title: '...', ... });
 *
 * For dynamic routes use generateMetadata() function from Next.js instead
 * and call this helper inside it.
 */
export function generateSEOMetadata(props: SEOProps): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType,
    noindex = false,
    publishedDate,
    updatedDate,
  } = props;

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_NAME }],
    robots: noindex ? 'noindex,nofollow' : 'index,follow',

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: ogType,
      locale: 'es_MX',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },

    // Article-specific dates (for blog posts)
    ...(publishedDate && {
      other: {
        'article:published_time': publishedDate,
        'article:modified_time': updatedDate ?? publishedDate,
        'article:author': SITE_NAME,
      },
    }),
  };
}
