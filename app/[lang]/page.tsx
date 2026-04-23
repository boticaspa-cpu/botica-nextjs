import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { BOTICA_SPA_SCHEMA, generateFAQSchema } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { translations } from '@/lib/translations';
import { FAQS_EN, FAQS_ES } from '@/data/faqs';
import type { Lang, LangParams } from './layout';

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return generateSEOMetadata({
    title: isEs
      ? 'Masaje a Domicilio | Playa del Carmen | Botica Spa'
      : 'Massage Playa del Carmen | In Home Spa | Botica Spa',
    description: isEs
      ? 'Masajista profesional a domicilio en Playa del Carmen. Llevamos la terapista a tu hotel, villa o Airbnb. Masaje relajante, tejido profundo, cuatro manos y más.'
      : 'In-home massage in Playa del Carmen. We bring certified therapists to your hotel, Airbnb, or villa. Relaxing, deep tissue, four hands & more. Book now.',
    keywords: isEs
      ? 'masaje domicilio, playa del carmen, spa, masajista, masaje hotel, masaje airbnb'
      : 'massage playa del carmen, in home massage, spa playa del carmen, hotel massage, mobile spa',
    canonical: isEs ? 'https://www.boticaspa.com/es' : 'https://www.boticaspa.com',
    ogImage: 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'website',
  });
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HomePage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const isEs = lang === 'es';
  const t = translations[isEs ? 'es' : 'en'];

  const faqs = isEs ? FAQS_ES : FAQS_EN;
  const faqSchema = generateFAQSchema(
    faqs.map((f) => ({ question: f.q, answer: f.a }))
  );

  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <JsonLd data={faqSchema} />

      <main>
        {/* Hero section placeholder — replace with your Hero component */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-bold mb-4">
            {t.hero.title}{' '}
            <em className="italic">{t.hero.titleItalic}</em>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">{t.hero.subtitle}</p>
          <a
            href="https://wa.me/529842687428"
            className="mt-8 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            {t.hero.ctaBook}
          </a>
        </section>
      </main>
    </>
  );
}
