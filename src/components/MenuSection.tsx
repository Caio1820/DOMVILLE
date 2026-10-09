import React, { useState, useMemo } from 'react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuItem,
  DOMVILLE_INFO,
} from '../data/domvilleData';
import {
  Search,
  Sparkles,
  Flame,
  Plus,
  Minus,
  ShoppingCart,
  X,
  ExternalLink,
  Users,
  Check,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [isComandaOpen, setIsComandaOpen] = useState<boolean>(false);
  const [splitPeople, setSplitPeople] = useState<number>(4);
  const [copiedOrder, setCopiedOrder] = useState<boolean>(false);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // House favorites / Bestsellers
  const houseFavorites = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.isHouseFavorite);
  }, []);

  // Cart calculations
  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, ci) => sum + ci.quantity, 0);
  }, [cart]);

  const totalCartPrice = useMemo(() => {
    return Object.values(cart).reduce(
      (sum, ci) => sum + ci.item.price * ci.quantity,
      0
    );
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const current = prev[item.id];
      if (current) {
        return {
          ...prev,
          [item.id]: { item, quantity: current.quantity + 1 },
        };
      }
      return {
        ...prev,
        [item.id]: { item, quantity: 1 },
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const current = prev[itemId];
      if (!current) return prev;
      if (current.quantity <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return {
        ...prev,
        [itemId]: { ...current, quantity: current.quantity - 1 },
      };
    });
  };

  const clearCart = () => setCart({});

  // WhatsApp checkout message generator
  const sendComandaToWhatsApp = () => {
    if (totalCartCount === 0) return;
    const itemsList = Object.values(cart)
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} - R$ ${(ci.item.price * ci.quantity).toFixed(2).replace('.', ',')}`
      )
      .join('\n');

    const message = `🥁 *Olá, Domville! Gostaria de consultar / adiantar meu pedido:*\n\n${itemsList}\n\n💰 *Total Estimado:* R$ ${totalCartPrice
      .toFixed(2)
      .replace('.', ',')}\n👥 *Divisão (${splitPeople} pessoas):* R$ ${(
      totalCartPrice / Math.max(1, splitPeople)
    )
      .toFixed(2)
      .replace('.', ',')}/pessoa\n\n_Poderiam me confirmar a disponibilidade na mesa/camarote?_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${DOMVILLE_INFO.whatsappRawNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="cardapio" className="w-full px-4 py-6 max-w-lg mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Experiência Gastronômica & Bar
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1 font-display">
            Cardápio Digital Domville
          </h2>
          <p className="text-xs text-neutral-400">
            Imagens reais, preços transparentes e pedidos rápidos.
          </p>
        </div>

        {/* Floating / Sticky Comanda Trigger */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsComandaOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Comanda: R$ {totalCartPrice.toFixed(2).replace('.', ',')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-neutral-950 text-amber-300 text-[10px]">
              {totalCartCount}
            </span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar cerveja, combo, drink ou petisco..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-200 placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Tabs (Horizontal Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar mb-5 -mx-1 px-1">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Bestsellers highlight strip (shown when viewing all categories or no search) */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Mais Pedidos da Casa</span>
            </div>
            <span className="text-[11px] text-neutral-500">
              Favoritos do público
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1">
            {houseFavorites.slice(0, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItemModal(item)}
                className="shrink-0 w-52 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-amber-500/30 p-2.5 flex flex-col justify-between group cursor-pointer hover:border-amber-400 transition-all shadow-lg"
              >
                <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-neutral-950 shadow">
                    ⭐ TOP DA CASA
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                    {item.serves || item.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-amber-400">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="p-1.5 rounded-lg bg-amber-500 text-neutral-950 hover:brightness-110 active:scale-95 transition-all shadow"
                    title="Adicionar à comanda"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid of Menu Items */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 bg-neutral-900/50 rounded-2xl border border-neutral-800 p-6">
            <p className="text-sm text-neutral-400">
              Nenhum item encontrado para "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-neutral-800 text-amber-300 text-xs font-semibold hover:bg-neutral-700 transition"
            >
              Ver todos os itens
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const inCart = cart[item.id]?.quantity || 0;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItemModal(item)}
                className="group cursor-pointer rounded-2xl bg-neutral-900/70 border border-neutral-800/90 hover:border-amber-500/40 p-3 flex gap-3 items-center justify-between transition-all duration-200 hover:bg-neutral-900 shadow-md"
              >
                {/* Thumbnail image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-neutral-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {item.isPopular && (
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-neutral-950/90 text-amber-400 border border-amber-500/40 backdrop-blur-sm">
                      Destaque
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors truncate">
                      {item.name}
                    </h4>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-extrabold text-amber-400">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                    {item.serves && (
                      <span className="text-[11px] text-neutral-500 hidden sm:inline">
                        · {item.serves}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Add / Quantity controls */}
                <div
                  className="flex flex-col items-end gap-1.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {inCart > 0 ? (
                    <div className="flex items-center gap-1.5 bg-neutral-950 border border-amber-500/40 rounded-xl p-1">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition"
                        title="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-amber-300 px-1">
                        {inCart}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 rounded-lg bg-amber-500 text-neutral-950 hover:brightness-110 transition"
                        title="Aumentar"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-2.5 py-1.5 rounded-xl bg-neutral-800 text-amber-300 hover:bg-amber-500 hover:text-neutral-950 font-bold text-xs border border-neutral-700/80 transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                      <span>Adicionar</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Alternative Cardápio Link / Smartpos fallback */}
      <div className="mt-6 pt-4 border-t border-neutral-800/80 text-center">
        <a
          href={DOMVILLE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 transition-colors"
        >
          <span>Dúvidas sobre carta de vinhos, marcas ou cardápio completo? Fale no WhatsApp</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* ITEM DETAIL MODAL */}
      {activeItemModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setActiveItemModal(null)}
        >
          <div
            className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-60 w-full bg-neutral-900">
              <img
                src={activeItemModal.image}
                alt={activeItemModal.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveItemModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/80 text-neutral-300 hover:text-white border border-neutral-700 backdrop-blur-md"
              >
                <X className="w-4 h-4" />
              </button>

              {activeItemModal.isHouseFavorite && (
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-neutral-950 shadow-md">
                  ⭐ Mais Pedido da Domville
                </span>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {activeItemModal.name}
                </h3>
                <p className="text-lg font-extrabold text-amber-400 mt-1">
                  R$ {activeItemModal.price.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Descrição & Detalhes
                </h5>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activeItemModal.description}
                </p>
              </div>

              {activeItemModal.serves && (
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span><strong>Rendimento:</strong> {activeItemModal.serves}</span>
                </div>
              )}

              {activeItemModal.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeItemModal.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 border-t border-neutral-900 bg-neutral-950 flex gap-2">
              <button
                onClick={() => {
                  addToCart(activeItemModal);
                  setActiveItemModal(null);
                  setIsComandaOpen(true);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 text-neutral-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Adicionar à Comanda</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMANDA / BILL SIMULATOR DRAWER */}
      {isComandaOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsComandaOpen(false)}
        >
          <div
            className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-display">
                  Minha Comanda & Divisão de Conta
                </h3>
              </div>
              <button
                onClick={() => setIsComandaOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {totalCartCount === 0 ? (
                <div className="text-center py-8 text-neutral-400 text-sm">
                  Sua comanda está vazia. Adicione itens do cardápio acima!
                </div>
              ) : (
                <>
                  <div className="space-y-2.5">
                    {Object.values(cart).map(({ item, quantity }) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-amber-400 font-semibold mt-0.5">
                            R$ {(item.price * quantity).toFixed(2).replace('.', ',')}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1">
                            {quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-1 rounded bg-amber-500 text-neutral-950 font-bold"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bill Splitter Calculator */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-neutral-900/90 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        Dividir conta entre amigos
                      </span>
                      <span className="text-xs font-extrabold text-amber-300">
                        {splitPeople} {splitPeople === 1 ? 'pessoa' : 'pessoas'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={splitPeople}
                      onChange={(e) => setSplitPeople(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />

                    <div className="flex justify-between items-center pt-1 border-t border-neutral-800 text-xs">
                      <span className="text-neutral-400">Valor individual:</span>
                      <span className="text-sm font-extrabold text-amber-400">
                        R${' '}
                        {(totalCartPrice / Math.max(1, splitPeople))
                          .toFixed(2)
                          .replace('.', ',')}{' '}
                        / pessoa
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Total and Actions */}
            {totalCartCount > 0 && (
              <div className="p-4 border-t border-neutral-800 bg-neutral-950 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">
                    Total do Pedido ({totalCartCount} itens)
                  </span>
                  <span className="text-xl font-extrabold text-white">
                    R$ {totalCartPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={clearCart}
                    className="px-3 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold"
                  >
                    Limpar
                  </button>

                  <button
                    onClick={sendComandaToWhatsApp}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <span>Enviar Pedido no WhatsApp</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
