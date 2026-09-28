'use client';

import React from 'react';
import { brand } from '@/content/brand';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { Marquee } from '@/components/motion/Marquee';
import { LineDraw } from '@/components/motion/LineDraw';

const btsImages = [
  { title: 'Aarav loading 35mm roll', image: '/images/moments/pheras.webp' },
  { title: 'Ishita with ambient flash', image: '/images/moments/sangeet.webp' },
  { title: 'Morning mandap walkthrough', image: '/images/moments/haldi.webp' },
  { title: 'Sound recordist on lakeside', image: '/images/moments/baraat.webp' },
  { title: 'Color grading suite in Jaipur', image: '/images/moments/reception.webp' },
];

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-ink text-ivory pt-36 pb-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 space-y-32">
        {/* 1. Hero Split: Giant Title & Offset Founders Portraits */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
              Founders & Philosophy · Est. {brand.established}
            </span>

            <SplitReveal
              as="h1"
              className="font-cormorant text-5xl sm:text-7xl md:text-8xl font-light tracking-tight-display text-ivory"
            >
              We are Nazar.
            </SplitReveal>

            <p className="font-cormorant italic text-2xl sm:text-3xl text-sand leading-relaxed">
              Two people, one camera each, and a stubborn belief that a wedding deserves the same care as a film.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-6 relative">
            {/* Aarav Portrait */}
            <div className="space-y-3">
              <div
                className="w-full aspect-[3/4] border border-champagne/40 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500 bg-forest"
                style={{ backgroundImage: `url(${brand.founders[0].portrait})` }}
              />
              <span className="font-mono text-xs text-champagne block">
                {brand.founders[0].name}
              </span>
              <span className="font-manrope text-[11px] text-sand/60 block">
                {brand.founders[0].role}
              </span>
            </div>

            {/* Ishita Portrait */}
            <div className="space-y-3 pt-8">
              <div
                className="w-full aspect-[3/4] border border-champagne/40 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500 bg-velvet"
                style={{ backgroundImage: `url(${brand.founders[1].portrait})` }}
              />
              <span className="font-mono text-xs text-champagne block">
                {brand.founders[1].name}
              </span>
              <span className="font-manrope text-[11px] text-sand/60 block">
                {brand.founders[1].role}
              </span>
            </div>
          </div>
        </section>

        {/* 2. Studio Story Narrative */}
        <section className="border-t border-smoke pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 font-mono text-xs uppercase tracking-wide-mono text-champagne">
            The Jaipur Studio
          </div>

          <div className="lg:col-span-8 space-y-6 font-manrope text-base sm:text-lg text-sand/90 leading-relaxed max-w-3xl">
            <p>
              Aarav Mehra directs and shoots the films. Ishita Rao photographs the day. They met on a documentary set in 2014, and started Nazar a year later in a small Jaipur studio with borrowed prime lenses.
            </p>
            <p>
              Today a team of fourteen shoots about forty weddings a year — on purpose. Fewer weddings. More attention. We know that real memories cannot be manufactured in post-production; they must be witnessed with quiet patience.
            </p>
          </div>
        </section>

        {/* 3. The Three Quiet Rules */}
        <section className="space-y-12 border-t border-smoke pt-16">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            Our Manifesto · The Three Quiet Rules
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {brand.threeRules.map((rule) => (
              <div
                key={rule.number}
                className="p-8 border border-smoke/60 bg-ink/40 space-y-4 hover:border-champagne/60 transition-colors"
              >
                <span className="font-mono text-2xl text-champagne block">
                  {rule.number}
                </span>

                <h3 className="font-cormorant text-3xl font-light text-ivory">
                  {rule.title}
                </h3>

                <p className="font-manrope text-sm text-sand/80 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Team Roster Grid */}
        <section className="border-t border-smoke pt-16 space-y-12">
          <div className="flex items-end justify-between">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
              Core Creative Leads
            </span>
            <span className="font-mono text-xs text-sand/60">
              14 Dedicated Specialists
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs tracking-wide-mono">
            {brand.team.map((member, i) => (
              <div key={i} className="p-6 border border-smoke/40 space-y-2 bg-ink/30">
                <span className="text-sand/50 text-[10px] uppercase block">
                  0{i + 1}
                </span>
                <span className="text-ivory text-sm font-medium block">
                  {member.name}
                </span>
                <span className="text-champagne block text-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 5. Behind-the-Scenes Marquee Strip */}
      <section className="pt-24 select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-6">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne">
            Behind the Scenes · In the Field
          </span>
        </div>

        <Marquee speed={30} className="py-4 border-y border-smoke/60">
          {btsImages.map((bts, idx) => (
            <div
              key={idx}
              className="relative w-64 h-44 border border-smoke shrink-0 overflow-hidden bg-forest/40 group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${bts.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 font-mono text-[10px] text-sand truncate">
                {bts.title}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* 6. Technical Craft & Gear Nerd Note */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-20">
        <div className="p-8 border border-smoke/60 bg-forest/20 flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-xs tracking-wide-mono text-sand/80">
          <div>
            <span className="text-champagne uppercase block mb-1">
              Craft & Equipment Philosophy
            </span>
            <p className="max-w-2xl text-sand">
              {brand.craftNote}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-ivory block font-medium">Leica · Zeiss · Kodak 35mm</span>
            <span className="text-sand/50 text-[10px]">No gimmicks. Only light.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
