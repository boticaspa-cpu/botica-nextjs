import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { translations } from '@/lib/translations';

type ServiceKey = keyof (typeof translations)['en']['services']['items'];

const SLUG_TO_IMAGE: Record<string, string> = {
  'botica-signature':    '/masaje-botica.webp',
  'four-hands-massage':  '/masaje-cuatro-manos.webp',
  'deep-tissue-massage': '/masaje-profundo.webp',
  'relaxing-massage':    '/masaje-relajante.webp',
  'personalized-massage':'/spa-detalle.webp',
  'revitalizing-facial': '/masaje-cuatro-manos.webp',
};

// Map SEO-friendly slugs → translation keys
const SLUG_TO_KEY: Record<string, ServiceKey> = {
  'botica-signature':    'botica',
  'four-hands-massage':  'fourHands',
  'deep-tissue-massage': 'deepTissue',
  'relaxing-massage':    'relaxing',
  'personalized-massage':'personalized',
  'revitalizing-facial': 'facial',
};

function resolveKey(serviceId: string): ServiceKey {
  return (SLUG_TO_KEY[serviceId] ?? serviceId) as ServiceKey;
}

export async function generateStaticParams() {
  const slugs = Object.keys(SLUG_TO_KEY);
  return ['en', 'es'].flatMap((lang) =>
    slugs.map((serviceId) => ({ lang, serviceId }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; serviceId: string }>;
}): Promise<Metadata> {
  const { lang, serviceId } = await params;
  const isEs = lang === 'es';
  const t = translations[isEs ? 'es' : 'en'];
  const service = t.services.items[resolveKey(serviceId)];

  if (!service) return {};

  const minPrice = Math.min(
    ...Object.entries(service)
      .filter(([k]) => k.startsWith('price'))
      .map(([, v]) => v as number)
  );

  return generateSEOMetadata({
    title: isEs
      ? `${service.name} a Domicilio | Playa del Carmen`
      : `${service.name} | In Home | Playa del Carmen`,
    description: isEs
      ? `${service.desc} Desde $${minPrice.toLocaleString()} MXN. A domicilio en Playa del Carmen.`
      : `${service.desc} From $${minPrice.toLocaleString()} MXN. In-home in Playa del Carmen.`,
    keywords: isEs
      ? `${service.name.toLowerCase()}, masaje domicilio playa del carmen, spa domicilio`
      : `${service.name.toLowerCase()}, in home massage playa del carmen, mobile spa`,
    canonical: isEs
      ? `https://www.boticaspa.com/es/masajes/${serviceId}`
      : `https://www.boticaspa.com/massages/${serviceId}`,
    ogImage: 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'website',
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; serviceId: string }>;
}) {
  const { lang, serviceId } = await params;
  const isEs = lang === 'es';
  const t = translations[isEs ? 'es' : 'en'];
  const service = t.services.items[resolveKey(serviceId)];

  if (!service) notFound();

  const minPrice = Math.min(
    ...Object.entries(service)
      .filter(([k]) => k.startsWith('price'))
      .map(([, v]) => v as number)
  );

  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.desc,
    priceRange: `$${minPrice.toLocaleString()}–$${Math.max(
      ...Object.entries(service)
        .filter(([k]) => k.startsWith('price'))
        .map(([, v]) => v as number)
    ).toLocaleString()} MXN`,
    image: 'https://www.boticaspa.com/og-image.jpg',
    url: isEs
      ? `https://www.boticaspa.com/es/masajes/${serviceId}`
      : `https://www.boticaspa.com/massages/${serviceId}`,
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Botica Spa', url: 'https://www.boticaspa.com' },
    {
      name: isEs ? 'Masajes' : 'Massages',
      url: isEs ? 'https://www.boticaspa.com/es/masajes' : 'https://www.boticaspa.com/massages',
    },
    { name: service.name, url: `https://www.boticaspa.com${isEs ? '/es/masajes' : '/massages'}/${serviceId}` },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      <main className="max-w-3xl mx-auto px-4 py-20">
        {SLUG_TO_IMAGE[serviceId] && (
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
            <img src={SLUG_TO_IMAGE[serviceId]} alt={service.name} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
        <p className="text-xl text-gray-600 mb-8">{service.desc}</p>

        {service.details && (
          <p className="text-gray-700 leading-relaxed mb-8">{service.details}</p>
        )}

        <p className="text-2xl font-semibold mb-8">
          {t.services.from} ${minPrice.toLocaleString()} {t.services.currency}
        </p>

        {service.benefitsList && (
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-3">{t.services.benefits}</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {service.benefitsList.map((b: string) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        )}

        {service.includesList && (
          <div className="mb-10">
            <h2 className="font-semibold text-lg mb-3">{t.services.includes}</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {service.includesList.map((inc: string) => <li key={inc}>{inc}</li>)}
            </ul>
          </div>
        )}

        <a
          href="https://wa.me/529842687428"
          className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          {isEs ? 'Reservar por WhatsApp' : 'Book on WhatsApp'}
        </a>
      </main>
    </>
  );
}
