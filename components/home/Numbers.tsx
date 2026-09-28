'use client';

import React from 'react';
import { brand } from '@/content/brand';
import { CountUp } from '@/components/motion/CountUp';
import { LineDraw } from '@/components/motion/LineDraw';
import { ThemeSection } from '@/components/motion/ThemeSection';

export function Numbers() {
  return (
    <ThemeSection
      theme="ivory"
      className="py-32 px-6 sm:px-12 md:px-24 border-t border-smoke/20"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-ink/60 block">
            Proven Legacy · Proof
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light tracking-tight-display text-ink">
            A decade of documenting what mattered.
          </h2>
        </div>

        {/* 4 Numerals Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {brand.stats.map((stat, i) => {
            const isNum = typeof stat.value === 'number';
            const numVal = isNum
              ? (stat.value as number)
              : parseInt(stat.value.toString().replace(/[^0-9]/g, '')) || 0;
            const suffix = isNum ? '' : stat.value.toString().replace(/[0-9,]/g, '');

            return (
              <div key={i} className="space-y-4">
                <div className="font-cormorant text-6xl sm:text-7xl lg:text-8xl font-light text-ink tracking-tight">
                  <CountUp end={numVal} suffix={suffix} />
                </div>

                <LineDraw orientation="horizontal" color="#C9A46A" className="my-2" />

                <p className="font-mono text-xs sm:text-sm uppercase tracking-wide-mono text-ink/75 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </ThemeSection>
  );
}
