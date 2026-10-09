import React, { useState } from 'react';
import {
  DOMVILLE_INFO,
  GALLERY_HIGHLIGHTS,
  BIRTHDAY_BENEFITS,
} from '../data/domvilleData';
import {
  Instagram,
  MapPin,
  MessageCircle,
  Cake,
  Navigation,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';

export const EngagementLinks: React.FC = () => {
  const [showBirthdayDetails, setShowBirthdayDetails] = useState<boolean>(false);

  const openBirthdayWhatsApp = () => {
    const text = encodeURIComponent(
      '🎂 Olá, Domville! Faço aniversário em breve e gostaria de saber mais sobre as condições especiais e vantagens exclusivas para comemorar aí com meus convidados!'
    );
    window.open(`https://wa.me/${DOMVILLE_INFO.whatsappRawNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="w-full px-4 py-4 space-y-4 max-w-lg mx-auto">
      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
        <span>Conecte-se & Localização</span>
      </div>

      {/* 📸 CTA 1: Siga nosso Instagram (@domvilleap) */}
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-rose-500/40 p-4 transition-all duration-300 shadow-md">
        <a
          href={DOMVILLE_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform shrink-0">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors font-display">
                    Siga nosso Instagram
                  </h3>
                  <span className="text-xs font-bold text-rose-400">
                    {DOMVILLE_INFO.instagramHandle}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  Confira fotos da galera, atrações confirmadas e cobertura dos eventos.
                </p>
              </div>
            </div>
            <div className="text-neutral-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all shrink-0">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </a>

        {/* Mini Preview Gallery Grid */}
        <div className="mt-3.5 pt-3 border-t border-neutral-800/80">
          <div className="grid grid-cols-4 gap-2">
            {GALLERY_HIGHLIGHTS.map((item) => (
              <a
                key={item.id}
                href={DOMVILLE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/img relative aspect-square rounded-xl overflow-hidden bg-neutral-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 📍 CTA 2: Como Chegar (Localização no Google Maps) */}
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 p-4 transition-all duration-300 shadow-md">
        <a
          href={DOMVILLE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-neutral-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
                <MapPin className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                  Como Chegar (Google Maps)
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  Trace a rota no GPS e venha curtir na Domville.
                </p>
              </div>
            </div>
            <div className="text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </a>

        {/* Quick GPS Routing buttons */}
        <div className="mt-3.5 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <span className="text-xs text-neutral-400 truncate">
            {DOMVILLE_INFO.address}
          </span>
          <a
            href={DOMVILLE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-semibold shrink-0 transition"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Abrir GPS</span>
          </a>
        </div>
      </div>

      {/* 💬 CTA 3: Dúvidas, Aniversários e Eventos Privados */}
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-yellow-500/40 p-4 transition-all duration-300 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 text-neutral-950 shadow-md shadow-yellow-500/20 shrink-0">
              <Cake className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Aniversários & Eventos Privados
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                Fale com nosso atendimento para condições especiais de aniversariante.
              </p>
            </div>
          </div>
        </div>

        {/* Birthday benefits accordion preview */}
        <div className="mt-3.5 pt-3 border-t border-neutral-800/80 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Entrada VIP Grátis</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Mesa Reservada</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Balde ou Espumante Brinde</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Desconto p/ Convidados</span>
            </div>
          </div>

          <button
            onClick={openBirthdayWhatsApp}
            className="w-full mt-2 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Consultar Benefícios de Aniversário</span>
          </button>
        </div>
      </div>
    </section>
  );
};
