import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { BOTICA_SPA_SCHEMA } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { ContactClient } from '@/components/ContactClient';
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
      ? 'Contacto | Masajes a Domicilio Playa del Carmen'
      : 'Contact | In Home Massage Playa del Carmen',
    description: isEs
      ? 'Contáctanos por WhatsApp para reservar tu masaje a domicilio en Playa del Carmen. Atención inmediata, respuesta en minutos.'
      : 'Contact us on WhatsApp to book your in-home massage in Playa del Carmen. Immediate attention, response within minutes.',
    keywords: isEs
      ? 'contacto botica spa, reservar masaje domicilio, whatsapp spa playa del carmen'
      : 'contact botica spa, book in home massage, whatsapp spa playa del carmen',
    canonical: isEs
      ? 'https://www.boticaspa.com/es/contacto'
      : 'https://www.boticaspa.com/contact',
    ogImage: 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'website',
  });
}


export default async function ContactPage() {
  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <ContactClient />
    </>
  );
}
