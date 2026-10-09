import React, { useState } from 'react';
import { DOMVILLE_INFO } from '../data/domvilleData';
import { Instagram, MapPin, MessageCircle, Share2, Sparkles, Check, Music } from 'lucide-react';

interface HeaderProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation, onOpenMenu }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Domville - Casa de Pagode',
          text: 'Vem curtir o melhor pagode da cidade na Domville! Confira a programação e cardápio:',
          url: window.location.href,
        });
      } catch {
        // User cancelled or failed share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <header className="relative w-full pt-8 pb-4 px-4 flex flex-col items-center text-center">
      {/* Ambient background glow highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-amber-500/15 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-12 left-1/4 w-32 h-32 bg-rose-600/10 blur-2xl -z-10 pointer-events-none rounded-full" />

      {/* Live Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide mb-4 shadow-sm backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Aberto Sexta a Domingo</span>
        <span className="text-amber-500/40">·</span>
        <span className="text-amber-200/90 font-semibold">Programação Atualizada</span>
      </div>

      {/* Official Brand Logo with pulsing amber/golden glow */}
      <div className="relative group cursor-pointer mb-4" onClick={onOpenReservation}>
        <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-600 via-yellow-500 to-rose-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-subtle"></div>
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-b from-amber-400 via-amber-700 to-neutral-900 shadow-2xl">
          <img
            src={DOMVILLE_INFO.logoUrl}
            alt="Domville Casa de Pagode"
            className="w-full h-full object-cover rounded-full border-2 border-neutral-900 shadow-inner group-hover:scale-105 transition-transform duration-300"
            loading="eager"
          />
        </div>
        <div className="absolute -bottom-1.5 -right-1.5 bg-amber-500 text-neutral-950 p-1.5 rounded-full border-2 border-neutral-950 shadow-md">
          <Sparkles className="w-3.5 h-3.5 fill-neutral-950" />
        </div>
      </div>

      {/* Brand Title and Subtitle */}
      <div className="space-y-1.5 max-w-md">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm font-display">
            {DOMVILLE_INFO.name}
          </h1>
        </div>

        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-300/90 flex items-center justify-center gap-1.5">
          <Music className="w-3.5 h-3.5 text-amber-400 inline" />
          <span>Casa de Pagode & Entretenimento</span>
        </p>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal pt-1 px-3">
          {DOMVILLE_INFO.tagline}
        </p>
      </div>

      {/* Quick Action Pills for rapid touch engagement */}
      <div className="flex items-center justify-center gap-2.5 mt-5">
        <a
          href={DOMVILLE_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir Instagram @domvilleap"
          className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-rose-400 hover:border-rose-500/40 hover:bg-neutral-800/80 transition-all duration-200 shadow-sm active:scale-95"
          title="Instagram @domvilleap"
        >
          <Instagram className="w-4 h-4" />
        </a>

        <a
          href={DOMVILLE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Como Chegar no Maps"
          className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 hover:bg-neutral-800/80 transition-all duration-200 shadow-sm active:scale-95"
          title="Ver no Google Maps"
        >
          <MapPin className="w-4 h-4" />
        </a>

        <a
          href={DOMVILLE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-neutral-800/80 transition-all duration-200 shadow-sm active:scale-95"
          title="WhatsApp Direto"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <button
          onClick={handleShare}
          aria-label="Compartilhar Biosite Domville"
          className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-yellow-400 hover:border-yellow-500/40 hover:bg-neutral-800/80 transition-all duration-200 shadow-sm active:scale-95 relative"
          title="Compartilhar Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          {copied && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-500 text-neutral-950 font-bold text-[10px] px-2 py-0.5 rounded shadow">
              Copiado!
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
