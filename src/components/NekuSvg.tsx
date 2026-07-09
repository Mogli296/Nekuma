import React from 'react';

interface NekuSvgProps {
  className?: string;
  size?: number;
}

export default function NekuSvg({ className = '', size = 200 }: NekuSvgProps) {
  // Use the high-quality official mascot PNG image provided by the user
  const imageUrl = "https://imagem.speakia.ai/wp-content/uploads/2026/07/Design-sem-nome-7-1-scaled.png";

  return (
    <img
      src={imageUrl}
      alt="Neku Mascot"
      width={size}
      height={size}
      className={`select-none pointer-events-none object-contain ${className}`}
      style={{ width: size, height: size }}
      id={`neku-mascot-image-${size}`}
      referrerPolicy="no-referrer"
    />
  );
}
