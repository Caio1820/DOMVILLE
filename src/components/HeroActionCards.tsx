import React from 'react';
import { DOMVILLE_INFO } from '../data/domvilleData';
import { Ticket, Sparkles, UtensilsCrossed, ArrowRight, Flame, Beer, Users } from 'lucide-react';

interface HeroActionCardsProps {
  onOpenReservationModal: () => void;
  onScrollToMenu: () => void;
  onScrollToEvents: () => void;
}

export const HeroActionCards: React.FC<HeroActionCardsProps> = ({
  onOpenReservationModal,
  onScrollToMenu,
  onScrollToEvents,
}) => {
  return (
    <section className="w-full px-4 py-3 space-y-3.5 max-w-lg mx-auto">
      {/* 🎟️ PRIMARY HIGHLIGHT: Programação da Semana & Reservas de Camarotes / Mesas */}
      <div className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 shadow-xl shadow-amber-500/15 overflow-hidden transition-all duration-300 hover:shadow-amber-500/30">
        {/* Animated shimmer border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />

        <div className="relative bg-neutral-950/95 backdrop-blur-xl rounded-[14px] p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
          {/* Background decorative watermark */}
          <div className="absolute -right-6 -bottom-6 text-amber-500/10 pointer-events-none">
            <Ticket className="w-36 h-36 rotate-12" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                Destaque Principal
              </span>
              <span className="text-[11px] font-medium text-neutral-400">
                Sexta a Domingo
              </span>
            </div>

            <div className="flex items-start gap-3 mt-1">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-neutral-950 shadow-lg shadow-amber-500/20 shrink-0">
                <Ticket className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug font-display">
                  Programação da Semana & Reservas
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                  Garanta seu camarote, mesa ou nome na lista VIP.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Direct WhatsApp or Interactive Booking Modal */}
          <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row gap-2">
            <a
              href={DOMVILLE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-amber-500/20"
            >
              <span>Reservar no WhatsApp</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <button
              onClick={onOpenReservationModal}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-900 border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-neutral-800 hover:border-amber-400 transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Simular Camarote / Mesa</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🍹 SECONDARY HERO: Novo Cardápio Digital Interativo (Reformulação) */}
      <div 
        onClick={onScrollToMenu}
        className="cursor-pointer group relative rounded-2xl p-[1px] bg-gradient-to-r from-neutral-800 via-neutral-700 to-amber-900/60 shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
      >
        <div className="relative bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 backdrop-blur-xl rounded-[15px] p-4 flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/30 text-rose-400 group-hover:scale-105 transition-transform shrink-0">
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors font-display">
                  Novo Cardápio Digital Interativo
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  NOVO
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                Drinks exclusivos, combos de garrafa & petiscos de boteco.
              </p>
            </div>
          </div>

          <div className="flex items-center text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 pl-1">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};
