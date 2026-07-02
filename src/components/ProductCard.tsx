import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onInquire: (product: Product) => void;
}

export default function ProductCard({ product, onInquire }: ProductCardProps) {
  // Format currency helpers
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const hasDiscount = product.originalPrice > product.promoPrice;
  const installments = Math.ceil((product.promoPrice / 3) * 100) / 100;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-brand-pink/20 hover:border-brand-cherry/40 transition-all duration-300 flex flex-col h-full bg-linear-to-b from-white to-brand-cream/10 hover:shadow-lg hover:shadow-brand-pink/5 cursor-pointer"
      onClick={() => onInquire(product)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      {/* Decorative Brand Accent (Top border highlight) */}
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-brand-pink via-brand-cherry to-brand-wine opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badges container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isNew && (
          <span className="bg-brand-pink text-brand-black text-[11px] font-bold font-display px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-white/30">
            Novidade ✨
          </span>
        )}
        {product.isCombo && (
          <span className="bg-brand-black text-brand-cream text-[11px] font-bold font-display px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-brand-pink/30">
            Combo Kit 🎁
          </span>
        )}
        {product.isPromo && hasDiscount && (
          <span className="bg-brand-cherry text-white text-[11px] font-bold font-display px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-brand-wine/10">
            Promo ⚡
          </span>
        )}
        {product.stock === 0 && (
          <span className="bg-gray-400 text-white text-[11px] font-bold font-display px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Esgotado 💤
          </span>
        )}
      </div>

      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-brand-cream/30 overflow-hidden flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
          id={`product-img-${product.id}`}
        />
        
        {/* Rating star badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1 border border-brand-pink/20 shadow-xs">
          <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
          <span className="text-[11px] font-bold font-mono text-brand-black">{product.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Category */}
        <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-brand-cherry/80 mb-1">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-sm font-semibold font-display text-brand-black line-clamp-2 mb-2 group-hover:text-brand-cherry transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        {/* Price Tag Box */}
        <div className="mt-auto space-y-1.5 pt-3 border-t border-brand-cream">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-[11px] font-bold font-mono bg-brand-soft-pink text-brand-cherry px-1.5 py-0.5 rounded-sm">
                -{Math.round(((product.originalPrice - product.promoPrice) / product.originalPrice) * 100)}%
              </span>
            </div>
          ) : (
            <div className="h-4" /> /* spacer */
          )}

          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold font-mono text-brand-black tracking-tight">
              {formatPrice(product.promoPrice)}
            </span>
          </div>

          {/* Parcel info */}
          <div className="text-[11px] text-gray-500 font-sans">
            ou 3x de <span className="font-semibold">{formatPrice(installments)}</span> sem juros
          </div>

          {/* Pix highlight */}
          <div className="inline-flex items-center gap-1.5 bg-brand-soft-pink/60 border border-brand-pink/30 px-2 py-1 rounded-lg w-full text-[11px] font-mono text-brand-wine">
            <span className="font-bold text-brand-cherry">PIX:</span>
            <span className="font-semibold text-brand-black">{formatPrice(product.pixPrice)}</span>
            <span className="text-[10px] text-brand-cherry font-bold">(-5%)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
