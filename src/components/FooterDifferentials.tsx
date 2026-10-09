import React from 'react';
import { DOMVILLE_INFO } from '../data/domvilleData';
import {
  Music,
  Beer,
  Cake,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Heart,
} from 'lucide-react';

export const FooterDifferentials: React.FC = () => {
  const differentials = [
    {
      icon: Music,
      title: 'Pagode ao Vivo',
      desc: 'Todas as semanas com as melhores atrações regionais e convidados especiais.',
    },
    {
      icon: Beer,
      title: 'Cerveja Trincando',
      desc: 'Bebidas e chopp servidos na temperatura negativa ideal durante toda a noite.',
    },
    {
      icon: Cake,
      title: 'Aniversariante VIP',
      desc: 'Condições exclusivas, vantagens para lista de convidados e brindes comemorativos.',
    },
    {
      icon: ShieldCheck,
      title: 'Ambiente Seguro & Climatizado',
      desc: 'Estrutura premium, segurança qualificada e conforto térmico total.',
    },
  ];

  return (
    <footer className="w-full px-4 pt-4 pb-28 max-w-lg mx-auto">
      {/* 4 Brand Differentials */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 px-1">
          Por que a Domville é a Melhor Casa de Pagode?
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {differentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col justify-between"
              >
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-2 border border-amber-500/20">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* House Info Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 text-xs text-neutral-400 space-y-2">
        <div className="flex items-center gap-2 text-white font-bold font-display text-sm">
          <span>{DOMVILLE_INFO.fullName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{DOMVILLE_INFO.operatingHours}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{DOMVILLE_INFO.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>WhatsApp Reservas: {DOMVILLE_INFO.whatsappDisplayNumber}</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-[11px] text-neutral-500 space-y-1">
        <p>© {new Date().getFullYear()} Domville - Todos os direitos reservados.</p>
        <p className="text-neutral-600">
          Biosite Premium desenvolvido para proporcionar a melhor experiência de reservas e cardápio.
        </p>
      </div>
    </footer>
  );
};
