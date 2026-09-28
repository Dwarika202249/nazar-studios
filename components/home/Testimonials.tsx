'use client';

import React, { useState, useEffect } from 'react';
import { testimonials } from '@/content/testimonials';

export function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = testimonials[activeIdx];

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const next = () => setActiveIdx((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-ink text-ivory border-t border-smoke overflow-hidden transition-colors"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header with Navigation Controls */}
        <div className="flex items-center justify-between border-b border-smoke pb-6">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne">
            Words from Couples · 0{activeIdx + 1} / 0{testimonials.length}
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={prev}
              aria-label="Previous Testimonial"
              className="w-10 h-10 rounded-full border border-smoke hover:border-champagne text-sand hover:text-ivory flex items-center justify-center font-mono text-xs transition-colors"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next Testimonial"
              className="w-10 h-10 rounded-full border border-smoke hover:border-champagne text-sand hover:text-ivory flex items-center justify-center font-mono text-xs transition-colors"
            >
              →
            </button>
          </div>
        </div>

        {/* Big Quote with smooth transition */}
        <div className="min-h-[220px] flex flex-col justify-between">
          <blockquote className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic leading-snug text-ivory transition-opacity duration-700 ease-out">
            “{current.quote}”
          </blockquote>
        </div>

        {/* Couple Meta & Thumbnail */}
        <div className="flex items-center justify-between pt-8 border-t border-smoke/60">
          <div className="flex items-center space-x-4">
            <div
              className="w-14 h-14 rounded-full border border-champagne/40 bg-cover bg-center shrink-0"
              style={{
                backgroundImage: `url(${current.image})`,
                backgroundColor: '#2A0C14',
              }}
            />

            <div>
              <h4 className="font-cormorant text-2xl font-light text-champagne">
                {current.couple}
              </h4>
              <p className="font-mono text-xs text-sand/70">
                {current.location} · {current.tradition}
              </p>
            </div>
          </div>

          {/* SVG Drawn Signature Monogram */}
          <div className="hidden sm:block">
            <svg viewBox="0 0 160 40" className="w-36 h-10 text-champagne stroke-current fill-none stroke-[1.2]">
              <path d="M 10 30 Q 40 5, 80 20 T 150 15" strokeDasharray="200" strokeDashoffset="0" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
