'use client';

import { motion } from 'motion/react';
import { MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const AREAS = [
  { name: 'Playa del Carmen', hasFee: false, primary: true },
  { name: 'Playacar',         hasFee: false, primary: true },
  { name: 'Puerto Aventuras', hasFee: true,  primary: false },
  { name: 'Puerto Morelos',   hasFee: true,  primary: false },
  { name: 'Akumal',           hasFee: true,  primary: false },
];

export const ContactClient = () => {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <main className="pt-32 pb-24 bg-[#F5F2ED]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-tight mb-4">
          {isEs ? 'Reserva tu Masaje' : 'Book a Massage'}{' '}
          <span className="italic font-light">{isEs ? 'en Playa del Carmen' : 'in Playa del Carmen'}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-500 max-w-xl mb-16">
          {isEs
            ? 'La forma más rápida de reservar es por WhatsApp. Respondemos en minutos. También puedes escribirnos por email o llamarnos.'
            : 'The fastest way to book is WhatsApp. We reply in minutes. You can also reach us by email or phone.'}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.a href="https://wa.me/529842687428" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="col-span-1 md:col-span-2 flex items-center gap-6 bg-[#1A1A1A] text-white rounded-3xl p-8 hover:bg-[#2A2A2A] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-1">WhatsApp</p>
              <p className="text-2xl font-serif">+52 984 268 7428</p>
              <p className="text-white/60 text-sm mt-1">{isEs ? 'Toca para abrir WhatsApp. Respondemos en minutos.' : 'Tap to open WhatsApp. We reply in minutes.'}</p>
            </div>
          </motion.a>

          <motion.a href="mailto:boticaspa@gmail.com" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-5 bg-white rounded-3xl p-7 border border-[#E8E4DC] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-brand" /></div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">Email</p>
              <p className="font-serif text-[#1A1A1A] text-lg">boticaspa@gmail.com</p>
            </div>
          </motion.a>

          <motion.a href="tel:+529842687428" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-5 bg-white rounded-3xl p-7 border border-[#E8E4DC] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-brand" /></div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">{isEs ? 'Teléfono' : 'Phone'}</p>
              <p className="font-serif text-[#1A1A1A] text-lg">+52 984 268 7428</p>
            </div>
          </motion.a>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-5 bg-white rounded-3xl p-7 border border-[#E8E4DC]">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-brand" /></div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">{isEs ? 'Horario' : 'Hours'}</p>
              <p className="font-serif text-[#1A1A1A] text-lg">{isEs ? 'Todos los días 8 am – 9 pm' : 'Daily 8 am – 9 pm'}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex items-center gap-5 bg-white rounded-3xl p-7 border border-[#E8E4DC]">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-brand" /></div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">Base</p>
              <p className="font-serif text-[#1A1A1A] text-lg">Playa del Carmen, MX</p>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-serif text-[#1A1A1A] mb-6">{isEs ? 'Área de Servicio' : 'Service Area'}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {AREAS.map(area => (
              <div key={area.name} className={`rounded-2xl p-5 border flex flex-col gap-1 ${area.primary ? 'bg-white border-[#D6CFBE]' : 'bg-[#F9F8F6] border-gray-100'}`}>
                <span className="font-serif text-[#1A1A1A]">{area.name}</span>
                {area.hasFee && (
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    {isEs ? 'Cargo de traslado' : 'Travel fee'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};
