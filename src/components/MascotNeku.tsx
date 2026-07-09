import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import NekuSvg from './NekuSvg';

interface MascotProps {
  className?: string;
  size?: number;
  interactive?: boolean;
  bubbleAlign?: 'center' | 'right';
}

export default function MascotNeku({ className = '', size = 120, interactive = true, bubbleAlign = 'center' }: MascotProps) {
  const [clickCount, setClickCount] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [isWiggling, setIsWiggling] = useState(false);

  const cuteQuotes = [
    "Miau! Bem-vindo(a) à Nekura Shop! 🖤",
    "Estou cuidando da sua coleção de Photocards! ✨",
    "Dica secreta: Use o cupom NEKURALOVE! 🐾",
    "Adicione fofura escura no seu dia! 🎀",
    "Minhas asinhas de morcego batem de alegria! 🦇",
    "Cada caixinha é preparada com muito amor! 📦",
    "Proteja suas raridades com Sleeves holográficos! ✦",
    "Eu amo brilho holográfico e estrelinhas! 🌟",
    "Já viu nossos Combos promocionais? Economia garantida! 🎒"
  ];

  // Set greeting on load for interactive mascots if they are featured prominently
  useEffect(() => {
    if (interactive && size > 150) {
      const timer = setTimeout(() => {
        setBubbleText("Olá! Clique em mim para ganhar um carinho! 🐾");
        setShowBubble(true);
        const hideTimer = setTimeout(() => setShowBubble(false), 5000);
        return () => clearTimeout(hideTimer);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [interactive, size]);

  const handleMascotClick = () => {
    if (!interactive) return;
    
    setClickCount((prev) => prev + 1);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);

    const randomQuote = cuteQuotes[Math.floor(Math.random() * cuteQuotes.length)];
    setBubbleText(randomQuote);
    setShowBubble(true);
    
    // Play a cute synthesized kitty meow sound!
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const lowpass = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      
      // Main fundamental pitch (high and sweet, like a kitten)
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(580, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      osc1.frequency.exponentialRampToValueAtTime(450, now + 0.42);
      
      // Harmonic resonance (adds a warm nasal 'vowel' texture)
      osc2.type = 'sawtooth';
      // Tune it exactly 1.5x (perfect fifth) above for the cute feline nasal vocalization
      osc2.frequency.setValueAtTime(580 * 1.5, now);
      osc2.frequency.exponentialRampToValueAtTime(880 * 1.5, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(450 * 1.5, now + 0.42);
      
      const osc2Gain = audioCtx.createGain();
      osc2Gain.gain.setValueAtTime(0.04, now); // Keep sawtooth quiet so it only adds warmth/formant, not harshness
      
      // Oral/Vowel formant filter (highly resonant bandpass to mimic 'm-ee-aa-oo-ww')
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3.5, now); // Sweet resonance peak
      filter.frequency.setValueAtTime(1200, now); // starts closed (m-)
      filter.frequency.exponentialRampToValueAtTime(2200, now + 0.12); // wide open (ee-aa)
      filter.frequency.exponentialRampToValueAtTime(650, now + 0.42); // closing (oo-ww)
      
      // Secondary lowpass to filter out any clicky or overly sharp high frequencies
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(3000, now);
      
      // Amplitude envelope (attack, sustain peak, long cute release)
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.06); // soft kitten 'm' attack
      gain.gain.exponentialRampToValueAtTime(0.14, now + 0.22); // sweet meow body
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45); // clean closing fade-out
      
      // Connect nodes
      osc1.connect(filter);
      
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      
      filter.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(audioCtx.destination);
      
      // Start/Stop
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.46);
      osc2.stop(now + 0.46);
    } catch (e) {
      // Ignore audio errors gracefully
    }
  };

  return (
    <div 
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      id={`neku-mascot-${size}`}
    >
      {/* Dialogue Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: -size * 0.45 - 35, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`absolute z-40 bg-brand-black text-brand-cream border border-brand-pink/30 px-3 py-2 rounded-2xl font-sans text-center shadow-lg pointer-events-none max-w-[200px] ${
              bubbleAlign === 'right' ? '' : 'left-1/2 -translate-x-1/2'
            }`}
            style={{ 
              width: 'max-content',
              right: bubbleAlign === 'right' ? '8px' : undefined
            }}
          >
            {/* Arrow */}
            <div 
              className={`absolute bottom-[-6px] w-3 h-3 bg-brand-black border-r border-b border-brand-pink/30 rotate-45 ${
                bubbleAlign === 'right' ? '' : 'left-1/2 -translate-x-1/2'
              }`} 
              style={{
                right: bubbleAlign === 'right' ? `${(size / 2) - 8 - 6}px` : undefined
              }}
            />
            <p className="text-[10px] font-medium leading-normal tracking-wide text-white">
              {bubbleText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Mascot Wrapper */}
      <motion.div
        className="w-full h-full relative"
        animate={{
          y: interactive ? [0, -6, 0] : [0, -3, 0],
          rotate: isWiggling ? [0, -10, 10, -5, 5, 0] : 0
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: interactive ? 3 : 4,
            ease: "easeInOut",
            delay: size % 2 === 0 ? 0 : 0.5
          },
          rotate: {
            duration: 0.4,
            ease: "easeInOut"
          }
        }}
        onClick={handleMascotClick}
      >
        {/* Glow effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-brand-pink/15 blur-xl pointer-events-none"
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut"
          }}
        />

        {/* 100% Authentic Mascot Vector Image */}
        <NekuSvg 
          size={size}
          className={`w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(241,115,142,0.25)] select-none pointer-events-none ${
            interactive ? 'cursor-pointer hover:brightness-105 active:scale-95 transition-all' : ''
          }`}
        />

        {/* Sparkles around mascot */}
        {interactive && (
          <>
            <motion.div 
              className="absolute -top-1 -left-1 text-xs text-brand-pink opacity-80"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
            >
              ✦
            </motion.div>
            <motion.div 
              className="absolute -bottom-2 -right-1 text-sm text-brand-cherry opacity-80"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.3, delay: 0.7 }}
            >
              ✨
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Touch indicator or click counter */}
      {interactive && (
        <motion.span 
          className="absolute -bottom-4 text-[9px] bg-brand-black text-brand-cream border border-brand-pink/20 px-2 py-0.5 rounded-full font-mono font-medium tracking-tight shadow-xs pointer-events-none"
          animate={{ opacity: clickCount > 0 ? 0.75 : 1 }}
        >
          {clickCount === 0 ? "Me toque! 🐾" : `Neku x${clickCount}`}
        </motion.span>
      )}
    </div>
  );
}
