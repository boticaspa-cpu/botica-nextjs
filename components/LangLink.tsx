'use client';

import NextLink, { type LinkProps } from 'next/link';
import { type AnchorHTMLAttributes, forwardRef } from 'react';
import { useLanguage } from './LanguageProvider';

export const ES_PATHS: Record<string, string> = {
  '/':                             '/es/',
  '/massages':                     '/es/masajes',
  '/about':                        '/es/sobre-nosotros',
  '/blog':                         '/es/blog',
  '/massage-puerto-aventuras':     '/es/masaje-puerto-aventuras',
  '/massage-puerto-morelos':       '/es/masaje-puerto-morelos',
  '/massage-akumal':               '/es/masaje-akumal',
  '/massage-playacar':             '/es/masaje-playacar',
  '/contact':                      '/es/contacto',
  '/faq':                          '/es/preguntas-frecuentes',
};

export function toLangPath(path: string, language: string): string {
  if (language !== 'es') return path;
  if (ES_PATHS[path]) return ES_PATHS[path];
  if (path.startsWith('/massages/')) return path.replace('/massages/', '/es/masajes/');
  if (path.startsWith('/blog/'))     return path.replace('/blog/', '/es/blog/');
  return `/es${path}`;
}

type LangLinkProps = Omit<LinkProps, 'href'> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
  };

export const LangLink = forwardRef<HTMLAnchorElement, LangLinkProps>(
  ({ to, ...props }, ref) => {
    const { language } = useLanguage();
    const href = toLangPath(to, language);
    return <NextLink ref={ref} href={href} {...props} />;
  }
);
LangLink.displayName = 'LangLink';
