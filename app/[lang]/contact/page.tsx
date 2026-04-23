import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { BOTICA_SPA_SCHEMA } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
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
      ? 'Contacto | Botica Spa — Masajes a Domicilio Playa del Carmen'
      : 'Contact | Botica Spa — In Home Massage Playa del Carmen',
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

const SERVICE_AREAS = [
  { en: 'Playa del Carmen', es: 'Playa del Carmen', fee: 'Free / Gratis' },
  { en: 'Playacar', es: 'Playacar', fee: 'Free / Gratis' },
  { en: 'Puerto Aventuras', es: 'Puerto Aventuras', fee: '$200 MXN' },
  { en: 'Puerto Morelos', es: 'Puerto Morelos', fee: '$200 MXN' },
  { en: 'Akumal', es: 'Akumal', fee: '$300 MXN' },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const isEs = lang === 'es';

  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <main className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4">
          {isEs ? 'Contáctanos' : 'Contact Us'}
        </h1>
        <p className="text-gray-600 mb-12">
          {isEs
            ? 'La forma más rápida de reservar es por WhatsApp. Respondemos en minutos.'
            : 'The fastest way to book is via WhatsApp. We respond within minutes.'}
        </p>

        <div className="space-y-4 mb-12">
          <a
            href="https://wa.me/529842687428"
            className="flex items-center gap-4 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="text-gray-500 text-sm">+52 984 268 7428</p>
            </div>
          </a>
          <a
            href="mailto:boticaspa@gmail.com"
            className="flex items-center gap-4 border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <span className="text-2xl">✉️</span>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-500 text-sm">boticaspa@gmail.com</p>
            </div>
          </a>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          {isEs ? 'Zonas de Servicio' : 'Service Areas'}
        </h2>
        <div className="overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-500">
                  {isEs ? 'Zona' : 'Area'}
                </th>
                <th className="text-right px-5 py-3 font-medium text-gray-500">
                  {isEs ? 'Tarifa de Traslado' : 'Travel Fee'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SERVICE_AREAS.map((area) => (
                <tr key={area.en} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium">{isEs ? area.es : area.en}</td>
                  <td className="px-5 py-4 text-right text-gray-600">{area.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
