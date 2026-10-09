import React from 'react';
import { WEEKLY_EVENTS, DOMVILLE_INFO, EventProgram } from '../data/domvilleData';
import { Calendar, Clock, Flame, Music, Ticket, ChevronRight } from 'lucide-react';

interface EventsSectionProps {
  onSelectEvent: (day: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEvent }) => {
  return (
    <section id="programacao" className="w-full px-4 py-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Fim de Semana Domville</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight font-display">
            Programação da Semana
          </h2>
        </div>
        <span className="text-xs text-neutral-400">
          Ao vivo toda semana
        </span>
      </div>

      <div className="space-y-3">
        {WEEKLY_EVENTS.map((event) => (
          <div
            key={event.day}
            className="group relative rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 p-4 transition-all duration-300 hover:bg-neutral-900 shadow-md flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-wider">
                    {event.dateBadge}
                  </span>
                  <span className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    {event.time}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                  {event.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Special Highlight pill */}
            <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 font-semibold bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{event.highlight}</span>
              </div>

              <button
                onClick={() => onSelectEvent(event.day)}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-0.5 transition-all"
              >
                <span>Garantir Reserva</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
