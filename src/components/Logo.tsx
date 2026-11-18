import React from 'react';

interface LogoProps {
  size?: number;
  /** 'dark' = danfo mark on dark/paper ground. 'onDanfo' = ink mark on danfo ground. */
  variant?: 'dark' | 'onDanfo';
}

/**
 * Hustle Pass mark — spec section 6.
 * 64x64 viewBox. Rounded rect x6 y8 w52 h48 rx12. Punch-hole circle cx32 cy15 r4 (opposite colour).
 * "H": path M23 28v18M41 28v18M23 37h18, stroke-width 5, round caps (opposite colour).
 */
export const Logo: React.FC<LogoProps> = ({ size = 34, variant = 'dark' }) => {
  const bg = variant === 'dark' ? 'var(--ink)' : 'var(--danfo)';
  const fg = variant === 'dark' ? 'var(--danfo)' : 'var(--ink)';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="8" width="52" height="48" rx="12" fill={bg} />
      <circle cx="32" cy="15" r="4" fill={fg} />
      <path
        d="M23 28v18M41 28v18M23 37h18"
        stroke={fg}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
