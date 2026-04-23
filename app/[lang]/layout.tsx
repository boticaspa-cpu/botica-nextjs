import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/LanguageProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export type Lang = 'en' | 'es';

// Next.js provides params as { lang: string }; cast to Lang where needed
export type LangParams = { lang: string };

// Hreflang alternate URLs for bilingual SEO
function buildAlternates(pathname: string) {
  const base = 'https://www.boticaspa.com';
  return {
    languages: {
      en: `${base}${pathname}`,
      es: `${base}/es${pathname}`,
      'x-default': `${base}${pathname}`,
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: buildAlternates('/'),
    openGraph: { locale: lang === 'es' ? 'es_MX' : 'en_US' },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  return (
    <div lang={lang}>
      <LanguageProvider>
        <Navbar />
        {children}
        <Footer />
      </LanguageProvider>
    </div>
  );
}
