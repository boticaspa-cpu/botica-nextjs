import type { MetadataRoute } from 'next';
import { translations } from '@/lib/translations';

const BASE = 'https://www.boticaspa.com';
const NOW = new Date().toISOString();

// Spanish URL slugs (public-facing, not internal rewrites)
const ES_SLUG: Record<string, string> = {
  about: 'sobre-nosotros',
  massages: 'masajes',
  contact: 'contacto',
  faq: 'preguntas-frecuentes',
};

function url(
  enPath: string,
  esPath?: string,
  priority = 0.8
): MetadataRoute.Sitemap[number] {
  const esUrl = esPath ?? `/es/${ES_SLUG[enPath.replace('/', '')] ?? enPath.replace('/', '')}`;
  return {
    url: `${BASE}${enPath}`,
    lastModified: NOW,
    changeFrequency: 'weekly',
    priority,
    alternates: {
      languages: {
        en: `${BASE}${enPath}`,
        es: `${BASE}${esUrl}`,
        'x-default': `${BASE}${enPath}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceKeys = Object.keys(translations.en.services.items);
  const blogIds = translations.en.blog.posts.map((p) => p.id);
  const cities = ['puerto-aventuras', 'puerto-morelos', 'akumal', 'playacar'];

  return [
    // Static pages
    url('/', '/es', 1.0),
    url('/about', undefined, 0.7),
    url('/massages', undefined, 0.9),
    url('/blog', undefined, 0.9),
    url('/contact', undefined, 0.7),
    url('/faq', undefined, 0.7),

    // Dynamic: service pages
    ...serviceKeys.map((key) =>
      url(`/massages/${key}`, `/es/masajes/${key}`, 0.8)
    ),

    // Dynamic: blog posts
    ...blogIds.map((id) =>
      url(`/blog/${id}`, `/es/blog/${id}`, 0.7)
    ),

    // Dynamic: location pages
    ...cities.map((city) =>
      url(`/massage-${city}`, `/es/masaje-${city}`, 0.8)
    ),
  ];
}
