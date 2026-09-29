'use client';

import React from 'react';
import Link from 'next/link';
import { brand } from '@/content/brand';

interface LogoProps {
  variant?: 'full' | 'compact' | 'mark';
  className?: string;
  showHindi?: boolean;
  linkToHome?: boolean;
}

export function Logo({
  variant = 'full',
  className = '',
  showHindi = true,
  linkToHome = true,
}: LogoProps) {
  const content = (
    <div className={`group inline-flex items-center gap-3 select-none ${className}`}>
      {/* Bespoke Nazar Eye & Aperture Emblem */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-500 ease-out group-hover:scale-105">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(201,164,106,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E5C9" />
              <stop offset="40%" stopColor="#E8CB93" />
              <stop offset="75%" stopColor="#C9A46A" />
              <stop offset="100%" stopColor="#9E783D" />
            </linearGradient>
            <radialGradient id="logoAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9A46A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C9A46A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient golden aura on hover */}
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="url(#logoAura)"
            className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Outer hairline circle */}
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="url(#logoGold)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <circle
            cx="60"
            cy="60"
            r="47"
            stroke="url(#logoGold)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            strokeOpacity="0.5"
          />

          {/* 4 Cardinal Diamond Accents */}
          <path d="M 60 10 L 62 12 L 60 14 L 58 12 Z" fill="url(#logoGold)" />
          <path d="M 60 106 L 62 108 L 60 110 L 58 108 Z" fill="url(#logoGold)" />
          <path d="M 10 60 L 12 62 L 14 60 L 12 58 Z" fill="url(#logoGold)" />
          <path d="M 106 60 L 108 62 L 110 60 L 108 58 Z" fill="url(#logoGold)" />

          {/* Royal Chhatri Arch Finial Motif */}
          <circle cx="60" cy="20" r="2.2" fill="url(#logoGold)" />
          <path
            d="M 60 24 L 64 31 L 56 31 Z"
            stroke="url(#logoGold)"
            strokeWidth="1"
            fill="none"
          />

          {/* The Nazar Eye Contour (The Gaze) */}
          <path
            d="M 22 60 C 34 38, 86 38, 98 60 C 86 82, 34 82, 22 60 Z"
            stroke="url(#logoGold)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Inner filigree eyelid line */}
          <path
            d="M 30 60 C 40 44, 80 44, 90 60 C 80 76, 40 76, 30 60 Z"
            stroke="url(#logoGold)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Aperture Iris Ring */}
          <circle
            cx="60"
            cy="60"
            r="17"
            fill="#0B0908"
            stroke="url(#logoGold)"
            strokeWidth="1.4"
          />

          {/* 6 Aperture Blades with rotation on hover */}
          <g
            stroke="url(#logoGold)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.9"
            className="origin-center transition-transform duration-700 ease-out group-hover:rotate-45"
            style={{ transformOrigin: '60px 60px' }}
          >
            <line x1="60" y1="43" x2="74" y2="52" />
            <line x1="74" y1="52" x2="74" y2="68" />
            <line x1="74" y1="68" x2="60" y2="77" />
            <line x1="60" y1="77" x2="46" y2="68" />
            <line x1="46" y1="68" x2="46" y2="52" />
            <line x1="46" y1="52" x2="60" y2="43" />
          </g>

          {/* Golden Core Pupil */}
          <circle cx="60" cy="60" r="5" fill="url(#logoGold)" />

          {/* Radiant Center Starburst Glint */}
          <path
            d="M 60 52 L 61.2 58.8 L 68 60 L 61.2 61.2 L 60 68 L 58.8 61.2 L 52 60 L 58.8 58.8 Z"
            fill="#FFFDF8"
          />
        </svg>
      </div>

      {/* Typographic Lockup */}
      {variant !== 'mark' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-2">
            <span className="font-cormorant text-2xl sm:text-[27px] font-light tracking-[0.16em] uppercase text-ivory group-hover:text-champagne transition-colors duration-300">
              {brand.name}
            </span>
            {showHindi && (
              <span className="font-devanagari text-xs sm:text-sm text-champagne/90 group-hover:text-gold-hi transition-colors duration-300">
                {brand.hindi}
              </span>
            )}
          </div>
          {variant === 'full' && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-sand/60 group-hover:text-sand/90 transition-colors">
                Studios
              </span>
              <span className="w-1 h-1 rounded-full bg-champagne/40" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-champagne/70 group-hover:text-champagne transition-colors">
                Jaipur
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        aria-label={`${brand.name} Studios — Return to home`}
        className="inline-block pointer-events-auto outline-none focus-visible:ring-1 focus-visible:ring-champagne rounded-sm"
      >
        {content}
      </Link>
    );
  }

  return content;
}
