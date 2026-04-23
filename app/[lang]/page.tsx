import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { BOTICA_SPA_SCHEMA, generateFAQSchema } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { FAQS_EN, FAQS_ES } from '@/data/faqs';
import { HomeClient } from '@/components/HomeClient';
import type { LangParams } from './layout';

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

  const faqs = isEs ? FAQS_ES : FAQS_EN;
  const faqSchema = generateFAQSchema(
    faqs.map((f) => ({ question: f.q, answer: f.a }))
  );

  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <JsonLd data={faqSchema} />
      <HomeClient />
    </>
  );
}
