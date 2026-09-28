'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ThemeSection } from '@/components/motion/ThemeSection';

const editPairs = [
  {
    id: 'pair-1',
    title: 'The Golden Courtyard · Udaipur',
    finishedImage: '/images/stories/anaya-rohan/cover.webp',
    caption: 'Lifted shadows, 5200K warm highlight balance, and organic Kodak grain.',
  },
  {
    id: 'pair-2',
    title: 'Direct Flash Energy · Delhi Sangeet',
    finishedImage: '/images/stories/simran-jaspreet/cover.webp',
    caption: 'High dynamic range recovery, controlled contrast, and rich skin tones.',
  },
  {
    id: 'pair-3',
    title: 'Monsoon Temple Mandap · Kerala',
    finishedImage: '/images/stories/lakshmi-arvind/cover.webp',
    caption: 'Preserving misty rain detail while keeping deep emerald foliage velvety.',
  },
];

export function TheEdit() {
  const [activePairIdx, setActivePairIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const activePair = editPairs[activePairIdx];

  // Auto-sweep demonstration on enter
  useGsapContext(
    containerRef,
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const obj = { pos: 50 };
      gsap.to(obj, {
        pos: 70,
        duration: 0.8,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setSliderPos(obj.pos);
        },
      });
    },
    [prefersReducedMotion]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPos(percentage);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <ThemeSection
      theme="forest"
      className="py-32 px-6 sm:px-12 md:px-24 overflow-hidden border-t border-smoke/40"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-smoke">
          <div>
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block mb-2">
              Color Craft · The Edit
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light tracking-tight-display text-ivory">
              Every frame, finished by hand.
            </h2>
          </div>

          <p className="font-manrope text-sm text-sand/80 max-w-sm">
            Drag to compare the uncorrected flat RAW capture against our bespoke analog film grade.
          </p>
        </div>

        {/* Comparison Frame Container */}
        <div
          ref={containerRef}
          data-cursor="drag"
          onPointerDown={() => setIsDragging(true)}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-champagne/30 bg-ink select-none touch-none cursor-ew-resize"
        >
          {/* Layer 1: FINISHED (Right / Base) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-300"
            style={{
              backgroundImage: `url(${activePair.finishedImage})`,
              backgroundColor: '#1E1410',
            }}
          >
            <div className="absolute top-4 right-4 px-3 py-1 bg-ink/70 backdrop-blur-md rounded-full font-mono text-[10px] tracking-wide-mono uppercase text-champagne border border-champagne/40">
              Finished Film Grade
            </div>
          </div>

          {/* Layer 2: RAW (Left / Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center filter grayscale-[35%] brightness-90 contrast-75 saturate-50 hue-rotate-15"
              style={{
                backgroundImage: `url(${activePair.finishedImage})`,
                backgroundColor: '#121212',
              }}
            >
              <div className="absolute top-4 left-4 px-3 py-1 bg-ink/70 backdrop-blur-md rounded-full font-mono text-[10px] tracking-wide-mono uppercase text-sand/80 border border-smoke">
                Unprocessed RAW
              </div>
            </div>
          </div>

          {/* Draggable Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-champagne pointer-events-none transform -translate-x-1/2 shadow-[0_0_15px_rgba(201,164,106,0.6)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-champagne bg-ink text-champagne flex items-center justify-center font-mono text-xs shadow-2xl backdrop-blur-md">
              ◂ ▸
            </div>
          </div>
        </div>

        {/* Pair Switcher & Technical Caption */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 text-xs font-mono tracking-wide-mono text-sand/80">
          <div className="space-y-1">
            <span className="text-champagne block">{activePair.title}</span>
            <p className="font-manrope text-xs text-sand/60">
              {activePair.caption}
            </p>
          </div>

          {/* Pair Selectors (3 pairs) */}
          <div className="flex space-x-2">
            {editPairs.map((pair, idx) => (
              <button
                key={pair.id}
                onClick={() => {
                  setActivePairIdx(idx);
                  setSliderPos(50);
                }}
                className={`px-3 py-1 rounded-full border text-[10px] uppercase tracking-wide transition-all ${
                  activePairIdx === idx
                    ? 'border-champagne bg-champagne/20 text-champagne'
                    : 'border-smoke text-sand/60 hover:text-ivory hover:border-sand'
                }`}
              >
                Frame 0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ThemeSection>
  );
}
