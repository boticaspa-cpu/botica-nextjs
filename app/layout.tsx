import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: {
    template: '%s | Botica Spa',
    default: 'Massage Playa del Carmen | In Home Spa | Botica Spa',
  },
  description:
    'In-home massage in Playa del Carmen. We bring certified therapists to your hotel, Airbnb, or villa. Relaxing, deep tissue, four hands & more. Book now.',
  metadataBase: new URL('https://www.boticaspa.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
