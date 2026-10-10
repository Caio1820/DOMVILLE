import React, { useState } from 'react';
import { DOMVILLE_INFO, GUEST_LIST_BENEFITS } from '../data/domvilleData';
import {
  Users,
  Plus,
  Trash2,
  Check,
  X,
  MessageCircle,
  Copy,
  Sparkles,
  Ticket,
  ShieldCheck,
  Calendar,
  Cake,
} from 'lucide-react';

interface GuestListModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDay?: string;
}

export const GuestListModal: React.FC<GuestListModalProps> = ({
  isOpen,
  onClose,
  preselectedDay,
}) => {
  const [day, setDay] = useState<string>(preselectedDay || 'Sábado');
  const [listType, setListType] = useState<'vip' | 'aniversario'>('vip');
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [guests, setGuests] = useState<string[]>(['']);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAddGuest = () => {
    if (guests.length < 25) {
      setGuests([...guests, '']);
    }
  };

  const handleUpdateGuest = (index: number, val: string) => {
    const updated = [...guests];
    updated[index] = val;
    setGuests(updated);
  };

  const handleRemoveGuest = (index: number) => {
    if (guests.length > 1) {
      setGuests(guests.filter((_, i) => i !== index));
    } else {
      setGuests(['']);
    }
  };

  // Valid guests list
  const validGuests = guests.map((g) => g.trim()).filter(Boolean);
  const totalCount = 1 + validGuests.length; // lead + guests

  const generateMessage = () => {
    const lines = [
      `🥁 *LISTA DE CONVIDADOS / VIP — DOMVILLE* 🥁`,
      ``,
      `• *Dia do Evento:* ${day}`,
      `• *Tipo de Lista:* ${listType === 'aniversario' ? '🎂 Aniversariante + Amigos' : '🎟️ Lista VIP Amiga'}`,
      `• *Titular / Responsável:* ${leadName || 'Não informado'}`,
      leadPhone ? `• *Telefone:* ${leadPhone}` : '',
      `• *Total de Nomes:* ${totalCount} pessoas`,
      ``,
      `📋 *NOMES CONFIRMADOS PARA A PORTARIA:*`,
      `1. ${leadName || 'Titular'} (Responsável)`,
      ...validGuests.map((g, idx) => `${idx + 2}. ${g}`),
      ``,
      `_Favor validar os nomes para o desconto de portaria até 22h30. Obrigado!_`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) return;

    const message = generateMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${DOMVILLE_INFO.whatsappRawNumber}?text=${encoded}`, '_blank');
    setIsSubmitted(true);
  };

  const handleCopyList = () => {
    const message = generateMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-neutral-950 shadow-md">
              <Users className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Lista de Convidados / VIP
              </h3>
              <p className="text-xs text-neutral-400">
                Garanta desconto na portaria até 22h30
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
        <form onSubmit={handleSendToWhatsApp} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Day selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              1. Selecione o Dia do Pagode
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

          {/* List Type toggle */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              2. Modalidade da Lista
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setListType('vip')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  listType === 'vip'
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-sm'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                  <Ticket className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lista Amiga VIP</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Desconto p/ você e amigos
                </p>
              </button>

              <button
                type="button"
                onClick={() => setListType('aniversario')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  listType === 'aniversario'
                    ? 'bg-rose-500/10 border-rose-500 text-white shadow-sm'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                  <Cake className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lista Aniversariante</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Entrada free + vantagens
                </p>
              </button>
            </div>
          </div>

          {/* Titular info */}
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                3. Seu Nome Completo (Titular da Lista) *
              </label>
              <input
                type="text"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Ex: Amanda Silva"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                WhatsApp de Contato
              </label>
              <input
                type="tel"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="(96) 99999-9999"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          {/* Guest Names Inputs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <span>4. Nomes dos Amigos & Convidados</span>
                <span className="text-amber-400 font-bold">
                  ({validGuests.length} adicionados)
                </span>
              </label>

              <button
                type="button"
                onClick={handleAddGuest}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-[11px] font-bold transition"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
                <span>Adicionar Mais</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {guests.map((guest, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-neutral-500 w-5 text-right shrink-0">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={guest}
                    onChange={(e) => handleUpdateGuest(idx, e.target.value)}
                    placeholder={`Nome completo do convidado ${idx + 1}`}
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-amber-500/60"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGuest(idx)}
                    className="p-2 rounded-xl text-neutral-500 hover:text-rose-400 hover:bg-neutral-900 transition"
                    title="Remover nome"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits summary list */}
          <div className="p-3 rounded-2xl bg-neutral-900/60 border border-amber-500/20 space-y-1.5">
            <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Regras e Benefícios da Lista
            </p>
            {GUEST_LIST_BENEFITS.slice(0, 3).map((b, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={!leadName.trim()}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.2]" />
              <span>Enviar Lista para a Portaria (WhatsApp)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyList}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Lista copiada com sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Lista para mandar no grupo dos amigos</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
