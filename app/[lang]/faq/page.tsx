import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateFAQSchema } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { FAQS_EN, FAQS_ES } from '@/data/faqs';
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
      ? 'Preguntas Frecuentes | Botica Spa — Masajes a Domicilio'
      : 'FAQ | Botica Spa — In Home Massage Playa del Carmen',
    description: isEs
      ? '¿Cómo funciona el masaje a domicilio? ¿Qué traen? ¿Cuál es la política de cancelación? Resolvemos todas tus dudas.'
      : 'How does in-home massage work? What do they bring? What is the cancellation policy? All your questions answered.',
    keywords: isEs
      ? 'preguntas frecuentes masaje domicilio, cómo funciona spa domicilio, política cancelación'
      : 'massage faq, in home spa questions, how does mobile massage work, cancellation policy',
    canonical: isEs
      ? 'https://www.boticaspa.com/es/preguntas-frecuentes'
      : 'https://www.boticaspa.com/faq',
    ogImage: 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'website',
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const isEs = lang === 'es';
  const t = translations[isEs ? 'es' : 'en'];
  const faqs = isEs ? FAQS_ES : FAQS_EN;

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <JsonLd data={faqSchema} />
      <main className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-12">
          {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="border border-gray-100 rounded-2xl p-6 group open:shadow-sm"
            >
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            {isEs
              ? '¿Tienes otra pregunta? Escríbenos directo.'
              : 'Have another question? Message us directly.'}
          </p>
          <a
            href="https://wa.me/529842687428"
            className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </main>
    </>
  );
}
