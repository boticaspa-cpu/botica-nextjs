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
  const maxPrice = Math.max(
    ...Object.entries(service)
      .filter(([k]) => k.startsWith('price'))
      .map(([, v]) => v as number)
  );

  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.desc,
    priceRange: `$${minPrice.toLocaleString()}–$${maxPrice.toLocaleString()} MXN`,
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

  const heroImage = SLUG_TO_IMAGE[serviceId];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />

      {/* Hero */}
      {heroImage && (
        <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
          <img
            src={heroImage}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-4xl">
            <span className="text-xs uppercase tracking-[0.4em] text-white/60 mb-3">
              {isEs ? 'Masaje a Domicilio · Playa del Carmen' : 'In Home Massage · Playa del Carmen'}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
              {service.name}
            </h1>
          </div>
        </div>
      )}

      <main className="bg-[#F5F2ED]">
        {/* Intro */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xl md:text-2xl text-[#1A1A1A]/70 font-serif font-light leading-relaxed mb-4">
            {service.desc}
          </p>
          {service.details && (
            <p className="text-gray-600 leading-relaxed mt-6">{service.details}</p>
          )}
        </section>

        {/* Price + CTA */}
        <section className="bg-white border-y border-[#E8E4DC] py-12">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">
                {t.services.from}
              </p>
              <p className="text-4xl font-serif text-[#1A1A1A]">
                ${minPrice.toLocaleString()}
                <span className="text-lg text-gray-400 ml-2">{t.services.currency}</span>
              </p>
            </div>
            <a
              href={`https://wa.me/529842687428?text=${encodeURIComponent(isEs ? `Hola, me interesa reservar: ${service.name}` : `Hi, I'd like to book: ${service.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 rounded-full hover:bg-[#2A2A2A] transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {isEs ? 'Reservar por WhatsApp' : 'Book on WhatsApp'}
            </a>
          </div>
        </section>

        {/* Benefits + Includes */}
        {(service.benefitsList || service.includesList) && (
          <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            {service.benefitsList && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.4em] text-[#5A5A40] font-bold mb-6">
                  {t.services.benefits}
                </h2>
                <ul className="space-y-3">
                  {service.benefitsList.map((b: string) => (
                    <li key={b} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5A5A40] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.includesList && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.4em] text-[#5A5A40] font-bold mb-6">
                  {t.services.includes}
                </h2>
                <ul className="space-y-3">
                  {service.includesList.map((inc: string) => (
                    <li key={inc} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5A5A40] flex-shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}
