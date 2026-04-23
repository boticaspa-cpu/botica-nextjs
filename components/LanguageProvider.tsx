'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { translations, type Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  t: (typeof translations)[Language];
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const language: Language = pathname.startsWith('/es') ? 'es' : 'en';
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{ language, t, setLanguage: () => {}, toggleLanguage: () => {} }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
