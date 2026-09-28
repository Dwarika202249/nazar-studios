'use client';

import React from 'react';
import Link from 'next/link';
import { packages, addOns } from '@/content/packages';
import { faqs } from '@/content/faq';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';

export default function InvestmentPage() {
  return (
    <main className="w-full min-h-screen bg-ink text-ivory pt-36 pb-32 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* 1. Header */}
        <div className="space-y-6 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            Pricing & Packages
          </span>

          <SplitReveal
            as="h1"
            className="font-cormorant text-5xl sm:text-7xl md:text-8xl font-light tracking-tight-display text-ivory"
          >
            Honest pricing. Zero surprises.
          </SplitReveal>

          <p className="font-cormorant italic text-2xl sm:text-3xl text-sand max-w-xl leading-relaxed">
            Every quote includes full editing rights, bespoke color grading, and our dedicated team.
          </p>
        </div>

        {/* 2. Three Package Tier Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 sm:p-10 border rounded-sm flex flex-col justify-between space-y-8 transition-all duration-300 ${
                pkg.highlighted
                  ? 'border-champagne bg-ink/80 shadow-2xl relative'
                  : 'border-smoke bg-ink/40'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 bg-champagne text-ink font-mono text-[10px] uppercase tracking-widest rounded-full font-bold">
                  Most Chosen
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-devanagari text-champagne text-lg">
                    {pkg.hindi}
                  </span>
                  <span className="font-mono text-xs text-sand/60">
                    {pkg.coverage}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-cormorant text-4xl text-ivory font-light">
                    {pkg.name}
                  </h2>
                  <p className="font-manrope text-sm text-sand/80">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-smoke/60">
                  <span className="font-mono text-xs text-sand/60 block">
                    Investment from
                  </span>
                  <span className="font-cormorant text-4xl sm:text-5xl text-champagne font-light">
                    {pkg.price}
                  </span>
                  <span className="font-mono text-[11px] text-sand/50 block mt-1">
                    {pkg.team}
                  </span>
                </div>

                {/* Deliverables List */}
                <div className="pt-6 border-t border-smoke/40 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-wide text-sand/70 block">
                    Inclusions:
                  </span>
                  <ul className="space-y-2.5 font-manrope text-xs sm:text-sm text-sand/90">
                    {pkg.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start space-x-2.5">
                        <span className="text-champagne font-mono text-xs">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
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
        </section>

        {/* 3. Bespoke Add-ons */}
        <section className="space-y-12 border-t border-smoke pt-20">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
              A La Carte · Enhancements
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-ivory">
              Tailor your chronicle.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs tracking-wide-mono">
            {addOns.map((addon, i) => (
              <div
                key={i}
                className="p-6 border border-smoke/60 bg-ink/30 flex items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <h3 className="font-cormorant text-2xl font-light text-ivory">
                    {addon.name}
                  </h3>
                  <p className="font-manrope text-xs text-sand/80 max-w-sm">
                    {addon.desc}
                  </p>
                </div>

                <span className="text-champagne font-mono text-sm shrink-0">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          <p className="font-mono text-xs text-sand/50 italic text-center pt-2">
            * Note: All prices are indicative and fictional for this flagship demo website.
          </p>
        </section>

        {/* 4. FAQ Accordion */}
        <section className="space-y-12 border-t border-smoke pt-20">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
              Inquiries & Protocol · FAQ
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-ivory">
              Everything you might wonder.
            </h2>
          </div>

          <Accordion items={faqs} />
        </section>

        {/* 5. Bottom CTA Banner */}
        <section className="p-12 sm:p-16 border border-champagne/40 bg-velvet/40 text-center space-y-6">
          <h2 className="font-cormorant text-4xl sm:text-6xl font-light text-ivory">
            Ready to secure your date?
          </h2>
          <p className="font-manrope text-sm sm:text-base text-sand/80 max-w-xl mx-auto">
            We limit our calendar to ensure uncompromising attention for each celebration.
          </p>
          <div className="pt-4">
            <Button href="/enquire" variant="primary">
              Begin Your Story
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
