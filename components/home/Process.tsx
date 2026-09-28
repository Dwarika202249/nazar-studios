'use client';

import React, { useRef } from 'react';
import { LineDraw } from '@/components/motion/LineDraw';

const steps = [
  {
    number: '01',
    title: 'Meet',
    hindi: 'मुलाक़ात',
    desc: "A slow conversation, not a sales call. We learn your families, rituals, and the moments you're secretly dreading.",
  },
  {
    number: '02',
    title: 'Map',
    hindi: 'नक़्शा',
    desc: 'A shot-by-shot plan of the day, built around light, timing, and who matters most in every single ritual.',
  },
  {
    number: '03',
    title: 'Move',
    hindi: 'सफ़र',
    desc: "On the day we're calm, quiet and everywhere you need us. Your guests and parents forget we are holding cameras.",
  },
  {
    number: '04',
    title: 'Master',
    hindi: 'सृजन',
    desc: 'Every photograph is graded by hand; your film is edited, scored and mixed like an authentic cinematic feature.',
  },
];

export function Process() {
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-ink text-ivory border-t border-smoke overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Pinned Column: Title & Overview */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            Methodology · 4 Steps
          </span>

          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light tracking-tight-display">
            How we work.
          </h2>

          <p className="font-manrope text-sm text-sand/80 leading-relaxed max-w-sm">
            We don’t believe in rushing couples through checklists. Our method gives you the freedom to live your wedding while we protect the memory.
          </p>

          <div className="pt-4">
            <LineDraw orientation="horizontal" className="w-32" />
          </div>
        </div>

        {/* Right Column: Progressive Steps */}
        <div className="lg:col-span-8 relative pl-6 sm:pl-12 border-l border-smoke/60 space-y-20">
          {steps.map((step) => (
            <div
              key={step.number}
              className="space-y-4 group transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <span className="font-mono text-sm sm:text-base text-champagne">
                  {step.number}
                </span>
                <span className="w-8 h-[1px] bg-champagne/60" />
                <span className="font-devanagari text-sand/60 text-sm">
                  {step.hindi}
                </span>
              </div>

              <h3 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-ivory group-hover:text-champagne transition-colors">
                {step.title}
              </h3>

              <p className="font-manrope text-sm sm:text-base text-sand/80 max-w-xl leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
