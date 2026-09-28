'use client';

import React from 'react';
import { brand } from '@/content/brand';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { WordScrub } from '@/components/motion/WordScrub';
import { CountUp } from '@/components/motion/CountUp';
import { Button } from '@/components/ui/Button';
import { LineDraw } from '@/components/motion/LineDraw';
import { GoldDustCanvas } from '@/components/webgl/GoldDustCanvas';
import { ThemeSection } from '@/components/motion/ThemeSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Showcase Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 md:p-12 text-center overflow-hidden">
        <GoldDustCanvas particleCount={60} className="opacity-60" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-champagne/40 bg-ink/40 backdrop-blur-md">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne">
              {brand.city} · {brand.country}
            </span>
          </div>

          <div className="space-y-2">
            <SplitReveal
              as="h1"
              className="font-cormorant text-6xl sm:text-8xl md:text-9xl font-light tracking-tight-display text-ivory"
            >
              NAZAR
            </SplitReveal>

            <p className="font-devanagari text-xl md:text-2xl text-champagne tracking-widest">
              {brand.hindi}
            </p>
          </div>

          <SplitReveal
            as="p"
            delay={0.2}
            className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-sand max-w-2xl mx-auto"
          >
            Seen by the heart. Kept forever.
          </SplitReveal>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/stories" variant="primary">
              Explore Stories
            </Button>
            <Button href="/enquire" variant="secondary">
              Check Availability
            </Button>
          </div>
        </div>
      </section>

      {/* Manifesto Scrub Section */}
      <ThemeSection theme="velvet" className="py-32 px-6 sm:px-12 md:px-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne">
            The Philosophy
          </span>

          <WordScrub
            as="blockquote"
            className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug text-ivory"
          >
            {brand.manifesto}
          </WordScrub>

          <LineDraw className="mt-12" />
        </div>
      </ThemeSection>

      {/* Numbers Section */}
      <ThemeSection theme="ivory" className="py-28 px-6 sm:px-12 md:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {brand.stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-light text-ink">
                {typeof stat.value === 'number' ? (
                  <CountUp end={stat.value} />
                ) : (
                  <span>{stat.value}</span>
                )}
              </div>
              <p className="font-mono text-xs uppercase tracking-wide-mono text-ink/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </ThemeSection>
    </main>
  );
}
