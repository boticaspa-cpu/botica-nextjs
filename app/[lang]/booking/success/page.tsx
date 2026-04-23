import type { Metadata } from 'next';
import Link from 'next/link';
import type { Lang, LangParams } from '../../layout';

export const metadata: Metadata = {
  title: 'Booking Confirmed | Botica Spa',
  robots: 'noindex,nofollow',
};

export default async function BookingSuccessPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const isEs = lang === 'es';

  return (
    <main className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-6">✅</div>
      <h1 className="text-3xl font-bold mb-4">
        {isEs ? '¡Reserva Recibida!' : 'Booking Received!'}
      </h1>
      <p className="text-gray-600 mb-8">
        {isEs
          ? 'Recibimos tu solicitud. Nuestro equipo se pondrá en contacto contigo en breve para confirmar los detalles.'
          : "We've received your request. Our team will contact you shortly to confirm the details."}
      </p>
      <Link
        href={isEs ? '/es/' : '/'}
        className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
      >
        {isEs ? 'Volver al inicio' : 'Back to Home'}
      </Link>
    </main>
  );
}
