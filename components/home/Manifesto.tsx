'use client';

import React from 'react';
import Image from 'next/image';
import { brand } from '@/content/brand';
import { WordScrub } from '@/components/motion/WordScrub';
import { Parallax } from '@/components/motion/Parallax';
import { LineDraw } from '@/components/motion/LineDraw';
import { ThemeSection } from '@/components/motion/ThemeSection';

export function Manifesto() {
  return (
    <ThemeSection
      theme="velvet"
      className="relative py-32 md:py-48 px-6 sm:px-12 md:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Vertical Gold Line & Decorative Caption */}
        <div className="hidden lg:flex lg:col-span-2 flex-col items-start h-full space-y-6">
          <LineDraw orientation="vertical" className="h-64" />
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne [writing-mode:vertical-rl] rotate-180">
            Manifesto · {brand.established}
          </span>
        </div>

        {/* Center Column: WordScrub Narrative Text */}
        <div className="lg:col-span-7 space-y-8">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            The Philosophy
          </span>

          <WordScrub
            as="blockquote"
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug md:leading-[1.28] text-ivory"
          >
            {brand.manifesto}
          </WordScrub>

          <p className="font-mono text-xs uppercase tracking-wide-mono text-sand/60 pt-4">
            Aarav Mehra & Ishita Rao — Founders
          </p>
        </div>

        {/* Right Column: Floating Parallax Image Accents */}
        <div className="lg:col-span-3 relative flex flex-col space-y-12">
          {/* Parallax Image 1: Faster (speed: 1.2) */}
          <Parallax speed={1.2} className="relative w-48 sm:w-56 h-64 sm:h-72 border border-champagne/30 overflow-hidden bg-ink/60 shadow-2xl self-end">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("/images/moments/pheras.webp")',
                backgroundColor: '#16080C',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-wide text-champagne">
              Sacred Fire · Udaipur
            </span>
          </Parallax>

          {/* Parallax Image 2: Slower (speed: 0.85) */}
          <Parallax speed={0.85} className="relative w-40 sm:w-48 h-52 sm:h-60 border border-smoke overflow-hidden bg-ink/60 shadow-xl self-start -mt-8">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("/images/moments/mehendi.webp")',
                backgroundColor: '#0F1A12',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-wide text-sand/80">
              Henna & Hands
            </span>
          </Parallax>
        </div>
      </div>
    </ThemeSection>
  );
}
