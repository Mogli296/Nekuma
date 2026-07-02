import React, { useMemo, useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import NekuSvg from './NekuSvg';

interface IntroScreenProps {
  onEnter: () => void;
  key?: React.Key | string;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [timeLeft, setTimeLeft] = useState(3);
  const onEnterRef = useRef(onEnter);

  // Keep the ref updated with the latest prop function
  useEffect(() => {
    onEnterRef.current = onEnter;
  }, [onEnter]);

  useEffect(() => {
    // Timer to decrement the countdown each second
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnterRef.current();
    }
  }, [timeLeft]);
  // Generate a premium random cloud of glitters and sparkles
  const sparklesList = useMemo(() => {
    return Array.from({ length: 55 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      // Distribute particles closer and further around the bat in the center
      const distance = 40 + Math.random() * 260; 
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      const type = i % 4; // 0: star, 1: diamond, 2: soft dot, 3: cross star
      const size = 5 + Math.random() * 15;
      
      // Aesthetic K-pop gothic-cute colors matching Nekura theme (Cherry, Pink, Soft Pink, Cream, and Metallic Gold)
      const colors = [
        '#F1738E', // Brand Pink
        '#F9ABB9', // Brand Soft Pink
        '#C9112E', // Brand Cherry
        '#FBF3F3', // Brand Cream
        '#FFD700', // Sparkly Gold
        '#E9C8C0', // Brand Beige
        '#E0B0FF', // Soft Lavender
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const duration = 2.5 + Math.random() * 3.5; // 2.5s to 6s
      const delay = Math.random() * 3;
      const rotateSpeed = 45 + Math.random() * 315;
      
      return { id: i, x, y, type, size, color, duration, delay, rotateSpeed };
    });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-black overflow-hidden select-none"
      id="intro-landing-screen"
    >
      {/* Immersive background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-cherry/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-pink/15 blur-[90px] pointer-events-none animate-pulse" />

      {/* Glitter/Purpurina Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparklesList.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: `calc(50% + ${sparkle.x}px)`,
              top: `calc(50% + ${sparkle.y}px - 20px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.9, 0.6, 0.9, 0],
              scale: [0, 1.2, 0.8, 1.4, 0],
              y: [0, -35 - Math.random() * 55, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              rotate: [0, sparkle.rotateSpeed, sparkle.rotateSpeed * 2],
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          >
            {sparkle.type === 0 && (
              // Magical 4-point star sparkle
              <svg viewBox="0 0 24 24" width={sparkle.size} height={sparkle.size} fill={sparkle.color} className="drop-shadow-[0_0_4px_rgba(241,115,142,0.4)]">
                <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
              </svg>
            )}
            
            {sparkle.type === 1 && (
              // Shiny Diamond
              <div 
                style={{ 
                  width: sparkle.size * 0.8, 
                  height: sparkle.size * 0.8, 
                  backgroundColor: sparkle.color, 
                  transform: 'rotate(45deg)',
                  boxShadow: `0 0 6px ${sparkle.color}80`
                }} 
                className="rounded-xs" 
              />
            )}

            {sparkle.type === 2 && (
              // Circular soft glitter dot
              <div 
                style={{ 
                  width: sparkle.size * 0.6, 
                  height: sparkle.size * 0.6, 
                  backgroundColor: sparkle.color,
                  boxShadow: `0 0 8px ${sparkle.color}`
                }} 
                className="rounded-full" 
              />
            )}

            {sparkle.type === 3 && (
              // Alternate star sparkle
              <svg viewBox="0 0 24 24" width={sparkle.size * 0.9} height={sparkle.size * 0.9} fill={sparkle.color}>
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Animated Bat Sticker ("Morcego voando") in the Center */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          id="intro-bat-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: [0, -18, 0], // Smooth flying/hovering wave motion
            rotate: [0, 1.5, -1.5, 0] // Gentle tilting in-flight
          }}
          transition={{
            scale: { duration: 1, ease: "easeOut" },
            opacity: { duration: 0.8, ease: "easeOut" },
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative filter drop-shadow-[0_15px_25px_rgba(241,115,142,0.15)]"
        >
          {/* Bat SVG Vector component */}
          <NekuSvg size={300} />
          
          {/* Subtle glitter surge directly from the bat */}
          <div className="absolute inset-0 bg-radial-to-c from-brand-pink/5 to-transparent pointer-events-none rounded-full" />
        </motion.div>

        {/* Brand Information & Presentation Header */}
        <motion.div 
          className="mt-8 text-center space-y-3 px-4 max-w-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-1 text-brand-pink font-mono uppercase tracking-widest text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Nekura Shop Presenteia</span>
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            NEKURA SHOP <span className="text-brand-pink">✦</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed max-w-xs mx-auto">
            Seu cantinho de mimos gótico fofos, papelaria kawaii e colecionáveis exclusivos de K-pop.
          </p>
        </motion.div>

        {/* Premium elegant loading transition line */}
        <motion.div
          className="mt-12 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="absolute top-0 left-0 h-full bg-brand-pink rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </motion.div>

        {/* Cute Footer Credit */}
        <motion.p 
          className="absolute bottom-8 text-[10px] text-gray-500 font-mono tracking-wider flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span>Feito com</span>
          <Heart className="w-2.5 h-2.5 text-brand-cherry fill-brand-cherry" />
          <span>para colecionadores de sonhos</span>
        </motion.p>
      </div>

      {/* Shimmer animation inline helper */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </motion.div>
  );
}
