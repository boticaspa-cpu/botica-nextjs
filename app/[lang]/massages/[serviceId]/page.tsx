import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { translations } from '@/lib/translations';
import type { Lang, LangParams } from '../../layout';

type ServiceKey = keyof (typeof translations)['en']['services']['items'];

export async function generateStaticParams() {
  const serviceKeys = Object.keys(translations.en.services.items) as ServiceKey[];
  return ['en', 'es'].flatMap((lang) =>
    serviceKeys.map((serviceId) => ({ lang, serviceId }))
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
  const service = t.services.items[serviceId as ServiceKey];

  if (!service) return {};

  const minPrice = Math.min(
    ...Object.entries(service)
      .filter(([k]) => k.startsWith('price'))
      .map(([, v]) => v as number)
  );

  return generateSEOMetadata({
    title: isEs
      ? `${service.name} a Domicilio | Playa del Carmen | Botica Spa`
      : `${service.name} | In Home | Playa del Carmen | Botica Spa`,
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
  const service = t.services.items[serviceId as ServiceKey];

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
