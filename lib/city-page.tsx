import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { LocationClient } from '@/components/LocationClient';

export type CityKey = 'puerto-aventuras' | 'puerto-morelos' | 'akumal' | 'playacar';

const CITY_CONFIG: Record<CityKey, { nameEn: string; nameEs: string; travelFee: string }> = {
  'puerto-aventuras': { nameEn: 'Puerto Aventuras', nameEs: 'Puerto Aventuras', travelFee: '$200 MXN' },
  'puerto-morelos':   { nameEn: 'Puerto Morelos',   nameEs: 'Puerto Morelos',   travelFee: '$200 MXN' },
  'akumal':           { nameEn: 'Akumal',            nameEs: 'Akumal',            travelFee: '$300 MXN' },
  'playacar':         { nameEn: 'Playacar',          nameEs: 'Playacar',          travelFee: 'Free / Gratis' },
};

export async function generateCityMetadata(
  params: Promise<{ lang: string }>,
  city: CityKey
): Promise<Metadata> {
  const { lang } = await params;
  const config = CITY_CONFIG[city];
  const isEs = lang === 'es';
  const cityName = isEs ? config.nameEs : config.nameEn;

  return generateSEOMetadata({
    title: isEs
      ? `Masaje a Domicilio en ${cityName}`
      : `In Home Massage in ${cityName}`,
    description: isEs
      ? `Masajista profesional a domicilio en ${cityName}. Traslado: ${config.travelFee}. Masaje relajante, tejido profundo y más. Reserva por WhatsApp.`
      : `Professional in-home massage in ${cityName}. Travel fee: ${config.travelFee}. Relaxing, deep tissue and more. Book on WhatsApp.`,
    keywords: isEs
      ? `masaje domicilio ${cityName.toLowerCase()}, spa ${cityName.toLowerCase()}, masajista ${cityName.toLowerCase()}`
      : `in home massage ${cityName.toLowerCase()}, spa ${cityName.toLowerCase()}, massage ${cityName.toLowerCase()}`,
    canonical: isEs
      ? `https://www.boticaspa.com/es/masaje-${city}`
      : `https://www.boticaspa.com/massage-${city}`,
    ogImage: 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'website',
  });
}

export async function CityPageContent({
  params,
  city,
}: {
  params: Promise<{ lang: string }>;
  city: CityKey;
}) {
  const { lang } = await params;
  const config = CITY_CONFIG[city];
  const isEs = lang === 'es';
  const cityName = isEs ? config.nameEs : config.nameEn;

  const citySchema = generateLocalBusinessSchema({
    name: `Botica Spa — ${cityName}`,
    address: {
      addressLocality: cityName,
      addressRegion: 'Quintana Roo',
      addressCountry: 'MX',
    },
    phone: '+52 984 268 7428',
    website: isEs
      ? `https://www.boticaspa.com/es/masaje-${city}`
      : `https://www.boticaspa.com/massage-${city}`,
    image: 'https://www.boticaspa.com/logo.png',
    description: isEs
      ? `Masajes a domicilio en ${cityName}. Terapistas certificadas. Traslado: ${config.travelFee}.`
      : `In-home massage in ${cityName}. Certified therapists. Travel fee: ${config.travelFee}.`,
  });

  return (
    <>
      <JsonLd data={citySchema} />
      <LocationClient city={city} />
    </>
  );
}
