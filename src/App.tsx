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

export default function App() {
  // --- STATE SYSTEM ---
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  
  // Modals & Drawers States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Hero Banner Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Flash sales countdown simulation state (resets to 3 hours 14 mins every day)
  const [countdown, setCountdown] = useState({ hours: 3, minutes: 14, seconds: 45 });

  // --- CAROUSEL AUTO-ROTATE ---
  const slides = [
    {
      title: "Volta às Aulas Gótico Fofo! 🎒✨",
      subtitle: "Coleção Neku & Amigos",
      desc: "Planners semanais de toque aveludado, chaveiros de miçangas candy colors, adesivos holográficos e mimos inclusos em todo pacote.",
      badge: "Lançamento Exclusivo",
      coupon: "HELLONEKU",
      image: "https://cdn.shopify.com/s/files/1/0533/0845/7144/products/bloom_2024_Soft_Cover_Planner_Desktop_Calendar_Notebook_Gold_Dots_Main_1024x1024.jpg?v=1687291111",
      color: "bg-linear-to-r from-brand-soft-pink via-brand-cream/30 to-white",
      buttonText: "Ver Papelaria"
    },
    {
      title: "Glitter Binders & Sleeves Holográficos ✨",
      subtitle: "Coleção Nekura Vault 🖤",
      desc: "Proteja seus Photocards mais raros de K-Pop com sleeves acid-free livres de danos e pastas holográficas.",
      badge: "K-Pop Essential",
      coupon: "NEKURALOVE",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRovg1MGQvmIoCseF6Dw253M94dBMNdLGnhbikdoqGiqQ&s=10",
      color: "bg-linear-to-r from-white via-brand-cream/45 to-brand-soft-pink/60",
      buttonText: "Garantir Organizador"
    },
    {
      title: "Super Boxes Temáticas com Desconto! 🎁🖤",
      subtitle: "Combos Promocionais",
      desc: "Mais de R$ 34,00 de economia nos kits completos prontos para presentear quem você ama.",
      badge: "Melhor Custo-Benefício",
      coupon: "PIXLOVE",
      image: "https://cdn.shopify.com/s/files/1/0247/7401/7101/products/stationery-super-box_1024x1024.jpg?v=1599999999",
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

  // --- FLASH SALES COUNTDOWN ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 3, minutes: 14, seconds: 45 }; // Reset simulation
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- CONTACT / INQUIRY FUNCTION ---
  const handleInquireProduct = (product: Product, quantity: number = 1) => {
    const text = `Olá! Vi o produto "${product.name}" (${quantity}x) no site da Nekura Shop e gostaria de mais informações!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=5511987654321&text=${encodedText}`, '_blank');
  };

  // --- FILTER & SEARCH SYSTEM ---
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    return selectedCategory === 'Todos' || product.category === selectedCategory;
  });

  const categories = ['Todos', 'Papelaria', 'Photocards', 'Combos & Kits', 'Acessórios'];

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
              setSelectedCategory('Todos');
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
                setSelectedCategory('Todos');
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
                  <div className="w-full md:w-5/12 h-[150px] sm:h-[180px] md:h-full relative flex items-center justify-center mt-4 md:mt-0">
                    <div className="absolute inset-0 bg-brand-soft-pink/40 rounded-2xl blur-xl rotate-6 transform scale-90" />
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover w-full h-full max-h-[150px] sm:max-h-[180px] md:max-h-[300px] rounded-2xl md:rounded-3xl border border-brand-pink/10 shadow-md transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
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

      {/* --- PROMOTIONS SPOTLIGHT (Seção de Promoções e Novidades) --- */}
      <section id="highlights-section" className="py-12 bg-linear-to-b from-white to-brand-cream/10 border-t border-brand-pink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header with simulated Countdown for VIP Flash Sales */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-brand-cherry">
                Imperdível do Ateliê
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-black tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-brand-pink animate-spin-slow" />
                Combos & Kits Especiais
              </h2>
            </div>
            
            {/* Flash Sales Simulated Timer */}
            <div className="inline-flex items-center gap-2.5 bg-brand-soft-pink border border-brand-pink/30 px-3 py-2 rounded-2xl text-xs font-semibold">
              <Clock className="w-4 h-4 text-brand-cherry flex-shrink-0" />
              <span className="text-brand-wine font-bold uppercase tracking-wider">Ofertas terminam em:</span>
              <span className="font-mono bg-brand-cherry text-white px-2 py-0.5 rounded-md font-bold text-xs">
                {String(countdown.hours).padStart(2, '0')}h
              </span>
              <span className="text-brand-cherry">:</span>
              <span className="font-mono bg-brand-cherry text-white px-2 py-0.5 rounded-md font-bold text-xs">
                {String(countdown.minutes).padStart(2, '0')}m
              </span>
              <span className="text-brand-cherry">:</span>
              <span className="font-mono bg-brand-cherry text-white px-2 py-0.5 rounded-md font-bold text-xs animate-pulse">
                {String(countdown.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          {/* Highlights Bento-Grid layout representing 2 larger promos / combos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Spotlight Card 1: Super Box Fanmade Neku Star (Combo) */}
            <div 
              onClick={() => handleInquireProduct(PRODUCTS_DATA[7], 1)}
              className="bg-white border border-brand-pink/20 rounded-3xl overflow-hidden hover:border-brand-cherry/40 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col md:flex-row relative group cursor-pointer"
            >
              <div className="absolute top-4 left-4 z-10 bg-brand-black text-brand-cream text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Economize R$ 34,00 ⚡
              </div>
              
              {/* Left visual half */}
              <div className="md:w-5/12 bg-brand-cream/20 relative min-h-[220px] md:min-h-full">
                <img
                  src={PRODUCTS_DATA[7].image}
                  alt="Super Box Fanmade Neku Star"
                  className="object-cover w-full h-full absolute inset-0 group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right contents half */}
              <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold font-mono uppercase text-brand-cherry">Combo Completo</span>
                  <h3 className="text-lg font-bold font-display text-brand-black group-hover:text-brand-cherry transition-colors duration-200">
                    KIT COMBO: Super Box Fanmade Neku Star
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    O combo supremo dos sonhos de papelaria e mimos! Inclui: Planner Semanal, Chaveiro Candy Beads, 2 cartelas de adesivos holográficos e photocards.
                  </p>
                  
                  {/* Small list items checklist */}
                  <div className="pt-2">
                    <ul className="text-[10px] text-gray-600 space-y-1">
                      <li className="flex items-center gap-1.5"><span className="text-brand-pink">✦</span> Planner Semanal Colecionador K-Pop</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-pink">✦</span> Chaveiro Phone Strap Candy Beads</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-pink">✦</span> Adesivos & Photocards inclusos</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-brand-pink/10 mt-4 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 line-through">R$ 154,60</span>
                      <span className="bg-brand-soft-pink text-brand-cherry text-[10px] font-bold font-mono px-1.5 rounded-sm">Combo</span>
                    </div>
                    <p className="font-mono text-xl font-black text-brand-black">R$ 119,90</p>
                    <p className="text-[10px] text-emerald-600 font-bold">R$ 113,90 no Pix (-5%)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Spotlight Card 2: Photocard Collector Starter Pack */}
            <div 
              onClick={() => handleInquireProduct(PRODUCTS_DATA[8], 1)}
              className="bg-white border border-brand-pink/20 rounded-3xl overflow-hidden hover:border-brand-cherry/40 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col md:flex-row relative group cursor-pointer"
            >
              <div className="absolute top-4 left-4 z-10 bg-brand-black text-brand-cream text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Economize R$ 49,80 ⚡
              </div>

              {/* Left visual half */}
              <div className="md:w-5/12 bg-brand-cream/20 relative min-h-[220px] md:min-h-full">
                <img
                  src={PRODUCTS_DATA[8].image}
                  alt="Photocard Collector Pack"
                  className="object-cover w-full h-full absolute inset-0 group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right contents half */}
              <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold font-mono uppercase text-brand-cherry">Combo K-Pop</span>
                  <h3 className="text-lg font-bold font-display text-brand-black group-hover:text-brand-cherry transition-colors duration-200">
                    KIT COMBO: Photocard Collector Starter Pack
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Comece sua coleção com proteção máxima! Contém o glitter binder Nekura Vault de 6 argolas e 2 pacotes de Sleeves Holográficos (100 sleeves).
                  </p>

                  <div className="pt-2">
                    <ul className="text-[10px] text-gray-600 space-y-1">
                      <li className="flex items-center gap-1.5"><span className="text-brand-pink">✦</span> Fichário Glitter Nekura Vault</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-pink">✦</span> 100 Sleeves Coração Holográfico</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-pink">✦</span> Brinde: 1 Card Holográfico do Neku</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-brand-pink/10 mt-4 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 line-through">R$ 149,70</span>
                      <span className="bg-brand-soft-pink text-brand-cherry text-[10px] font-bold font-mono px-1.5 rounded-sm">Kit VIP</span>
                    </div>
                    <p className="font-mono text-xl font-black text-brand-black">R$ 99,90</p>
                    <p className="text-[10px] text-emerald-600 font-bold">R$ 94,90 no Pix (-5%)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PRODUCT SECTION (Seção de Produtos em Grid) --- */}
      <section id="products-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section title & Category filters row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-brand-pink/15 mb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-brand-cherry">
                Catálogo de Miminhos
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-black tracking-tight flex items-center gap-2">
                Conheça Nossos Produtos 🛍️
              </h2>
            </div>

            {/* Scrollable Category filter bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold font-display transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-black text-brand-cream border border-brand-black shadow-xs'
                      : 'bg-brand-cream/30 text-gray-600 border border-brand-pink/10 hover:border-brand-pink/30 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active filter feedback banner */}
          {selectedCategory !== 'Todos' && (
            <div className="bg-brand-cream/20 border border-brand-pink/10 rounded-2xl p-3.5 mb-6 text-xs text-gray-500 flex items-center justify-between">
              <span>
                Mostrando <span className="font-bold text-brand-black">{filteredProducts.length}</span> resultados para: <span className="font-bold text-brand-cherry bg-brand-soft-pink px-2 py-0.5 rounded-md ml-1">{selectedCategory}</span>
              </span>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                }}
                className="text-brand-cherry font-bold hover:underline cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {/* GRID OF PRODUCTS */}
          {filteredProducts.length === 0 ? (
            /* EMPTY CATALOG STATE */
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-brand-soft-pink/60 rounded-full flex items-center justify-center text-brand-cherry mx-auto">
                <Info className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-bold text-base text-brand-black">Nenhum miminho encontrado!</p>
                <p className="text-xs text-gray-400 max-w-[280px] mx-auto">Tente alterar o filtro de categoria ou buscar outro termo do catálogo.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                }}
                className="bg-brand-black hover:bg-brand-cherry text-brand-cream hover:text-white font-display font-bold text-xs py-2 px-5 rounded-xl transition-all cursor-pointer"
              >
                Ver Catálogo Completo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onInquire={handleInquireProduct}
                />
              ))}
            </div>
          )}

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
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        const catSection = document.getElementById('products-section');
                        if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-brand-cherry transition-colors cursor-pointer"
                    >
                      {cat === 'Todos' ? 'Todos os Produtos' : cat}
                    </button>
                  </li>
                ))}
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

        </div>
      )}
    </>
  );
}
