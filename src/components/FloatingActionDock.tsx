import React, { useState } from 'react';
import { DOMVILLE_INFO } from '../data/domvilleData';
import { MessageCircle, UtensilsCrossed, Sparkles, Music2, Volume2, VolumeX } from 'lucide-react';

interface FloatingActionDockProps {
  onOpenReservation: () => void;
  onScrollToMenu: () => void;
}

export const FloatingActionDock: React.FC<FloatingActionDockProps> = ({
  onOpenReservation,
  onScrollToMenu,
}) => {
  const [isPlayingRhythm, setIsPlayingRhythm] = useState(false);

  // Play an ambient samba/pagode rhythm beat using Web Audio API synthesis!
  const togglePagodeBeat = () => {
    if (isPlayingRhythm) {
      setIsPlayingRhythm(false);
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();

      let step = 0;
      setIsPlayingRhythm(true);

      const interval = setInterval(() => {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const now = ctx.currentTime;

        // Pandeiro / Hihat tap
        if (step % 2 === 0 || step % 3 === 0) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(600 + (step % 4) * 50, now);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.08);
        }

        // Tantan / Surdo bass pulse
        if (step % 4 === 0) {
          const oscBass = ctx.createOscillator();
          const gainBass = ctx.createGain();
          oscBass.type = 'sine';
          oscBass.frequency.setValueAtTime(95, now);
          oscBass.frequency.exponentialRampToValueAtTime(45, now + 0.2);
          gainBass.gain.setValueAtTime(0.2, now);
          gainBass.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          oscBass.connect(gainBass);
          gainBass.connect(ctx.destination);
          oscBass.start(now);
          oscBass.stop(now + 0.25);
        }

        step = (step + 1) % 16;
      }, 150);

      // Store cleanup on window
      (window as unknown as { __pagodeInterval?: NodeJS.Timeout }).__pagodeInterval = interval;
    } catch {
      // AudioContext not allowed or supported
      setIsPlayingRhythm(false);
    }
  };

  const handleStopRhythm = () => {
    const win = window as unknown as { __pagodeInterval?: NodeJS.Timeout };
    if (win.__pagodeInterval) {
      clearInterval(win.__pagodeInterval);
      win.__pagodeInterval = undefined;
    }
    setIsPlayingRhythm(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto flex items-center gap-2 pointer-events-auto">
        {/* Quick Menu Button */}
        <button
          onClick={onScrollToMenu}
          className="flex-1 py-3 px-3.5 rounded-2xl bg-neutral-900/95 border border-neutral-700/80 text-neutral-200 text-xs font-bold shadow-xl hover:bg-neutral-800 hover:text-amber-300 transition-all flex items-center justify-center gap-1.5 active:scale-95 backdrop-blur-md"
        >
          <UtensilsCrossed className="w-4 h-4 text-amber-400" />
          <span>Cardápio</span>
        </button>

        {/* Primary WhatsApp / Reservation Button */}
        <button
          onClick={onOpenReservation}
          className="flex-[2] py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 text-xs sm:text-sm font-extrabold shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-2 relative overflow-hidden"
        >
          {/* Subtle pulse shimmer */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-950"></span>
          </span>
          <MessageCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Reservas & VIP</span>
        </button>

        {/* Ambient Pagode Vibe / Rhythm preview toggle */}
        <button
          onClick={() => {
            if (isPlayingRhythm) {
              handleStopRhythm();
            } else {
              togglePagodeBeat();
            }
          }}
          className={`p-3.5 rounded-2xl border text-xs font-bold shadow-xl transition-all active:scale-95 backdrop-blur-md shrink-0 ${
            isPlayingRhythm
              ? 'bg-amber-500 text-neutral-950 border-amber-400 animate-pulse'
              : 'bg-neutral-900/95 border-neutral-700/80 text-neutral-300 hover:text-amber-400'
          }`}
          title={isPlayingRhythm ? 'Pausar ritmo do pagode' : 'Tocar batida de pagode'}
          aria-label="Batida de pagode"
        >
          {isPlayingRhythm ? (
            <Volume2 className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <Music2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
