'use client';

import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LangLink } from './LangLink';

const CITY_CONFIGS: Record<string, {
  name: string; heroImage: string;
  h1En: string; introEn: string; notesEn: string;
  h1Es: string; introEs: string; notesEs: string;
  whatsappMsg: string; whatsappMsgEs: string;
}> = {
  'puerto-aventuras': {
    name: 'Puerto Aventuras', heroImage: '/spa-interior.webp',
    h1En: 'Massage in Puerto Aventuras',
    introEn: 'Botica Spa brings certified therapists and a full professional setup directly to your Puerto Aventuras villa, condo, or hotel. Just minutes south of Playa del Carmen.',
    notesEn: 'Puerto Aventuras is close to our base in Playa del Carmen. A small travel fee may apply depending on your exact location. Ask us on WhatsApp before booking.',
    h1Es: 'Masaje a Domicilio en Puerto Aventuras',
    introEs: 'Botica Spa lleva terapeutas certificadas y equipo profesional completo directamente a tu villa, condominio u hotel en Puerto Aventuras. A pocos minutos al sur de Playa del Carmen.',
    notesEs: 'Puerto Aventuras está cerca de nuestra base en Playa del Carmen. Puede aplicar un pequeño cargo de traslado según tu ubicación exacta. Pregúntanos por WhatsApp antes de reservar.',
    whatsappMsg: "Hi! I'd like to book an in home massage in Puerto Aventuras 🌿 Could you help me?",
    whatsappMsgEs: '¡Hola! Me gustaría reservar un masaje a domicilio en Puerto Aventuras 🌿 ¿Me pueden ayudar?',
  },
  'puerto-morelos': {
    name: 'Puerto Morelos', heroImage: '/masaje-relajante.webp',
    h1En: 'Massage in Puerto Morelos',
    introEn: 'Botica Spa brings the spa to you at your Puerto Morelos hotel, vacation rental, or private villa. Perfect for couples, groups, and solo travelers seeking quiet beachside relaxation.',
    notesEn: 'Puerto Morelos is north of Playa del Carmen, between PDC and Cancún. A travel fee applies. Confirm your location on WhatsApp before booking.',
    h1Es: 'Masaje a Domicilio en Puerto Morelos',
    introEs: 'Botica Spa lleva el spa a ti a tu hotel, renta vacacional o villa en Puerto Morelos. Perfecto para parejas, grupos y viajeros que buscan relajación junto al mar.',
    notesEs: 'Puerto Morelos está al norte de Playa del Carmen, entre PDC y Cancún. Aplica cargo de traslado. Confirma tu ubicación por WhatsApp antes de reservar.',
    whatsappMsg: "Hi! I'd like to book an in home massage in Puerto Morelos 🌿 Could you help me?",
    whatsappMsgEs: '¡Hola! Me gustaría reservar un masaje a domicilio en Puerto Morelos 🌿 ¿Me pueden ayudar?',
  },
  'akumal': {
    name: 'Akumal', heroImage: '/galeria-1.webp',
    h1En: 'Massage in Akumal',
    introEn: 'Enjoy a professional in home massage at your Akumal villa or hotel. Botica Spa brings everything you need: organic oils, massage table, fresh linens. No need to leave your beachfront retreat.',
    notesEn: 'Akumal is within our service area. Travel fee may apply depending on your location. Ask us on WhatsApp.',
    h1Es: 'Masaje a Domicilio en Akumal',
    introEs: 'Disfruta un masaje profesional a domicilio en tu villa u hotel en Akumal. Botica Spa lleva todo lo necesario: aceites orgánicos, camilla, ropa de cama. Sin salir de tu retiro frente al mar.',
    notesEs: 'Akumal está dentro de nuestra zona de servicio. Puede aplicar cargo de traslado según tu ubicación. Pregúntanos por WhatsApp.',
    whatsappMsg: "Hi! I'd like to book an in home massage in Akumal 🌿 Could you help me?",
    whatsappMsgEs: '¡Hola! Me gustaría reservar un masaje a domicilio en Akumal 🌿 ¿Me pueden ayudar?',
  },
  'playacar': {
    name: 'Playacar', heroImage: '/galeria-2.webp',
    h1En: 'Massage in Playacar',
    introEn: 'Botica Spa serves villas and hotels throughout Playacar Phase 1 and Phase 2. Our therapists arrive with everything and handle full setup so your only job is to relax.',
    notesEn: 'Playacar is within our primary service area. No travel fee for most Playacar locations.',
    h1Es: 'Masaje a Domicilio en Playacar',
    introEs: 'Botica Spa atiende villas y hoteles en toda Playacar Fase 1 y Fase 2. Nuestras terapeutas llegan con todo y se encargan de la instalación. Tu único trabajo es relajarte.',
    notesEs: 'Playacar está dentro de nuestra zona principal de servicio. Sin cargo de traslado para la mayoría de ubicaciones en Playacar.',
    whatsappMsg: "Hi! I'd like to book an in home massage in Playacar 🌿 Could you help me?",
    whatsappMsgEs: '¡Hola! Me gustaría reservar un masaje a domicilio en Playacar 🌿 ¿Me pueden ayudar?',
  },
};

