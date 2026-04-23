import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { BOTICA_SPA_SCHEMA } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { About } from '@/components/About';
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

export default async function AboutPage() {
  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <main className="pt-32 pb-0 bg-[#F5F2ED]">
        <About />
      </main>
    </>
  );
}
