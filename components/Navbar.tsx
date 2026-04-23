'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { useLanguage } from './LanguageProvider';
import { LangLink, toLangPath, ES_PATHS } from './LangLink';
import { BookingSystem } from './BookingSystem';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const { language, t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const rawPathname = usePathname();
  // Strip /en prefix added by next.config rewrites (usePathname returns the rewritten internal path)
  const pathname = rawPathname.startsWith('/en') ? (rawPathname.slice(3) || '/') : rawPathname;
  const isHome = rawPathname === '/en' || rawPathname === '/es' || rawPathname === '/es/';
  const isEs = language === 'es';

  // Compute alternate language path
  const altPath = isEs
    ? (Object.entries(ES_PATHS).find(([, v]) => v === pathname)?.[0] ?? (pathname.replace(/^\/es/, '') || '/'))
    : toLangPath(pathname, 'es');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* Desktop + Mobile Nav */}
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center transition-all duration-500',
        isHome
          ? 'bg-gradient-to-b from-black/20 to-transparent'
          : 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100'
      )}>
        <LangLink to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Botica Spa Logo"
            width={48}
            height={48}
            className={cn('w-12 h-12 object-contain transition-all', isHome ? 'brightness-0 invert' : '')}
          />
        </LangLink>

        {/* Desktop links */}
        <div className={cn(
          'hidden md:flex items-center gap-8 text-xs uppercase tracking-widest transition-colors',
          isHome ? 'text-white/80' : 'text-[#1A1A1A]/60'
        )}>
          <LangLink to="/massages" className={cn('hover:text-white transition-colors', !isHome && 'hover:text-brand')}>
            {t.nav.treatments}
          </LangLink>
          <LangLink to="/about" className={cn('hover:text-white transition-colors', !isHome && 'hover:text-brand')}>
            {isEs ? 'Nosotros' : 'About'}
          </LangLink>
          <LangLink to="/blog" className={cn('hover:text-white transition-colors', !isHome && 'hover:text-brand')}>
            {t.nav.blog}
          </LangLink>

          {/* Language switcher */}
          <NextLink
            href={altPath}
            className={cn(
              'text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all',
              isHome
                ? 'border-white/30 text-white/70 hover:border-white hover:text-white'
                : 'border-gray-300 text-gray-500 hover:border-brand hover:text-brand'
            )}
          >
            {isEs ? 'EN' : 'ES'}
          </NextLink>

          <button
            onClick={() => setIsBookingOpen(true)}
            className={cn(
              'px-6 py-3 rounded-full transition-all font-medium',
              isHome ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]'
            )}
          >
            {t.nav.bookNow}
          </button>
        </div>

        {/* Mobile: language pill + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <NextLink
            href={altPath}
            className={cn(
              'text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all',
              isHome
                ? 'border-white/30 text-white/70 hover:border-white hover:text-white'
                : 'border-gray-300 text-gray-500 hover:border-brand hover:text-brand'
            )}
          >
            {isEs ? 'EN' : 'ES'}
          </NextLink>
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            className={cn('p-2 transition-colors', isHome ? 'text-white' : 'text-[#1A1A1A]')}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100">
              <LangLink to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                <img src="/logo.png" alt="Botica Spa Logo" width={40} height={40} className="w-10 h-10 object-contain" />
              </LangLink>
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-2 text-[#1A1A1A]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-8 p-8">
              <LangLink to="/massages" className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t.nav.treatments}
              </LangLink>
              <LangLink to="/about" className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors" onClick={() => setIsMenuOpen(false)}>
                {isEs ? 'Nosotros' : 'About'}
              </LangLink>
              <LangLink to="/blog" className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t.nav.blog}
              </LangLink>
              <button
                onClick={() => { setIsBookingOpen(true); setIsMenuOpen(false); }}
                className="mt-4 w-full max-w-xs bg-[#1A1A1A] text-white py-5 rounded-full text-lg font-medium hover:bg-[#2A2A2A] transition-colors"
              >
                {t.nav.bookNow}
              </button>
            </div>

            <div className="p-8 border-t border-gray-100 flex justify-center gap-8">
              <a href={t.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">Instagram</a>
              <a href={t.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">Facebook</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingSystem isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand transition-colors"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
