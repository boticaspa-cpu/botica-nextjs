import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { BOTICA_SPA_SCHEMA } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { TreatmentsClient } from '@/components/TreatmentsClient';
import type { LangParams } from '../layout';

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
  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <TreatmentsClient />
    </>
  );
}
