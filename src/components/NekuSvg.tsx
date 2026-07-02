import React from 'react';

interface NekuSvgProps {
  className?: string;
  size?: number;
}

export default function NekuSvg({ className = '', size = 200 }: NekuSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      id={`neku-vector-svg-${size}`}
    >
      <defs>
        {/* Soft drop shadow for sticker vibe */}
        <filter id="sticker-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#f1738e" floodOpacity="0.25" />
        </filter>
        {/* Glow / gradient for eyes */}
        <radialGradient id="eye-glow-left" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="70%" stopColor="#c9112e" />
          <stop offset="100%" stopColor="#59000a" />
        </radialGradient>
        <radialGradient id="eye-glow-right" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="70%" stopColor="#c9112e" />
          <stop offset="100%" stopColor="#59000a" />
        </radialGradient>
      </defs>

      <g filter="url(#sticker-shadow)">
        {/* ================================================================= */}
        {/* LAYER 1: OUTER PINK STICKER OUTLINE (Thickest stroke behind everything) */}
        {/* ================================================================= */}
        <g stroke="#fbcfe8" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" fill="#fbcfe8">
          {/* Bat Wings Backing */}
          <path d="M 150 280 L 40 260 C 20 280, 50 330, 80 335 C 105 340, 125 320, 145 300 Z" />
          <path d="M 350 280 L 460 260 C 480 280, 450 330, 420 335 C 395 340, 375 320, 355 300 Z" />
          {/* Ears Backing */}
          <path d="M 120 230 L 115 100 L 220 180 Z" />
          <path d="M 380 230 L 385 100 L 280 180 Z" />
          {/* Head & Paws Backing */}
          <circle cx="250" cy="285" r="125" />
          <ellipse cx="195" cy="385" rx="34" ry="24" />
          <ellipse cx="305" cy="385" rx="34" ry="24" />
        </g>

        {/* ================================================================= */}
        {/* LAYER 2: MIDDLE WHITE STICKER OUTLINE (Medium stroke) */}
        {/* ================================================================= */}
        <g stroke="#ffffff" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff">
          {/* Bat Wings Backing */}
          <path d="M 150 280 L 40 260 C 20 280, 50 330, 80 335 C 105 340, 125 320, 145 300 Z" />
          <path d="M 350 280 L 460 260 C 480 280, 450 330, 420 335 C 395 340, 375 320, 355 300 Z" />
          {/* Ears Backing */}
          <path d="M 120 230 L 115 100 L 220 180 Z" />
          <path d="M 380 230 L 385 100 L 280 180 Z" />
          {/* Head & Paws Backing */}
          <circle cx="250" cy="285" r="125" />
          <ellipse cx="195" cy="385" rx="34" ry="24" />
          <ellipse cx="305" cy="385" rx="34" ry="24" />
        </g>

        {/* ================================================================= */}
        {/* LAYER 3: ACTUAL ARTWORK */}
        {/* ================================================================= */}

        {/* Left Bat Wing */}
        <g fill="#1e1e1e" stroke="#1e1e1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Top bone structure */}
          <path d="M 150 280 Q 95 255 40 260 Q 65 295 75 325 Q 110 315 145 300" />
          {/* Ribs inside wing */}
          <path d="M 40 260 Q 90 285 145 300" stroke="#f472b6" strokeWidth="3" fill="none" />
          <path d="M 75 325 Q 105 295 145 300" stroke="#f472b6" strokeWidth="2" fill="none" />
        </g>

        {/* Right Bat Wing */}
        <g fill="#1e1e1e" stroke="#1e1e1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Top bone structure */}
          <path d="M 350 280 Q 405 255 460 260 Q 435 295 425 325 Q 390 315 355 300" />
          {/* Ribs inside wing */}
          <path d="M 460 260 Q 410 285 355 300" stroke="#f472b6" strokeWidth="3" fill="none" />
          <path d="M 425 325 Q 395 295 355 300" stroke="#f472b6" strokeWidth="2" fill="none" />
        </g>

        {/* Left Ear (Outer Black) */}
        <path d="M 130 230 L 120 105 Q 170 145 215 180 Z" fill="#1e1e1e" stroke="#1e1e1e" strokeWidth="6" strokeLinejoin="round" />
        {/* Left Ear (Inner Pink) */}
        <path d="M 142 215 L 135 125 Q 170 155 200 180 Z" fill="#fb7185" />

        {/* Right Ear (Outer Black) */}
        <path d="M 370 230 L 380 105 Q 330 145 285 180 Z" fill="#1e1e1e" stroke="#1e1e1e" strokeWidth="6" strokeLinejoin="round" />
        {/* Right Ear (Inner Pink) */}
        <path d="M 358 215 L 365 125 Q 330 155 300 180 Z" fill="#fb7185" />

        {/* Right Ear Piercing (Hoop Ring) */}
        <ellipse cx="380" cy="140" rx="10" ry="5" transform="rotate(-30, 380, 140)" fill="none" stroke="#e4e4e7" strokeWidth="5" />
        <ellipse cx="380" cy="140" rx="10" ry="5" transform="rotate(-30, 380, 140)" fill="none" stroke="#1e1e1e" strokeWidth="1" />

        {/* Head/Body Shape (Main rounded black cat head) */}
        <rect x="130" y="165" width="240" height="230" rx="115" fill="#1e1e1e" stroke="#1e1e1e" strokeWidth="4" />

        {/* Face blush circles */}
        <ellipse cx="160" cy="315" rx="18" ry="10" fill="#f472b6" fillOpacity="0.45" />
        <ellipse cx="340" cy="315" rx="18" ry="10" fill="#f472b6" fillOpacity="0.45" />

        {/* Left Eye (Big expressive red eyeball) */}
        <g>
          {/* Eyeball outer shadow */}
          <ellipse cx="195" cy="275" rx="32" ry="28" fill="#1e1e1e" />
          {/* Eyeball base */}
          <ellipse cx="195" cy="275" rx="28" ry="24" fill="url(#eye-glow-left)" />
          {/* Pupils */}
          <ellipse cx="195" cy="275" rx="16" ry="18" fill="#111827" />
          {/* Highlights */}
          <circle cx="186" cy="264" r="8" fill="#ffffff" />
          <circle cx="204" cy="284" r="4" fill="#ffffff" />
        </g>

        {/* Right Eye (Slightly angled/mischievous) */}
        <g>
          {/* Eyeball outer shadow */}
          <ellipse cx="305" cy="275" rx="32" ry="28" fill="#1e1e1e" />
          {/* Eyeball base */}
          <ellipse cx="305" cy="275" rx="28" ry="24" fill="url(#eye-glow-right)" />
          {/* Pupils */}
          <ellipse cx="305" cy="275" rx="16" ry="18" fill="#111827" />
          {/* Highlights */}
          <circle cx="296" cy="264" r="8" fill="#ffffff" />
          <circle cx="314" cy="284" r="4" fill="#ffffff" />
        </g>

        {/* Whiskers */}
        <g stroke="#111827" strokeWidth="5" strokeLinecap="round">
          {/* Left Side */}
          <line x1="140" y1="295" x2="105" y2="290" />
          <line x1="135" y1="310" x2="95" y2="310" />
          <line x1="140" y1="325" x2="105" y2="330" />
          {/* Right Side */}
          <line x1="360" y1="295" x2="395" y2="290" />
          <line x1="365" y1="310" x2="405" y2="310" />
          <line x1="360" y1="325" x2="395" y2="330" />
        </g>

        {/* Red Cross Scar on Left Eye (Viewer's right side) */}
        <g stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round">
          <line x1="328" y1="232" x2="344" y2="252" />
          <line x1="344" y1="232" x2="328" y2="252" />
          {/* Small extra cut detail */}
          <line x1="348" y1="255" x2="352" y2="263" strokeWidth="2.5" />
        </g>

        {/* Nose & Cute Mouth */}
        <g>
          {/* Tiny black nose */}
          <polygon points="250,296 245,291 255,291" fill="#111827" />
          
          {/* Mouth "W" Lines */}
          <path d="M 238 301 Q 244 306 250 301 Q 256 306 262 301" fill="none" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />
          
          {/* Cute pink tongue sticking out */}
          <path d="M 244 303 C 244 316, 256 316, 256 303 Z" fill="#ff4d6d" stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
          <line x1="250" y1="303" x2="250" y2="310" stroke="#111827" strokeWidth="1.5" />

          {/* Tiny fangs */}
          <polygon points="241,301 243,305 245,301" fill="#ffffff" />
          <polygon points="259,301 257,305 255,301" fill="#ffffff" />
        </g>

        {/* Left Paw (holding/resting) */}
        <ellipse cx="195" cy="385" rx="26" ry="18" fill="#1e1e1e" stroke="#111827" strokeWidth="4" />
        {/* White Claws */}
        <circle cx="183" cy="376" r="3" fill="#ffffff" />
        <circle cx="195" cy="374" r="3" fill="#ffffff" />
        <circle cx="207" cy="376" r="3" fill="#ffffff" />

        {/* Right Paw (holding/resting) */}
        <ellipse cx="305" cy="385" rx="26" ry="18" fill="#1e1e1e" stroke="#111827" strokeWidth="4" />
        {/* White Claws */}
        <circle cx="293" cy="376" r="3" fill="#ffffff" />
        <circle cx="305" cy="374" r="3" fill="#ffffff" />
        <circle cx="317" cy="376" r="3" fill="#ffffff" />

        {/* Sparkle (Floats above head) */}
        <path
          d="M 250 45 Q 250 65 270 65 Q 250 65 250 85 Q 250 65 230 65 Q 250 65 250 45 Z"
          fill="#fb7185"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
