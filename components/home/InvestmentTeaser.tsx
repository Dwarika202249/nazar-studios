'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { packages } from '@/content/packages';
import { Button } from '@/components/ui/Button';
import { ThemeSection } from '@/components/motion/ThemeSection';

export function InvestmentTeaser() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardEl: HTMLDivElement) => {
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardEl.style.setProperty('--mx', `${x}px`);
    cardEl.style.setProperty('--my', `${y}px`);
  };

  return (
    <ThemeSection
      theme="velvet"
      className="py-32 md:py-48 px-6 sm:px-12 md:px-24 border-t border-smoke overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-smoke">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
              Investment · Curated Packages
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light tracking-tight-display text-ivory">
              Honest pricing. Zero surprises.
            </h2>
          </div>

          <Link
            href="/investment"
            className="font-mono text-xs uppercase tracking-wide-mono text-champagne hover:text-ivory transition-colors flex items-center space-x-2"
          >
            <span>See Full Inclusions & FAQ</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3 Tier Cards with Spotlight hover effect */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              className={`relative rounded-sm p-8 sm:p-10 flex flex-col justify-between border transition-all duration-500 overflow-hidden group hover:-translate-y-2.5 ${
                pkg.highlighted
                  ? 'border-champagne bg-ink/70 shadow-2xl'
                  : 'border-smoke bg-ink/40 hover:border-champagne/60'
              }`}
            >
              {/* Radial Spotlight Glow on Mouse Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(201, 164, 106, 0.12), transparent 40%)',
                }}
              />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-devanagari text-champagne text-lg">
                    {pkg.hindi}
                  </span>
                  {pkg.highlighted && (
                    <span className="px-3 py-0.5 rounded-full border border-champagne text-champagne font-mono text-[10px] uppercase tracking-widest bg-champagne/10">
                      Most Chosen
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-cormorant text-3xl sm:text-4xl text-ivory font-light">
                    {pkg.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-sand/60">
                    {pkg.coverage}
                  </p>
                </div>

                <p className="font-manrope text-sm text-sand/80 leading-relaxed min-h-[48px]">
                  {pkg.tagline}
                </p>

                <div className="pt-4 border-t border-smoke/40">
                  <span className="font-mono text-xs text-sand/60 block">
                    Starting from
                  </span>
                  <span className="font-cormorant text-3xl sm:text-4xl text-champagne font-light">
                    {pkg.price}
                  </span>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <Button
                  href={`/enquire?package=${pkg.id}`}
                  variant={pkg.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  Reserve {pkg.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ThemeSection>
  );
}
