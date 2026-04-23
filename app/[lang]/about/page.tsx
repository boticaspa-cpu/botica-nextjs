import type { Metadata } from 'next';
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
      ? 'Sobre Nosotros | Botica Spa — Masajes a Domicilio Playa del Carmen'
      : 'About Us | Botica Spa — In Home Massage Playa del Carmen',
    description: isEs
      ? 'Botica Spa fue fundado por Gina Agassini con años de experiencia en hoteles de lujo de la Riviera Maya. Masajes premium a domicilio en Playa del Carmen.'
      : 'Botica Spa was founded by Gina Agassini with years of experience at luxury hotels in the Riviera Maya. Premium in-home massage in Playa del Carmen.',
    keywords: isEs
      ? 'sobre botica spa, gina agassini, masajes riviera maya, spa domicilio'
      : 'about botica spa, gina agassini, riviera maya massage, in home spa',
    canonical: isEs
      ? 'https://www.boticaspa.com/es/sobre-nosotros'
      : 'https://www.boticaspa.com/about',
    ogImage: 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'website',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const t = translations[lang === 'es' ? 'es' : 'en'];

  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">{t.about.badge}</p>
        <h1 className="text-4xl font-bold mb-2">
          {t.about.title}{' '}
          <em className="italic">{t.about.titleItalic}</em>
        </h1>
        <p className="text-lg text-gray-600 mt-6 mb-12">{t.about.description}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: t.about.feature1Title, desc: t.about.feature1Desc },
            { title: t.about.feature2Title, desc: t.about.feature2Desc },
            { title: t.about.feature3Title, desc: t.about.feature3Desc },
          ].map((f) => (
            <div key={f.title} className="border border-gray-100 rounded-2xl p-6">
              <h2 className="font-semibold text-lg mb-3">{f.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
