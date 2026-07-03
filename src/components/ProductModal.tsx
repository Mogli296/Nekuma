import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onInquire: (product: Product, quantity: number, method: 'whatsapp' | 'email') => void;
}

export default function ProductModal({ product, onClose, onInquire }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleInquire = (method: 'whatsapp' | 'email') => {
    onInquire(product, quantity, method);
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const hasDiscount = product.originalPrice > product.promoPrice;
  const installments = Math.ceil((product.promoPrice / 3) * 100) / 100;

  // Render dummy positive feedback reviews matching our cute alternative store!
  const reviews = [
    { name: "Mariana S.", rating: 5, date: "25/06/2026", text: "Estou apaixonada! O caderno é lindo demais e o papel pólen é super gostoso de escrever. Veio muito bem embalado!" },
    { name: "Thiago M.", rating: 5, date: "12/06/2026", text: "As asinhas de morcego do estojo são super firmes e o tecido é mega macio. Com certeza comprarei mais coisas." }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-black/65 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-brand-pink/30 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white p-2 rounded-full transition-colors z-20 cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left panel: Image stage */}
          <div className="md:w-1/2 bg-brand-cream/30 p-6 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-brand-pink/10 min-h-[300px] md:min-h-0">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full max-h-[320px] md:max-h-[480px] rounded-2xl"
              referrerPolicy="no-referrer"
            />
            
            {/* Visual indicators for combos or specials inside image stage */}
            {product.isCombo && (
              <div className="absolute bottom-6 left-6 bg-brand-black text-brand-cream border border-brand-pink/40 px-3 py-1.5 rounded-xl font-display font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
                Caixa Exclusiva Inclusa
              </div>
            )}
          </div>

          {/* Right panel: Information and controls */}
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-full">
            <div>
              {/* Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-brand-cherry">
                  {product.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                <span className="text-xs text-gray-400 font-medium">SKU: {product.id}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold font-display text-brand-black tracking-tight mb-3">
                {product.name}
              </h2>

              {/* Stars & Rating Summary */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 stroke-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-brand-black">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">({reviews.length} avaliações)</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                {product.description}
              </p>

              {/* Product Specifications / Bullet points */}
              {product.details && product.details.length > 0 && (
                <div className="bg-brand-cream/30 border border-brand-pink/15 rounded-2xl p-4 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black mb-2.5 font-display flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-brand-cherry rounded-xs" />
                    O que você vai receber:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1.5">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-brand-pink font-bold mt-0.5">✦</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stock Indicator alerts */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-500">Disponibilidade:</span>
                  <span className={`font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-brand-cherry'}`}>
                    {product.stock > 0 ? `${product.stock} unidades em estoque` : 'Produto esgotado'}
                  </span>
                </div>
                {product.stock > 0 && (
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        product.stock <= 5 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} 
                      style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                    />
                  </div>
                )}
                {product.stock <= 5 && product.stock > 0 && (
                  <p className="text-[11px] text-amber-600 font-medium">
                    ⚠️ Corra! Poucas unidades disponíveis em nosso ateliê!
                  </p>
                )}
              </div>
            </div>

            {/* Price Box and Cart Action Controls */}
            <div className="border-t border-brand-pink/15 pt-5 space-y-5">
              {/* Pricing breakdown */}
              <div className="flex flex-wrap items-baseline gap-3">
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-2xl font-extrabold font-mono text-brand-black tracking-tight">
                  {formatPrice(product.promoPrice)}
                </span>
                <span className="text-xs text-gray-500 font-sans">
                  ou 3x de <span className="font-semibold">{formatPrice(installments)}</span> sem juros
                </span>
              </div>

              {/* Pix breakdown and coupon compatibility details */}
              <div className="p-3 bg-brand-soft-pink border border-brand-pink/30 rounded-xl flex items-center justify-between">
                <div className="text-xs font-mono">
                  <p className="text-brand-wine font-bold">Ganhe 5% de desconto no Pix!</p>
                  <p className="text-brand-black font-semibold text-sm mt-0.5">
                    Apenas {formatPrice(product.pixPrice)}
                  </p>
                </div>
                <div className="bg-brand-cherry text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase font-display">
                  Pix ativo
                </div>
              </div>

              {/* Controls Grid */}
              <div className="flex flex-col sm:flex-row gap-3">
                {product.stock > 0 && (
                  <div className="flex items-center border border-brand-pink/30 rounded-xl bg-brand-cream/10 overflow-hidden h-12 justify-between w-full sm:w-32 px-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-brand-black hover:text-brand-cherry font-bold text-lg p-1 w-8 transition-colors cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-brand-black text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="text-brand-black hover:text-brand-cherry font-bold text-lg p-1 w-8 transition-colors cursor-pointer"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleInquire('whatsapp')}
                  disabled={product.stock === 0}
                  className={`flex-grow h-12 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    product.stock === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/15'
                  }`}
                >
                  <svg className="w-4 h-4 sm:w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.402.002 9.791-4.381 9.794-9.789.002-2.618-1.01-5.077-2.852-6.921C16.471 2.05 14.017 1.03 11.4 1.03 5.996 1.03 1.609 5.413 1.606 10.822c-.001 1.61.437 3.18 1.269 4.618l-.995 3.635 3.734-.979zm11.124-7.18c-.3-.15-1.77-.875-2.045-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.2-.6-1.95-1.025-2.725-2.35-.175-.3-.175-.5-.025-.65.125-.125.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.508-.675-.517-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.05-.275.975-1.05 3.1-1.05 3.175 0 .075.075.15.15.225.075.075 1.05 1.6 2.5 2.225.35.15.625.25.825.3.35.125.675.1 1.15.025.55-.075 1.77-.725 2.02-1.375.25-.65.25-1.2.175-1.325-.075-.125-.275-.2-.575-.35z"/>
                  </svg>
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => handleInquire('email')}
                  disabled={product.stock === 0}
                  className={`flex-grow h-12 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    product.stock === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : 'bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white hover:shadow-lg hover:shadow-brand-cherry/15'
                  }`}
                >
                  <span>Consultar por E-mail</span>
                </button>
              </div>

              {/* Guarantees section (Trust features inspired by Biboto Studio) */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 pt-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-cherry flex-shrink-0" />
                  <span>Compra 100% Segura</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-brand-cherry flex-shrink-0" />
                  <span>Brindes em toda compra</span>
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-brand-cherry flex-shrink-0" />
                  <span>Troca fácil em até 7d</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
