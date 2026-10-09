import React, { useState } from 'react';
import { DOMVILLE_INFO } from '../data/domvilleData';
import { X, Calendar, Users, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Cake } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDay?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedDay,
}) => {
  const [day, setDay] = useState<string>(preselectedDay || 'Sábado');
  const [type, setType] = useState<string>('Camarote VIP (Até 10 pessoas)');
  const [people, setPeople] = useState<number>(6);
  const [name, setName] = useState<string>('');
  const [isBirthday, setIsBirthday] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleSendReservation = (e: React.FormEvent) => {
    e.preventDefault();

    const textLines = [
      `🥁 *RESERVA DOMVILLE - CASA DE PAGODE* 🥁`,
      ``,
      `• *Nome do Titular:* ${name || 'Não informado'}`,
      `• *Dia Pretendido:* ${day}`,
      `• *Tipo de Reserva:* ${type}`,
      `• *Quantidade de Pessoas:* ${people} convidados`,
      isBirthday ? `• *Comemoração:* 🎂 ANIVERSARIANTE DA SEMANA (Condições Especiais)` : '',
      notes ? `• *Observações:* ${notes}` : '',
      ``,
      `Gostaria de verificar a disponibilidade e confirmar os valores do camarote/mesa!`,
    ].filter(Boolean);

    const message = textLines.join('\n');
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${DOMVILLE_INFO.whatsappRawNumber}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800/80 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-neutral-950 shadow-md">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Reserva de Camarote & Mesas
              </h3>
              <p className="text-xs text-neutral-400">
                Atendimento rápido pelo WhatsApp oficial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendReservation} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Day selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Escolha o Dia do Evento
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Sexta-feira', 'Sábado', 'Domingo'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(d)}
                  className={`py-2 px-3 rounded-xl font-semibold text-xs border text-center transition-all ${
                    day === d
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Type of accommodation */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Tipo de Espaço Desejado
            </label>
            <div className="space-y-2">
              {[
                { title: 'Camarote VIP (Até 10 pessoas)', desc: 'Vista panorâmica do palco, sofá e garçom exclusivo' },
                { title: 'Mesa Pista Premium (4 pessoas)', desc: 'Próxima ao palco e à pista de dança' },
                { title: 'Mesa Bistrô Alta (2 a 4 pessoas)', desc: 'Agilidade próxima aos bares principais' },
                { title: 'Nome na Lista VIP / Portaria', desc: 'Desconto na entrada individual/dupla' },
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setType(item.title)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    type === item.title
                      ? 'bg-amber-500/10 border-amber-500/60 text-white shadow-sm'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{item.title}</span>
                    <input
                      type="radio"
                      checked={type === item.title}
                      onChange={() => setType(item.title)}
                      className="accent-amber-500"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* People Count Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Quantidade de Pessoas no Grupo
              </label>
              <span className="text-xs font-bold text-amber-400">
                {people} {people === 1 ? 'pessoa' : 'pessoas'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Name & details */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Nome do Responsável pela Reserva
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Carlos Silva"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60"
            />
          </div>

          {/* Birthday Perk Checkbox */}
          <div
            onClick={() => setIsBirthday(!isBirthday)}
            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-colors ${
              isBirthday
                ? 'bg-rose-950/40 border-rose-500/50 text-white'
                : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Cake className={`w-4 h-4 ${isBirthday ? 'text-rose-400' : 'text-neutral-500'}`} />
              <div>
                <p className="text-xs font-bold text-white">É Aniversário?</p>
                <p className="text-[11px] text-neutral-400">
                  Ganhe entrada free e brindes para seus convidados!
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isBirthday}
              onChange={(e) => setIsBirthday(e.target.checked)}
              className="accent-rose-500 w-4 h-4 rounded"
            />
          </div>

          {/* Special notes */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Observações adicionais (opcional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Chegaremos por volta das 21h, preferência perto do bar..."
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-amber-500/60"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.2]" />
              <span>Enviar Reserva no WhatsApp</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
            <p className="text-[11px] text-center text-neutral-500 mt-2">
              Atendimento oficial: (96) 99186-3662 • Resposta rápida
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
