import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Tag, Truck, ShoppingBag, CreditCard, ArrowRight, CheckCircle2, Copy, Check, FileText } from 'lucide-react';
import { CartItem, Product, Coupon, Order } from '../types';
import { SHIPPINGS_MOCK, COUPONS_MOCK } from '../productsData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNewOrder: (order: Order) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNewOrder
}: CartDrawerProps) {
  // Navigation steps inside drawer: 'cart' | 'checkout' | 'pix_payment' | 'success'
  const [step, setStep] = useState<'cart' | 'checkout' | 'pix_payment' | 'success'>('cart');
  
  // Shipping (CEP) Calculator States
  const [cep, setCep] = useState('');
  const [isCalculatingCep, setIsCalculatingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  const [selectedShipping, setSelectedShipping] = useState<typeof SHIPPINGS_MOCK[1] | null>(null);
  const [isCepValidated, setIsCepValidated] = useState(false);

  // Address Form States
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP');
  const [addressError, setAddressError] = useState('');

  // Coupon States
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CREDIT_CARD' | 'BOLETO'>('PIX');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // Success screen states
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.promoPrice * item.quantity, 0);
  const freeShippingThreshold = 150.0;
  const isFreeShippingEligible = subtotal >= freeShippingThreshold;

  // Free shipping progress bar calculation
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  // Get current active shipping price
  const shippingPrice = selectedShipping 
    ? (selectedShipping.id === 'normal' && isFreeShippingEligible ? 0 : selectedShipping.price)
    : 0;

  // Coupon Discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = subtotal * (appliedCoupon.value / 100);
    } else {
      couponDiscount = appliedCoupon.value;
    }
  }

  // Pix payment discount: extra 5% discount on the remaining total if PIX is selected
  const prePixTotal = Math.max(subtotal + shippingPrice - couponDiscount, 0);
  const pixDiscount = paymentMethod === 'PIX' ? prePixTotal * 0.05 : 0;
  const finalTotal = Math.max(prePixTotal - pixDiscount, 0);

  // Handlers
  const handleCepCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCepError('');
    setIsCepValidated(false);
    
    // Clean cep format
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length !== 8) {
      setCepError('Por favor, informe um CEP brasileiro válido com 8 dígitos (ex: 01001-000).');
      return;
    }

    setIsCalculatingCep(true);
    setTimeout(() => {
      setIsCalculatingCep(false);
      setIsCepValidated(true);
      // Simulate address filling
      setStreet('Alameda dos Animes, Neku Park');
      setCity('São Paulo');
      setState('SP');
      
      // Auto select shipping
      if (isFreeShippingEligible) {
        setSelectedShipping({
          id: 'normal',
          name: 'Normal Grátis (Promoção)',
          price: 0,
          time: '4 a 8 dias úteis',
          description: 'Disponível para compras acima de R$ 150!'
        });
      } else {
        setSelectedShipping(SHIPPINGS_MOCK[1]); // Default Normal PAC
      }
    }, 800);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError('Por favor, digite um código de cupom.');
      return;
    }

    const coupon = COUPONS_MOCK.find(c => c.code === code);
    if (!coupon) {
      setCouponError('Cupom inválido ou expirado! Tente HELLONEKU para 10% off.');
      return;
    }

    if (subtotal < coupon.minPurchase) {
      setCouponError(`Esse cupom exige uma compra mínima de R$ ${coupon.minPurchase.toFixed(2)}.`);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleGoToCheckout = () => {
    if (cartItems.length === 0) return;
    if (!isCepValidated || !selectedShipping) {
      setCepError('Calcule o frete antes de prosseguir para o pagamento!');
      return;
    }
    setStep('checkout');
  };

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError('');
    setPaymentError('');

    if (!street || !number || !city || !state) {
      setAddressError('Por favor, preencha todos os campos do endereço de entrega.');
      return;
    }

    if (paymentMethod === 'CREDIT_CARD') {
      const cleanCard = cardNumber.replace(/\D/g, '');
      if (cleanCard.length < 16) {
        setPaymentError('Por favor, preencha um número de cartão de crédito válido com 16 dígitos.');
        return;
      }
      if (!cardName) {
        setPaymentError('Por favor, insira o nome impresso no cartão.');
        return;
      }
      if (!cardExpiry || !cardCvv) {
        setPaymentError('Preencha a validade e o código de segurança (CVV).');
        return;
      }
    }

    const generatedOrderId = `NK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSimulatedOrder: Order = {
      id: generatedOrderId,
      items: [...cartItems],
      subtotal,
      shipping: shippingPrice,
      discount: couponDiscount + pixDiscount,
      total: finalTotal,
      paymentMethod,
      status: paymentMethod === 'PIX' ? 'PENDING_PAYMENT' : 'PROCESSING',
      date: new Date().toLocaleDateString('pt-BR'),
      address: {
        cep,
        street,
        city,
        state,
        number
      }
    };

    setLastOrder(newSimulatedOrder);

    if (paymentMethod === 'PIX') {
      setStep('pix_payment');
    } else {
      // Direct success for Cards or Boleto
      onNewOrder(newSimulatedOrder);
      onClearCart();
      setStep('success');
    }
  };

  const handleConfirmPixPayment = () => {
    if (!lastOrder) return;
    const finalPaidOrder: Order = {
      ...lastOrder,
      status: 'PROCESSING'
    };
    onNewOrder(finalPaidOrder);
    onClearCart();
    setStep('success');
  };

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0136nekura-pix-keys-73ec3074520400005303986540537.905802BR5913Nekura%20Studio6009Sao%20Paulo62070503NK8611352046467F');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleResetDrawer = () => {
    setStep('cart');
    setCep('');
    setIsCepValidated(false);
    setSelectedShipping(null);
    setAppliedCoupon(null);
    setLastOrder(null);
    onClose();
  };

  const formatPriceBRL = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-black/60 backdrop-blur-xs"
        />

        {/* Drawer panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-white border-l border-brand-pink/20 flex flex-col h-full shadow-2xl relative"
          >
            {/* Header */}
            <div className="p-5 border-b border-brand-pink/15 flex items-center justify-between bg-brand-cream/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-cherry" />
                <h2 className="text-base font-bold font-display text-brand-black uppercase tracking-tight">
                  {step === 'cart' && 'Meu Carrinho'}
                  {step === 'checkout' && 'Finalizar Pedido'}
                  {step === 'pix_payment' && 'Pagamento do Pix'}
                  {step === 'success' && 'Pedido Concluído! 🎉'}
                </h2>
                {step === 'cart' && cartItems.length > 0 && (
                  <span className="bg-brand-pink text-brand-black text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-brand-cherry p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: ACTIVE SHOPPING CART LIST */}
            {step === 'cart' && (
              <div className="flex-grow flex flex-col overflow-y-auto">
                {cartItems.length === 0 ? (
                  /* EMPTY STATE */
                  <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-20 h-20 bg-brand-soft-pink border border-brand-pink/30 rounded-full flex items-center justify-center text-brand-cherry mx-auto">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display font-bold text-base text-brand-black">Seu carrinho está vazio!</p>
                      <p className="text-xs text-gray-400 max-w-[240px]">Coloque alguns adesivos, photocards ou combos no carrinho para começar!</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white font-display font-bold text-xs py-2.5 px-6 rounded-xl transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      Voltar às Compras 🛍️
                    </button>
                  </div>
                ) : (
                  /* CART WITH ITEMS */
                  <div className="p-5 space-y-6 flex-grow">
                    {/* Free shipping progress bar */}
                    <div className="bg-brand-soft-pink/70 border border-brand-pink/30 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Truck className="w-4 h-4 text-brand-cherry flex-shrink-0" />
                        <span className="text-brand-wine font-medium">
                          {isFreeShippingEligible ? (
                            <span className="font-bold">Eba! Você ganhou FRETE GRÁTIS! 🎉</span>
                          ) : (
                            <span>Faltam apenas <span className="font-bold">{formatPriceBRL(amountToFreeShipping)}</span> para ganhar Frete Grátis!</span>
                          )}
                        </span>
                      </div>
                      <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-brand-pink/10">
                        <div
                          className="h-full bg-linear-to-r from-brand-pink to-brand-cherry transition-all duration-500 rounded-full"
                          style={{ width: `${freeShippingProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-3 bg-linear-to-b from-white to-brand-cream/5 p-3 rounded-xl border border-brand-pink/10 relative hover:border-brand-pink/30 transition-all"
                        >
                          {/* Remove item absolute button */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="absolute top-2 right-2 text-gray-300 hover:text-brand-cherry p-1 transition-colors cursor-pointer"
                            title="Remover item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Image */}
                          <div className="w-16 h-16 rounded-lg bg-brand-cream/30 flex-shrink-0 overflow-hidden border border-brand-pink/10 p-1 flex items-center justify-center">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-grow pr-6 space-y-1">
                            <h4 className="text-xs font-bold font-display text-brand-black line-clamp-1 pr-1">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-brand-cherry font-mono font-semibold">
                              {item.product.isCombo ? '🎁 Combo Promocional' : item.product.category}
                            </p>
                            <div className="flex items-baseline gap-1.5 pt-0.5">
                              <span className="text-xs font-extrabold font-mono text-brand-black">
                                {formatPriceBRL(item.product.promoPrice)}
                              </span>
                              {item.product.originalPrice > item.product.promoPrice && (
                                <span className="text-[9px] text-gray-400 line-through">
                                  {formatPriceBRL(item.product.originalPrice)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Editor */}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-gray-400">Qtd:</span>
                              <div className="flex items-center border border-brand-pink/20 rounded-md bg-white overflow-hidden h-6">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                  className="text-brand-black hover:bg-brand-cream font-bold text-xs w-5 h-full cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="font-mono text-[11px] font-bold text-brand-black w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                                  className="text-brand-black hover:bg-brand-cream font-bold text-xs w-5 h-full cursor-pointer"
                                  disabled={item.quantity >= item.product.stock}
                                >
                                  +
                                </button>
                              </div>
                              {item.quantity >= item.product.stock && (
                                <span className="text-[9px] text-amber-500 font-semibold font-mono">Limpando estoque</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CEP Shipping Calculator Form */}
                    <div className="bg-brand-cream/30 border border-brand-pink/15 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-display text-brand-black uppercase tracking-tight flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-brand-cherry" />
                          Calcular Frete
                        </span>
                        {isCepValidated && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm">
                            Calculado!
                          </span>
                        )}
                      </div>

                      <form onSubmit={handleCepCalculate} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="CEP (ex: 01001-000)"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          className="flex-grow border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-brand-pink focus:outline-hidden bg-white"
                        />
                        <button
                          type="submit"
                          disabled={isCalculatingCep}
                          className="bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white font-display font-bold text-xs px-4 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          {isCalculatingCep ? 'calculando...' : 'Ok'}
                        </button>
                      </form>

                      {/* CEP Errors */}
                      {cepError && (
                        <p className="text-[11px] text-brand-cherry bg-brand-soft-pink/50 p-2 rounded-lg border border-brand-pink/10 font-medium">
                          ❌ {cepError}
                        </p>
                      )}

                      {/* Shipping selection options if calculated */}
                      {isCepValidated && (
                        <div className="space-y-2 pt-1 border-t border-brand-pink/10">
                          {SHIPPINGS_MOCK.map((ship) => {
                            // If user is eligible for free shipping, show PACS rate as R$ 0,00 and name Normal Gratis
                            const isFree = ship.id === 'normal' && isFreeShippingEligible;
                            const currentPrice = isFree ? 0 : ship.price;
                            const isSelected = selectedShipping?.id === ship.id || (ship.id === 'gratis' && isFreeShippingEligible);

                            // Skip rendering mock placeholder gratis if not eligible to keep clean list
                            if (ship.id === 'gratis' && !isFreeShippingEligible) return null;
                            if (ship.id === 'normal' && isFreeShippingEligible) return null;

                            return (
                              <label
                                key={ship.id}
                                className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-brand-soft-pink border-brand-pink'
                                    : 'bg-white border-brand-pink/10 hover:border-brand-pink/20'
                                }`}
                                onClick={() => setSelectedShipping({ ...ship, price: currentPrice })}
                              >
                                <input
                                  type="radio"
                                  name="shipping_option"
                                  checked={isSelected}
                                  onChange={() => {}} // handled by onClick
                                  className="mt-0.5 accent-brand-cherry"
                                />
                                <div className="flex-grow">
                                  <div className="flex justify-between font-bold text-brand-black">
                                    <span>{isFree ? 'Normal Grátis 🎉' : ship.name}</span>
                                    <span className="font-mono text-brand-cherry">
                                      {currentPrice === 0 ? 'Grátis' : formatPriceBRL(currentPrice)}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-gray-400 mt-0.5 font-sans leading-tight">
                                    Prazo: {ship.time}. {ship.description}
                                  </p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: ADDRESS AND PAYMENT FORM */}
            {step === 'checkout' && (
              <form onSubmit={handleProcessCheckout} className="flex-grow flex flex-col overflow-y-auto p-5 space-y-5">
                {/* Simulated Delivery Address Box */}
                <div className="bg-brand-cream/30 border border-brand-pink/15 rounded-2xl p-4 space-y-3.5">
                  <h3 className="text-xs font-bold font-display text-brand-black uppercase tracking-tight flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-brand-cherry" />
                    Endereço de Entrega
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Rua/Logradouro</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs bg-white focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Número</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Cidade</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs bg-white focus:outline-hidden animate-pulse-once"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Estado</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value.toUpperCase())}
                        maxLength={2}
                        className="w-full border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs bg-white focus:outline-hidden text-center"
                      />
                    </div>
                  </div>

                  {addressError && (
                    <p className="text-[10px] text-brand-cherry font-medium">⚠️ {addressError}</p>
                  )}
                </div>

                {/* Payment Selection Box */}
                <div className="bg-white border border-brand-pink/15 rounded-2xl p-4 space-y-4">
                  <h3 className="text-xs font-bold font-display text-brand-black uppercase tracking-tight flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 text-brand-cherry" />
                    Forma de Pagamento
                  </h3>

                  {/* Payment Options Row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'PIX', label: 'PIX (-5%)', desc: 'Aprovação na hora' },
                      { id: 'CREDIT_CARD', label: 'Cartão', desc: 'Até 3x sem juros' },
                      { id: 'BOLETO', label: 'Boleto', desc: '1 a 2 dias úteis' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(method.id as any);
                          setPaymentError('');
                        }}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          paymentMethod === method.id
                            ? 'bg-brand-black text-brand-cream border-brand-black shadow-xs'
                            : 'bg-brand-cream/10 text-brand-black border-brand-pink/15 hover:border-brand-pink/30'
                        }`}
                      >
                        <span className="text-xs font-bold font-display">{method.label}</span>
                        <span className={`text-[9px] ${paymentMethod === method.id ? 'text-brand-pink' : 'text-gray-400'}`}>
                          {method.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Payment Details Form based on selection */}
                  {paymentMethod === 'PIX' && (
                    <div className="bg-brand-soft-pink/60 border border-brand-pink/20 rounded-xl p-3 text-xs text-brand-wine">
                      <p className="font-semibold mb-1">⚡ Ganhe mais 5% de desconto!</p>
                      <p className="text-[11px] leading-tight text-brand-black">
                        Ao escolher o Pix, geramos um QR Code dinâmico com vencimento em 15 minutos. Super rápido e seguro!
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'CREDIT_CARD' && (
                    <div className="space-y-3 pt-1 border-t border-brand-pink/10 animate-fade-in">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Nome no Cartão</label>
                        <input
                          type="text"
                          placeholder="ANA P NEKURA"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          className="w-full border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Número do Cartão</label>
                        <input
                          type="text"
                          placeholder="1234 5678 1234 5678"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            // simple formatting
                            const val = e.target.value.replace(/\D/g, '');
                            const matches = val.match(/\d{4,16}/g);
                            const match = (matches && matches[0]) || '';
                            const parts = [];
                            for (let i = 0, len = match.length; i < len; i += 4) {
                              parts.push(match.substring(i, i + 4));
                            }
                            if (parts.length > 0) {
                              setCardNumber(parts.join(' '));
                            } else {
                              setCardNumber(val);
                            }
                          }}
                          className="w-full border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-hidden"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Validade</label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs text-center font-mono focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            className="w-full border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs text-center font-mono focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'BOLETO' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600 space-y-1">
                      <p className="font-semibold text-gray-800">📄 Detalhes do Boleto</p>
                      <p className="text-[11px] leading-tight">
                        O boleto será emitido para pagamento à vista. A confirmação bancária costuma levar de 1 a 2 dias úteis. Enviamos o link do boleto em PDF para seu e-mail de cadastro.
                      </p>
                    </div>
                  )}

                  {paymentError && (
                    <p className="text-[10px] text-brand-cherry bg-brand-soft-pink/50 p-2 rounded-lg border border-brand-pink/10 font-semibold">
                      ⚠️ {paymentError}
                    </p>
                  )}
                </div>

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs text-brand-cherry hover:underline font-bold text-center py-1 cursor-pointer"
                >
                  ← Voltar para o carrinho
                </button>
              </form>
            )}

            {/* STEP 3: PIX PAYMENT SCREEN */}
            {step === 'pix_payment' && lastOrder && (
              <div className="flex-grow flex flex-col overflow-y-auto p-5 items-center justify-center text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-brand-soft-pink border border-brand-pink/30 rounded-full flex items-center justify-center text-brand-cherry">
                  <CreditCard className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-base text-brand-black">Quase lá! Escaneie o Pix</h3>
                  <p className="text-xs text-gray-400 max-w-[280px]">Utilize o app do seu banco para ler o QR Code abaixo ou copie a chave PIX copia-e-cola.</p>
                </div>

                {/* Simulated QR Code SVG block */}
                <div className="bg-white border border-brand-pink/20 p-4 rounded-2xl shadow-sm relative">
                  <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    {/* Fake stylized QR lines */}
                    <rect x="0" y="0" width="22" height="22" stroke="#000000" strokeWidth="4" fill="none" />
                    <rect x="6" y="6" width="10" height="10" fill="#C9112E" />
                    <rect x="78" y="0" width="22" height="22" stroke="#000000" strokeWidth="4" fill="none" />
                    <rect x="84" y="6" width="10" height="10" fill="#C9112E" />
                    <rect x="0" y="78" width="22" height="22" stroke="#000000" strokeWidth="4" fill="none" />
                    <rect x="6" y="84" width="10" height="10" fill="#C9112E" />
                    <rect x="40" y="40" width="20" height="20" fill="#000000" rx="4" />
                    <circle cx="50" cy="50" r="4" fill="#F9ABB9" />
                    <path d="M 28 5 L 45 5 L 45 28 L 28 28 Z" fill="#000000" opacity="0.15" />
                    <path d="M 5 30 L 15 30 L 15 45 L 30 45 L 30 60" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 70 30 L 85 30 L 85 55 L 70 55" stroke="#C9112E" strokeWidth="3" />
                    <path d="M 55 70 L 55 90 L 85 90" stroke="#000000" strokeWidth="4" />
                    <rect x="35" y="75" width="8" height="8" fill="#C9112E" />
                  </svg>
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-cherry text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Expira em 15m
                  </span>
                </div>

                {/* Amount to pay */}
                <div className="bg-brand-cream/40 border border-brand-pink/15 px-4 py-2.5 rounded-xl w-full">
                  <span className="text-[11px] text-gray-400 block">Total com 5% de Desconto Pix:</span>
                  <span className="font-mono text-xl font-extrabold text-brand-black">
                    {formatPriceBRL(finalTotal)}
                  </span>
                </div>

                {/* Copy paste button */}
                <div className="w-full space-y-2">
                  <button
                    type="button"
                    onClick={handleCopyPixKey}
                    className="w-full py-2.5 px-4 border border-brand-pink/30 hover:border-brand-cherry text-brand-black bg-white rounded-xl font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        Código Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar Código Pix Copia-e-Cola
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmPixPayment}
                    className="w-full py-3 px-4 bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white rounded-xl font-display font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    Confirmar Pagamento Simulado ✓
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER SUCCESS SCREEN */}
            {step === 'success' && lastOrder && (
              <div className="flex-grow flex flex-col overflow-y-auto p-5 items-center justify-center text-center space-y-6 animate-fade-in">
                <div className="relative">
                  <div className="w-24 h-24 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-lg text-brand-black">Pedido Realizado com Sucesso!</h3>
                  <p className="text-xs text-gray-400">Parabéns! Seu pagamento simulado foi confirmado e estamos preparando seu pacote no ateliê Nekura.</p>
                </div>

                {/* Order Summary Receipt */}
                <div className="bg-brand-cream/30 border border-brand-pink/15 rounded-2xl p-4 w-full text-left space-y-3 font-sans">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-brand-pink/10">
                    <span className="font-medium text-gray-500">Número do Pedido:</span>
                    <span className="font-mono font-bold text-brand-black">{lastOrder.id}</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {lastOrder.items.map(item => (
                      <div key={item.product.id} className="flex justify-between">
                        <span className="text-gray-600 truncate max-w-[200px]">{item.quantity}x {item.product.name}</span>
                        <span className="font-mono text-gray-500">{formatPriceBRL(item.product.promoPrice * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 text-xs pt-2 border-t border-brand-pink/10 font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="text-gray-600">{formatPriceBRL(lastOrder.subtotal)}</span>
                    </div>
                    {lastOrder.shipping > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Frete:</span>
                        <span className="text-gray-600">{formatPriceBRL(lastOrder.shipping)}</span>
                      </div>
                    )}
                    {lastOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Descontos:</span>
                        <span>-{formatPriceBRL(lastOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-brand-black font-extrabold text-sm pt-1">
                      <span>Total Pago:</span>
                      <span>{formatPriceBRL(lastOrder.total)}</span>
                    </div>
                  </div>

                  {/* Delivery address tracking */}
                  <div className="pt-2 border-t border-brand-pink/10 text-[10px] text-gray-400 leading-normal space-y-1">
                    <p className="font-bold text-gray-500 uppercase tracking-wider">Destinatário</p>
                    <p className="text-gray-700">{lastOrder.address.street}, {lastOrder.address.number}</p>
                    <p className="text-gray-600">{lastOrder.address.city} - {lastOrder.address.state} (CEP {lastOrder.address.cep})</p>
                    <p className="text-brand-cherry font-medium mt-1">🚚 Código de rastreamento simulado gerado: <span className="font-mono font-bold">NK{lastOrder.id.replace(/\D/g,'')}BR</span></p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetDrawer}
                  className="w-full py-3 px-4 bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white rounded-xl font-display font-bold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Continuar Explorando a Loja 🛍️
                </button>
              </div>
            )}

            {/* Total Footer pricing summary for STEP 1 and 2 only */}
            {(step === 'cart' || step === 'checkout') && cartItems.length > 0 && (
              <div className="p-5 border-t border-brand-pink/15 bg-brand-cream/10 space-y-4">
                {/* Coupon input form if in STEP 1 */}
                {step === 'cart' && (
                  <div className="space-y-2">
                    {appliedCoupon ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-800 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>
                            Cupom <span className="font-bold">{appliedCoupon.code}</span> ativo (-
                            {appliedCoupon.discountType === 'percentage'
                              ? `${appliedCoupon.value}%`
                              : formatPriceBRL(appliedCoupon.value)}
                            )
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-brand-cherry font-bold hover:underline cursor-pointer"
                        >
                          Remover
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Cupom de Desconto"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-grow border border-brand-pink/20 rounded-xl px-3 py-1.5 text-xs bg-white focus:outline-hidden uppercase"
                        />
                        <button
                          type="submit"
                          className="border border-brand-black text-brand-black hover:bg-brand-cream font-display font-bold text-xs px-4 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </form>
                    )}

                    {couponError && (
                      <p className="text-[10px] text-brand-cherry font-medium">⚠️ {couponError}</p>
                    )}
                  </div>
                )}

                {/* Price list breaks */}
                <div className="space-y-1.5 text-xs text-gray-500 font-medium font-sans">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-brand-black font-semibold">{formatPriceBRL(subtotal)}</span>
                  </div>

                  {isCepValidated && selectedShipping && (
                    <div className="flex justify-between">
                      <span>Frete ({selectedShipping.name}):</span>
                      <span className="font-mono text-brand-black font-semibold">
                        {shippingPrice === 0 ? 'Grátis' : formatPriceBRL(shippingPrice)}
                      </span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Cupom Desconto ({appliedCoupon.code}):</span>
                      <span className="font-mono">-{formatPriceBRL(couponDiscount)}</span>
                    </div>
                  )}

                  {paymentMethod === 'PIX' && step === 'checkout' && (
                    <div className="flex justify-between text-brand-cherry font-bold">
                      <span>Desconto Especial Pix (5%):</span>
                      <span className="font-mono">-{formatPriceBRL(pixDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-brand-black font-extrabold text-sm pt-2 border-t border-brand-pink/15">
                    <span className="font-display uppercase tracking-tight">Valor Total:</span>
                    <span className="font-mono text-lg tracking-tight">{formatPriceBRL(finalTotal)}</span>
                  </div>
                </div>

                {/* Principal Actions */}
                {step === 'cart' ? (
                  <button
                    onClick={handleGoToCheckout}
                    className="w-full h-12 bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-brand-cherry/10 cursor-pointer"
                  >
                    <span>Seguir para o Pagamento</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleProcessCheckout}
                    className="w-full h-12 bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-brand-cherry/10 cursor-pointer"
                  >
                    <span>
                      {paymentMethod === 'PIX' ? 'Gerar Código Pix' : `Finalizar Compra (${formatPriceBRL(finalTotal)})`}
                    </span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
