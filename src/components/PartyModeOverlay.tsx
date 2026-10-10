import React, { useEffect, useState } from 'react';
import { Sparkles, Music, Volume2, VolumeX, X, Flame } from 'lucide-react';

interface PartyModeOverlayProps {
  isActive: boolean;
  onToggle: () => void;
}

export const PartyModeOverlay: React.FC<PartyModeOverlayProps> = ({ isActive, onToggle }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // Audio synthesis loop when party mode is active
  useEffect(() => {
    if (!isActive || !isAudioEnabled) return;

    let isRunning = true;
    let intervalId: NodeJS.Timeout | null = null;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      let step = 0;
      intervalId = setInterval(() => {
        if (!isRunning) return;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const now = ctx.currentTime;

        // Pandeiro / agogô high tap
        if (step % 2 === 0 || step % 3 === 0) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(750 + (step % 4) * 80, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.07);
        }

        // Surdo / Tantan deep bass
        if (step % 4 === 0) {
          const oscBass = ctx.createOscillator();
          const gainBass = ctx.createGain();
          oscBass.type = 'sine';
          oscBass.frequency.setValueAtTime(110, now);
          oscBass.frequency.exponentialRampToValueAtTime(50, now + 0.22);
          gainBass.gain.setValueAtTime(0.18, now);
          gainBass.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          oscBass.connect(gainBass);
          gainBass.connect(ctx.destination);
          oscBass.start(now);
          oscBass.stop(now + 0.25);
        }

        // Tamborim rimshot
        if (step === 3 || step === 7 || step === 11 || step === 14) {
          const oscTam = ctx.createOscillator();
          const gainTam = ctx.createGain();
          oscTam.type = 'square';
          oscTam.frequency.setValueAtTime(1200, now);
          gainTam.gain.setValueAtTime(0.03, now);
          gainTam.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          oscTam.connect(gainTam);
          gainTam.connect(ctx.destination);
          oscTam.start(now);
          oscTam.stop(now + 0.05);
        }

        step = (step + 1) % 16;
      }, 140);
    } catch {
      // Audio not permitted or supported
    }

    return () => {
      isRunning = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, isAudioEnabled]);

  if (!isActive) return null;

  // Generate 18 confetti pieces with randomized positions
  const confettiPieces = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 5.5 + 4) % 96}%`,
    delay: `${(i * 0.25) % 3.5}s`,
    duration: `${2.8 + (i % 4) * 0.6}s`,
    color: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#fbbf24', '#f43f5e'][i % 6],
    size: `${6 + (i % 3) * 4}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Nightclub moving head laser beams */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[750px] -translate-x-1/2 bg-gradient-to-b from-amber-500/25 via-rose-500/15 to-transparent blur-3xl origin-top animate-laser" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[750px] translate-x-1/2 bg-gradient-to-b from-purple-500/25 via-amber-500/15 to-transparent blur-3xl origin-top animate-laser [animation-delay:2s]" />

      {/* Floating confetti */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            borderRadius: piece.id % 2 === 0 ? '50%' : '2px',
          }}
        />
      ))}

      {/* Party Mode Banner on top */}
      <div className="pointer-events-auto fixed top-3 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md">
        <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-neutral-950/95 border border-amber-500/60 shadow-2xl shadow-amber-500/30 backdrop-blur-md animate-party-glow">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500 text-neutral-950 font-black animate-bounce text-xs">
              🎉
            </span>
            <div>
              <p className="text-[11px] sm:text-xs font-black tracking-wide text-amber-300 uppercase flex items-center gap-1 font-display">
                <span>Modo Festa Ativado</span>
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              </p>
              <p className="text-[10px] text-neutral-400 hidden xs:block">
                Luzes e batida de pagode ao vivo!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              aria-label="Alternar áudio da batida"
              className={`p-1.5 rounded-xl border text-xs font-bold transition-all ${
                isAudioEnabled
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-neutral-900 text-neutral-500 border-neutral-800'
              }`}
              title={isAudioEnabled ? 'Silenciar batida' : 'Ativar batida de pagode'}
            >
              {isAudioEnabled ? (
                <Volume2 className="w-4 h-4 stroke-[2.2]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onToggle}
              aria-label="Sair do Modo Festa"
              className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition"
              title="Desativar Modo Festa"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
