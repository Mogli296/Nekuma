import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Instagram, 
  Heart,
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Info,
  Gift,
  Smile,
  MessageCircle
} from 'lucide-react';

import { Product } from './types';
import { PRODUCTS_DATA } from './productsData';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import NekuSvg from './components/NekuSvg';
import IntroScreen from './components/IntroScreen';
import MascotNeku from './components/MascotNeku';

export default function App() {
  // --- STATE SYSTEM ---
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  
  // Modals & Drawers States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Hero Banner Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- CAROUSEL AUTO-ROTATE ---
  const slides = [
    {
      title: "Volta às Aulas Gótico Fofo! 🎒✨",
      subtitle: "Coleção Neku & Amigos",
      desc: "Planners semanais de toque aveludado, chaveiros de miçangas candy colors, adesivos holográficos e mimos inclusos em todo pacote.",
      badge: "Lançamento Exclusivo",
      coupon: "HELLONEKU",
      image: "https://i.pinimg.com/736x/bc/87/02/bc8702c9ddf385075f324271fad05a11.jpg",
      color: "bg-linear-to-r from-brand-soft-pink via-brand-cream/30 to-white",
      buttonText: "Ver Papelaria"
    },
    {
      title: "Glitter Binders & Sleeves Holográficos ✨",
      subtitle: "Coleção Nekura Vault 🖤",
      desc: "Proteja seus Photocards mais raros de K-Pop com sleeves acid-free livres de danos e pastas holográficas.",
      badge: "K-Pop Essential",
      coupon: "NEKURALOVE",
      image: "https://i.pinimg.com/736x/5e/3d/ad/5e3dad403ba0f89c1af932a602384112.jpg",
      color: "bg-linear-to-r from-white via-brand-cream/45 to-brand-soft-pink/60",
      buttonText: "Garantir Organizador"
    },
    {
      title: "Super Boxes Temáticas com Desconto! 🎁🖤",
      subtitle: "Combos Promocionais",
      desc: "Mais de R$ 34,00 de economia nos kits completos prontos para presentear quem você ama.",
      badge: "Melhor Custo-Benefício",
      coupon: "PIXLOVE",
      image: "https://i.pinimg.com/736x/b8/0b/2d/b80b2d72daa72a23ab6b5193ff3ee008.jpg",
      color: "bg-linear-to-r from-brand-soft-pink via-white to-brand-cream/40",
      buttonText: "Explorar Combos"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // --- CONTACT / INQUIRY FUNCTION ---
  const handleInquireProduct = (product: Product, quantity: number = 1) => {
    const text = `Olá! Vi o produto "${product.name}" (${quantity}x) no site da Nekura Shop e gostaria de mais informações!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=5511987654321&text=${encodedText}`, '_blank');
  };

  // Format currency helper
  const formatPriceBRL = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <IntroScreen key="intro" onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {hasEntered && (
        <div className="min-h-screen bg-white text-brand-black font-sans relative animate-fade-in">
      {/* BACKGROUND GRAPHIC ACCENTS (Retro Star Elements inspired by Biboto Studio) */}
      <div className="absolute top-[600px] left-5 w-24 h-24 bg-brand-soft-pink rounded-full blur-3xl opacity-35 pointer-events-none" />
      <div className="absolute top-[1200px] right-5 w-32 h-32 bg-brand-cream rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-[400px] left-10 w-40 h-40 bg-brand-soft-pink rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* --- FIXED HEADER (Cabeçalho Fixo) --- */}
      <header id="main-header" className="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-brand-pink/15 transition-all duration-300">
        {/* VIP Alert Ribbon */}
        <div className="bg-brand-black text-brand-cream text-[11px] py-1 text-center font-display font-medium border-b border-brand-pink/20 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
          <span className="animate-pulse text-brand-pink">✨</span>
          <span>FRETE GRÁTIS nas compras acima de R$ 150! Use o cupom <span className="font-mono font-bold text-brand-pink underline">HELLONEKU</span> e ganhe 10% OFF</span>
          <span className="hidden sm:inline bg-brand-cherry text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase ml-2 tracking-wider">PIX ativo (-5%)</span>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-24 sm:h-28 flex items-center justify-between">
          {/* Logo (Left side) */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group select-none"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {/* Logo Mascot representation */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-all -my-4 sm:-my-6 select-none pointer-events-none">
              <NekuSvg 
                size={110} 
                className="group-hover:scale-110 transition-transform duration-250 ease-out filter drop-shadow-[0_6px_12px_rgba(241,115,142,0.25)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-wider text-brand-black leading-none uppercase">
                NEKURA <span className="text-brand-cherry">SHOP</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-0.5">Cute & Dark Crafts</span>
            </div>
          </div>

          {/* Menu / Categories (Center) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-brand-black hover:text-brand-cherry transition-colors cursor-pointer"
            >
              Início
            </button>
            <button
              onClick={() => {
                const catSection = document.getElementById('products-section');
                if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-brand-black hover:text-brand-cherry transition-colors cursor-pointer"
            >
              Nossos Produtos
            </button>
          </nav>

          {/* Actions & Utilities (Right side) */}
          <div className="flex items-center gap-3 sm:gap-4.5">
            {/* Direct WhatsApp Contact CTA */}
            <a
              href="https://api.whatsapp.com/send?phone=5511987654321&text=Ol%C3%A1!%20Visitei%20o%20site%20da%20Nekura%20Shop%20e%20gostaria%20de%20conversar%20sobre%20os%20produtos."
              target="_blank"
              rel="noreferrer"
              className="text-white bg-emerald-500 hover:bg-emerald-600 py-2 px-3.5 sm:px-4 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:shadow-emerald-500/10"
              title="Chamar no WhatsApp"
            >
              <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="hidden sm:inline text-[11px] sm:text-xs font-bold uppercase tracking-wider font-sans">
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* --- HERO BANNER (Banner Inicial) --- */}
      <section className="relative overflow-hidden bg-white py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden shadow-sm border border-brand-pink/20 h-[380px] sm:h-[420px] md:h-[460px]">
            
            {/* Slides display */}
            <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`min-w-full h-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 md:p-16 ${slide.color} relative overflow-hidden`}
                >
                  {/* Decorative faint stars pattern */}
                  <div className="absolute -right-12 -top-12 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Text content left */}
                  <div className="w-full md:w-1/2 space-y-3.5 sm:space-y-4 text-left z-10">
                    <span className="inline-block bg-brand-cherry text-white text-[10px] sm:text-[11px] font-bold font-display uppercase px-3 py-1 rounded-full tracking-wider">
                      {slide.badge}
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-brand-black leading-tight tracking-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-md font-sans leading-relaxed">
                      {slide.desc}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={() => {
                          const catSection = document.getElementById('products-section');
                          if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white font-display font-bold text-xs py-2.5 sm:py-3 px-6 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-md"
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <div className="bg-white/80 border border-brand-pink/20 px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono">
                        Cupom: <span className="font-bold text-brand-cherry">{slide.coupon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Image content right */}
                  <div className="w-full md:w-5/12 relative flex items-center justify-center mt-4 md:mt-0 z-10">
                    <div className="absolute inset-0 bg-brand-soft-pink/50 rounded-2xl md:rounded-3xl blur-xl rotate-6 transform scale-95" />
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover aspect-square h-[190px] sm:h-[230px] md:h-[340px] rounded-2xl md:rounded-3xl border border-brand-pink/15 shadow-xl transform rotate-[-2.5deg] hover:rotate-0 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Slider navigation dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-20 bg-white/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-brand-pink/15">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'bg-brand-cherry px-2.5' : 'bg-brand-pink/60 hover:bg-brand-pink'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="products-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section title */}
          <div className="pb-6 border-b border-brand-pink/15 mb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-brand-cherry">
                Catálogo de Miminhos
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-black tracking-tight flex items-center gap-2">
                Conheça Nossos Produtos 🛍️
              </h2>
            </div>
          </div>

          {/* GRID OF PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PRODUCTS_DATA.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onInquire={handleInquireProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* --- WHY CHOOSE US BRAND SECTION (Diferenciais da Marca) --- */}
      <section className="py-16 border-t border-brand-pink/15 bg-brand-cream/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto space-y-1 mb-12">
            <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-brand-cherry">
              Nossa Essência
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-black tracking-tight">
              O Toque Especial do Nosso Ateliê ✨
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Inspirado no carinho de papelarias criativas artesanais, cada envio da Nekura Shop é um verdadeiro unboxing de sentimentos!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-brand-pink/15 rounded-2xl p-6 text-center space-y-3.5 relative hover:border-brand-pink/35 transition-all">
              <div className="w-12 h-12 bg-brand-soft-pink border border-brand-pink/30 rounded-full flex items-center justify-center text-brand-cherry mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm text-brand-black">Unboxing com Brindes! 🎁</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Toda e qualquer compra em nosso site acompanha mimos especiais colecionáveis de brinde: cartões postais, adesivos fofos e mini photocards do Neku.
              </p>
            </div>

            <div className="bg-white border border-brand-pink/15 rounded-2xl p-6 text-center space-y-3.5 relative hover:border-brand-pink/35 transition-all">
              <div className="w-12 h-12 bg-brand-soft-pink border border-brand-pink/30 rounded-full flex items-center justify-center text-brand-cherry mx-auto">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm text-brand-black">Confeccionado de Forma Lenta 🌸</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Nossos produtos de papelaria e combos são desenhados de forma independente e produzidos em pequena escala artesanal com acabamentos premium de alta qualidade.
              </p>
            </div>

            <div className="bg-white border border-brand-pink/15 rounded-2xl p-6 text-center space-y-3.5 relative hover:border-brand-pink/35 transition-all">
              <div className="w-12 h-12 bg-brand-soft-pink border border-brand-pink/30 rounded-full flex items-center justify-center text-brand-cherry mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm text-brand-black">Frete Seguro e Rastreável 🚚</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Rastreamento completo do seu pacote via correios desde a postagem no ateliê até sua porta. E com suporte super humanizado via WhatsApp sempre disponível!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER (Rodapé) --- */}
      <footer className="bg-white border-t border-brand-pink/15 py-12 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            {/* Column 1: Brand details */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-black rounded-lg flex items-center justify-center border border-brand-pink/30">
                  <span className="text-[10px] text-brand-pink">🐾</span>
                </div>
                <span className="font-display font-black text-sm tracking-wider text-brand-black uppercase">
                  NEKURA <span className="text-brand-cherry">SHOP</span>
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Loja criativa independente especializada em papelaria artesanal fofa-alternativa, protetores holográficos e mimos colecionáveis de K-Pop.
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-brand-cherry p-1 bg-brand-cream/30 hover:bg-brand-soft-pink rounded-lg transition-colors cursor-pointer"
                  title="Siga no Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-brand-black uppercase tracking-wider">Explorar Loja</h4>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button
                    onClick={() => {
                      const catSection = document.getElementById('products-section');
                      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-brand-cherry transition-colors cursor-pointer text-left"
                  >
                    Todos os Produtos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const catSection = document.getElementById('products-section');
                      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-brand-cherry transition-colors cursor-pointer text-left"
                  >
                    Papelaria
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const catSection = document.getElementById('products-section');
                      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-brand-cherry transition-colors cursor-pointer text-left"
                  >
                    Photocards
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const catSection = document.getElementById('products-section');
                      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-brand-cherry transition-colors cursor-pointer text-left"
                  >
                    Acessórios
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contacts */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-brand-black uppercase tracking-wider">Central de Ajuda</h4>
              <ul className="space-y-2 text-[11px]">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-cherry flex-shrink-0" />
                  <span>+55 (11) 98765-4321</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-cherry flex-shrink-0" />
                  <span>oi@nekurashop.com.br</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Payment Badges */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-brand-black uppercase tracking-wider">Meios de Pagamento</h4>
              <p className="text-[11px] leading-relaxed">Aceitamos Pix à vista com desconto especial, boleto bancário ou cartões de crédito em até 3x sem juros.</p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {['PIX', 'Mastercard', 'Visa', 'Elo', 'Boleto'].map((pay) => (
                  <span
                    key={pay}
                    className="bg-brand-cream/40 border border-brand-pink/20 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md text-brand-black uppercase"
                  >
                    {pay}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Copyright line */}
          <div className="pt-8 border-t border-brand-pink/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Nekura Shop S.A. CNPJ: 12.345.678/0001-90. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 flex items-center gap-1">
              <span>Feito com</span>
              <Heart className="w-3 h-3 text-brand-cherry fill-brand-cherry" />
              <span>para colecionadores de sonhos.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* --- INTEGRATED MODALS & OVERLAYS --- */}
      <MascotNeku size={120} className="fixed bottom-6 right-6 z-40" />

        </div>
      )}
    </>
  );
}
