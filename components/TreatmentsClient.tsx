'use client';

import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LangLink } from './LangLink';

const ALL_SERVICES = [
  { id: 'botica',      slug: 'botica-signature',    image: '/masaje-botica.webp' },
  { id: 'fourHands',   slug: 'four-hands-massage',  image: '/masaje-cuatro-manos.webp' },
  { id: 'deepTissue',  slug: 'deep-tissue-massage', image: '/masaje-profundo.webp' },
  { id: 'relaxing',    slug: 'relaxing-massage',     image: '/masaje-relajante.webp' },
  { id: 'personalized',slug: 'personalized-massage', image: '/spa-detalle.webp' },
  { id: 'facial',      slug: 'revitalizing-facial',  image: '/masaje-cuatro-manos.webp' },
];

export const TreatmentsClient = () => {
  const { language, t } = useLanguage();

  return (
    <main className="pt-32 pb-24 bg-[#F5F2ED]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-brand" />
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">{t.services.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-tight">
            {language === 'en' ? 'In Home Massage Playa del Carmen' : 'Masaje a Domicilio Playa del Carmen'}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-500 mt-6 max-w-2xl leading-relaxed">
            {language === 'en'
              ? 'Book for same day or advance delivery to your hotel, villa or Airbnb. We bring the table, linens, and organic oils.'
              : 'Reserva para entrega el mismo día o con anticipación en tu hotel, villa o Airbnb. Llevamos la camilla, ropa de cama y aceites orgánicos.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_SERVICES.map((service, index) => {
            const item = (t.services.items as any)[service.id];
            const prices = Object.entries(item).filter(([k]) => k.startsWith('price')).map(([, v]) => v as number);
            const minPrice = Math.min(...prices);
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/5">
                  <img
                    src={service.image}
                    alt={`${item.name} in Playa del Carmen. In home spa by Botica Spa`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-6">
                      <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">{item.name}</h2>
                      <p className="text-white/70 text-xs md:text-sm leading-relaxed italic line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white/60 text-[10px] uppercase tracking-widest block mb-1">{t.services.from}</span>
                        <span className="text-xl md:text-2xl font-serif text-white">${minPrice.toLocaleString()} {t.services.currency}</span>
                      </div>
                      <LangLink to={`/massages/${service.slug}`} aria-label={`View details for ${item.name}`} className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] transition-all duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </LangLink>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