const ALL_SERVICES = [
  { id: 'botica',       slug: 'botica-signature',    image: '/masaje-botica.webp',       priceKey: 'price90' },
  { id: 'fourHands',    slug: 'four-hands-massage',  image: '/masaje-cuatro-manos.webp', priceKey: 'price90' },
  { id: 'deepTissue',   slug: 'deep-tissue-massage', image: '/masaje-profundo.webp',     priceKey: 'price60' },
  { id: 'relaxing',     slug: 'relaxing-massage',    image: '/masaje-relajante.webp',    priceKey: 'price60' },
  { id: 'personalized', slug: 'personalized-massage',image: '/spa-detalle.webp',         priceKey: 'price60' },
  { id: 'facial',       slug: 'revitalizing-facial', image: '/masaje-cuatro-manos.webp', priceKey: 'price60' },
];

export const LocationClient = ({ city }: { city: string }) => {
  const { language, t } = useLanguage();
  const config = CITY_CONFIGS[city];
  if (!config) return null;

  const isEs = language === 'es';
  const whatsappUrl = `https://wa.me/529842687428?text=${encodeURIComponent(isEs ? config.whatsappMsgEs : config.whatsappMsg)}`;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <img src={config.heroImage} alt={`In-home massage in ${config.name}`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#C9B99A]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9B99A] font-bold">Botica Spa · {config.name}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">
              {isEs ? config.h1Es : config.h1En}
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed">{isEs ? config.introEs : config.introEn}</p>
            <div className="mt-8">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-[#F5F2ED] transition-colors">
                <MessageCircle className="w-4 h-4" />
                {isEs ? 'Reservar por WhatsApp' : 'Book on WhatsApp'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-[#F5F2ED] py-20">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold block mb-3">{t.services.badge}</span>
            <h2 className="text-4xl font-serif text-[#1A1A1A]">
              {isEs ? `Tratamientos disponibles en ${config.name}` : `Treatments Available in ${config.name}`}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SERVICES.map((service, index) => {
              const item = (t.services.items as any)[service.id];
              const price = item[service.priceKey];
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group relative">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl shadow-black/5">
                    <img src={service.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-serif text-white mb-1 leading-tight">{item.name}</h3>
                      <p className="text-white/60 text-xs leading-relaxed italic line-clamp-2 mb-4">{item.desc}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white/50 text-[10px] uppercase tracking-widest block mb-0.5">{t.services.from}</span>
                          <span className="text-lg font-serif text-white">${price?.toLocaleString()} {t.services.currency}</span>
                        </div>
                        <LangLink to={`/massages/${service.slug}`} aria-label={`View details for ${item.name}`} className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] transition-all duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </LangLink>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Travel note + CTA */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#F9F8F6] rounded-3xl p-10 border border-[#E8E4DC]">
            <MapPin className="w-6 h-6 text-brand mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3">{isEs ? 'Vamos a Ti' : 'We Come to You'}</h3>
            <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mb-8 max-w-md mx-auto">{isEs ? config.notesEs : config.notesEn}</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-10 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors">
              <MessageCircle className="w-4 h-4" />
              {isEs ? `Reservar en ${config.name}` : `Book a Massage in ${config.name}`}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-12">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">{isEs ? 'También disponible en' : 'Also available in'}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(CITY_CONFIGS).filter(([key]) => key !== city).map(([key, cfg]) => (
                <LangLink key={key} to={`/massage-${key}`} className="px-5 py-2 border border-gray-200 rounded-full text-xs uppercase tracking-widest text-gray-500 hover:border-brand hover:text-brand transition-colors">
                  {cfg.name}
                </LangLink>
              ))}
              <LangLink to="/massages" className="px-5 py-2 border border-gray-200 rounded-full text-xs uppercase tracking-widest text-gray-500 hover:border-brand hover:text-brand transition-colors">
                Playa del Carmen
              </LangLink>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
