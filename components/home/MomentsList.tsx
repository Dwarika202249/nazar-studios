'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsTouch } from '@/hooks/useIsTouch';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { moments, Moment } from '@/content/moments';

export function MomentsList() {
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const previewRef = useRef<HTMLDivElement | null>(null);
  const previewImgRef = useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouch();
  const prefersReducedMotion = useReducedMotion();

  // Floating cursor image tracking with velocity-based skew
  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const preview = previewRef.current;
    if (!preview) return;

    const xTo = gsap.quickTo(preview, 'x', { duration: 0.3, ease: 'power3.out' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.3, ease: 'power3.out' });
    const rotTo = gsap.quickTo(preview, 'rotation', { duration: 0.4, ease: 'power2.out' });

    let lastX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;
      const skew = Math.max(-6, Math.min(6, deltaX * 0.4));

      xTo(e.clientX + 30);
      yTo(e.clientY - 180);
      rotTo(skew);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch, prefersReducedMotion]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative py-32 px-6 sm:px-12 md:px-24 bg-ink text-ivory border-t border-smoke overflow-hidden">
      {/* Floating Cursor Image Preview (Desktop Only) */}
      {!isTouch && !prefersReducedMotion && (
        <div
          ref={previewRef}
          className={`pointer-events-none fixed top-0 left-0 z-40 w-64 h-80 rounded-sm overflow-hidden border border-champagne/40 bg-ink shadow-2xl transition-opacity duration-300 ${
            activeMoment ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {activeMoment && (
            <div
              ref={previewImgRef}
              className="w-full h-full bg-cover bg-center transition-all duration-500 scale-105"
              style={{
                backgroundImage: `url(${activeMoment.image})`,
                backgroundColor: '#1E1410',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-[10px] uppercase text-champagne block tracking-wider">
                  {activeMoment.title} · {activeMoment.hindi}
                </span>
                <p className="font-manrope text-xs text-sand/90 line-clamp-2 mt-1">
                  {activeMoment.oneLiner}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 pb-8 border-b border-smoke">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            Rituals & Repertoire
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light tracking-tight-display">
            The moments we wait for.
          </h2>
        </div>

        {/* Interactive Serif Rows */}
        <div className="divide-y divide-smoke/60">
          {moments.map((m) => {
            const isHovered = activeMoment?.id === m.id;
            const isExpanded = expandedId === m.id;

            return (
              <div
                key={m.id}
                onMouseEnter={() => setActiveMoment(m)}
                onMouseLeave={() => setActiveMoment(null)}
                className={`py-8 sm:py-10 transition-all duration-500 ${
                  activeMoment && !isHovered ? 'opacity-25' : 'opacity-100'
                }`}
              >
                <div
                  onClick={() => toggleExpand(m.id)}
                  className="flex items-baseline justify-between cursor-pointer group select-none"
                >
                  <div className="flex items-baseline space-x-6 sm:space-x-12 transition-transform duration-300 group-hover:translate-x-6">
                    <span className="font-mono text-xs sm:text-sm text-champagne/60 group-hover:text-champagne">
                      {m.index}
                    </span>

                    <h3 className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-ivory group-hover:text-champagne transition-colors">
                      {m.title}
                    </h3>

                    <span className="font-devanagari text-lg sm:text-2xl text-sand/40 group-hover:text-sand/80 transition-colors">
                      {m.hindi}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="hidden md:inline font-manrope text-xs text-sand/60 italic">
                      {m.oneLiner}
                    </span>
                    <span className="text-champagne font-mono text-sm">
                      {isExpanded ? '—' : '+'}
                    </span>
                  </div>
                </div>

                {/* Expanded Drawer */}
                {isExpanded && (
                  <div className="pt-6 pl-12 sm:pl-24 max-w-2xl text-sand/80 font-manrope text-sm leading-relaxed animate-in fade-in duration-300">
                    <p>{m.description}</p>
                    <div className="mt-4 font-mono text-xs text-champagne">
                      Capturing real expression, light & stillness.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
