'use client';

import React from 'react';
import { Marquee } from '@/components/motion/Marquee';

// Fictional / Demo media publication citations
const pressList = [
  'Vogue Weddings',
  'WeddingSutra Luxury',
  'Elle Living',
  'Condé Nast Traveller',
  'Architectural Digest India',
  'Harper’s Bazaar Bride',
  'The Wedded Life',
];

export function PressMarquee() {
  return (
    <section className="py-20 bg-ivory text-ink border-t border-ink/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="font-mono text-xs uppercase tracking-wide-mono text-ink/60">
          Featured & Celebrated In (Demo Citations)
        </span>
      </div>

      <Marquee speed={35} className="py-4 border-y border-ink/10">
        {pressList.map((item, idx) => (
          <span
            key={idx}
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-widest text-ink/75 hover:text-ink transition-colors cursor-default"
          >
            {item}
            <span className="mx-6 text-champagne font-mono text-xs align-middle">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
