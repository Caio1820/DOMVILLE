import React from 'react';
import { DOMVILLE_INFO } from '../data/domvilleData';
import { Users, Ticket, ArrowRight, Sparkles, Check, Flame } from 'lucide-react';

interface GuestListCardProps {
  onOpenGuestListModal: () => void;
}

export const GuestListCard: React.FC<GuestListCardProps> = ({ onOpenGuestListModal }) => {
  return (
    <section className="w-full px-4 py-2 max-w-lg mx-auto">
      <div className="relative group rounded-2xl p-[1.5px] bg-gradient-to-r from-amber-500/80 via-yellow-400 to-amber-600 shadow-xl shadow-amber-500/10 overflow-hidden transition-all duration-300 hover:shadow-amber-500/20">
        <div className="relative bg-gradient-to-b from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl rounded-[14.5px] p-4 sm:p-5">
          {/* Top header */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
              <Ticket className="w-3 h-3 text-amber-400" />
              Lista Amiga / Portaria VIP
            </span>
            <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Lista Aberta p/ o FDS
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-neutral-950 shadow-md shadow-amber-500/20 shrink-0">
              <Users className="w-5 h-5 stroke-[2.3]" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-display">
                Lista de Convidados & Amigos
              </h3>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                Coloque seu nome e de sua galera na lista oficial para garantir desconto na portaria e entrada prioritária.
              </p>
            </div>
          </div>

          {/* Quick perks */}
          <div className="mt-3.5 pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-2 text-[11px] text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Desconto até 22h30</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Fila rápida prioritária</span>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={onOpenGuestListModal}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
            >
              <span>Cadastrar Nomes na Lista</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
