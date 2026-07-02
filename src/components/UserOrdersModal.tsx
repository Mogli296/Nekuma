import { motion, AnimatePresence } from 'motion/react';
import { X, Award, ShoppingBag, Tag, Sparkles, User, Gift } from 'lucide-react';
import { Order } from '../types';

interface UserOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export default function UserOrdersModal({ isOpen, onClose, orders }: UserOrdersModalProps) {
  if (!isOpen) return null;

  const formatPriceBRL = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Mock list of user achievement badges to give that gamified "Biboto Studio" customer feel!
  const achievements = [
    { title: "Nekura Rookie", desc: "Criou sua conta na loja Nekura", icon: "🌱", unlocked: true },
    { title: "Gótica Alternativa", desc: "Comprou 1 item gótico-fofo", icon: "🦇", unlocked: orders.length > 0 },
    { title: "Photocard Hunter", desc: "Adquiriu organizador de cards", icon: "✨", unlocked: orders.some(o => o.items.some(i => i.product.category === 'Photocards')) },
    { title: "Super Combo VIP", desc: "Comprou uma Super Box em promoção", icon: "🎁", unlocked: orders.some(o => o.items.some(i => i.product.isCombo)) }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-black/60 backdrop-blur-xs"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-brand-pink/30 flex flex-col max-h-[85vh] z-10 p-6 md:p-8 space-y-6"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pb-5 border-b border-brand-pink/15">
            <div className="w-16 h-16 bg-brand-soft-pink border border-brand-pink/30 rounded-full flex items-center justify-center relative overflow-hidden">
              <User className="w-8 h-8 text-brand-cherry" />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-lg font-bold font-display text-brand-black">Ana P. Nekura</h2>
                <span className="bg-brand-black text-brand-pink text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-brand-pink/30">
                  Membro VIP 💎
                </span>
              </div>
              <p className="text-xs text-gray-400">speakai.agency@gmail.com • Cliente desde Junho 2026</p>
            </div>
          </div>

          {/* Content Scroll Grid */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-1">
            {/* Achievements/Gamified Badges Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-display uppercase tracking-widest text-brand-cherry flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Minhas Conquistas Nekura
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {achievements.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 relative transition-all ${
                      badge.unlocked
                        ? 'bg-brand-soft-pink/50 border-brand-pink/40'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-bold font-display text-brand-black leading-tight">
                        {badge.title}
                      </p>
                      <p className="text-[9px] text-gray-400 leading-tight">
                        {badge.desc}
                      </p>
                    </div>
                    {badge.unlocked && (
                      <span className="absolute top-1.5 right-1.5 text-[9px] animate-pulse">✨</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Coupons Locker */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-display uppercase tracking-widest text-brand-cherry flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                Meus Cupons Disponíveis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-dashed border-brand-pink bg-brand-soft-pink/20 rounded-xl p-3 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="bg-brand-black text-brand-cream text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm">
                      HELLONEKU
                    </span>
                    <p className="text-xs font-semibold text-brand-black">10% OFF em qualquer compra</p>
                    <p className="text-[9px] text-gray-400">Sem valor mínimo exigido</p>
                  </div>
                  <Gift className="w-6 h-6 text-brand-pink" />
                </div>

                <div className="border border-dashed border-brand-pink bg-brand-soft-pink/20 rounded-xl p-3 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="bg-brand-black text-brand-cream text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm">
                      BIBOTOLOVE
                    </span>
                    <p className="text-xs font-semibold text-brand-black">R$ 15,00 OFF Especial</p>
                    <p className="text-[9px] text-gray-400">Para compras acima de R$ 80,00</p>
                  </div>
                  <Gift className="w-6 h-6 text-brand-pink" />
                </div>
              </div>
            </div>

            {/* Simulated Orders List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-display uppercase tracking-widest text-brand-cherry flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                Histórico de Pedidos ({orders.length})
              </h3>

              {orders.length === 0 ? (
                <div className="bg-brand-cream/20 border border-brand-pink/15 rounded-2xl p-6 text-center space-y-3">
                  <p className="text-xs text-gray-500">Você ainda não tem pedidos simulados realizados.</p>
                  <p className="text-[11px] text-gray-400">Crie seu carrinho, preencha o CEP e faça seu primeiro teste de pagamento na hora!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-brand-pink/10 rounded-2xl bg-white p-4 hover:border-brand-pink/35 transition-all space-y-3"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold text-brand-black">Pedido {order.id}</span>
                          <span className="text-gray-400 font-medium ml-2">{order.date}</span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase font-display ${
                            order.status === 'PENDING_PAYMENT'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {order.status === 'PENDING_PAYMENT' ? 'Aguardando Pix ⏳' : 'Pago • Em Preparação 📦'}
                        </span>
                      </div>

                      <div className="space-y-1 pt-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span className="text-gray-500 max-w-[280px] truncate">
                              {item.quantity}x {item.product.name}
                            </span>
                            <span className="font-mono text-gray-500">
                              {formatPriceBRL(item.product.promoPrice * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-xs pt-2.5 border-t border-brand-pink/10 font-mono">
                        <span className="text-gray-400 font-sans">Método: {order.paymentMethod}</span>
                        <div className="space-x-1">
                          <span className="text-gray-400 font-sans text-[11px]">Total:</span>
                          <span className="font-extrabold text-brand-black text-sm">
                            {formatPriceBRL(order.total)}
                          </span>
                        </div>
                      </div>

                      {/* Package shipment tracking indicator */}
                      <div className="bg-brand-soft-pink/50 rounded-xl p-2.5 text-[10px] text-brand-wine flex items-center justify-between">
                        <span>🚀 Código de rastreio: <span className="font-mono font-bold">NK{order.id.replace(/\D/g,'')}BR</span></span>
                        <span className="font-bold uppercase tracking-wide">Copiar Rastreio</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer lock */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white font-display font-bold text-xs py-2 px-5 rounded-xl transition-all cursor-pointer"
            >
              Fechar Painel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
