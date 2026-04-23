import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map Spanish URL slugs → English slugs used in the app directory
const ES_SLUG_MAP: Record<string, string> = {
  'masajes': 'massages',
  'sobre-nosotros': 'about',
  'contacto': 'contact',
  'preguntas-frecuentes': 'faq',
  // Location pages: masaje-ciudad stays as massage-ciudad
  'masaje-puerto-aventuras': 'massage-puerto-aventuras',
  'masaje-puerto-morelos': 'massage-puerto-morelos',
  'masaje-akumal': 'massage-akumal',
  'masaje-playacar': 'massage-playacar',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals, static assets, API routes, and admin panel
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Spanish routes: rewrite ES slugs to EN slugs internally
  // e.g. /es/masajes → /es/massages  (URL stays /es/masajes, app sees /es/massages)
  if (pathname.startsWith('/es/')) {
    const parts = pathname.split('/'); // ['', 'es', 'slug', ...rest]
    const slug = parts[2];
    if (slug && ES_SLUG_MAP[slug]) {
      const rewritten = ['', 'es', ES_SLUG_MAP[slug], ...parts.slice(3)].join('/');
      return NextResponse.rewrite(new URL(rewritten, request.url));
    }
    return NextResponse.next();
  }

  // Root /es → handled by app/[lang]/page.tsx (lang='es')
  if (pathname === '/es') {
    return NextResponse.next();
  }

  // English routes: rewrite /path → /en/path so [lang] segment = 'en'
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/en', request.url));
  }

  return NextResponse.rewrite(new URL(`/en${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',],
};
