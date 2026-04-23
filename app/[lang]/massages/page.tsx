import type { Metadata } from 'next';
import Link from 'next/link';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { BOTICA_SPA_SCHEMA } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { translations } from '@/lib/translations';
import type { Lang, LangParams } from '../layout';

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return generateSEOMetadata({
    title: isEs
      ? 'Masajes a Domicilio Playa del Carmen | Todos los Tratamientos | Botica Spa'
      : 'In Home Massages Playa del Carmen | All Treatments | Botica Spa',
    description: isEs
      ? 'Masaje relajante, tejido profundo, cuatro manos, Botica Signature y más. Todos a domicilio en Playa del Carmen. Desde $1,700 MXN.'
      : 'Relaxing massage, deep tissue, four hands, Botica Signature and more. All in-home in Playa del Carmen. From $1,700 MXN.',
    keywords: isEs
      ? 'masajes playa del carmen, masaje relajante, tejido profundo, cuatro manos, spa domicilio'
      : 'massages playa del carmen, relaxing massage, deep tissue, four hands, in home spa',
    canonical: isEs
      ? 'https://www.boticaspa.com/es/masajes'
      : 'https://www.boticaspa.com/massages',
    ogImage: 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'website',
  });
}

export default async function MassagesPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const isEs = lang === 'es';
  const t = translations[isEs ? 'es' : 'en'];
  const serviceKeys = Object.keys(t.services.items) as Array<keyof typeof t.services.items>;

  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">{t.services.badge}</p>
        <h1 className="text-4xl font-bold mb-12">{t.services.title}</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key) => {
            const service = t.services.items[key];
            const href = isEs ? `/es/masajes/${key}` : `/massages/${key}`;
            const minPrice = Math.min(
              ...Object.entries(service)
                .filter(([k]) => k.startsWith('price'))
                .map(([, v]) => v as number)
            );

            return (
              <Link
                key={key}
                href={href}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="font-semibold text-xl mb-2">{service.name}</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.desc}</p>
                <p className="text-sm font-medium">
                  {t.services.from} ${minPrice.toLocaleString()} {t.services.currency}
                </p>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
