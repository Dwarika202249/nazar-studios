'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const bladesRef = useRef<SVGSVGElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if user has already seen the preloader in this session
    const seen = sessionStorage.getItem('nazar_preloader_seen');
    if (seen || prefersReducedMotion) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    setShouldRender(true);
  }, [prefersReducedMotion, onComplete]);

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('nazar_preloader_seen', 'true');
          setShouldRender(false);
          onComplete?.();
        },
      });

      // 1. Counter tween 000 -> 100
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            const num = Math.floor(counterObj.val);
            counterRef.current.innerText = num.toString().padStart(3, '0');
          }
        },
      });

      // 2. Rotate aperture blades
      if (bladesRef.current) {
        tl.to(
          bladesRef.current,
          {
            rotation: 120,
            duration: 1.8,
            ease: 'power2.inOut',
          },
          0
        );
      }

      // 3. Staggered reveal of NAZAR letters
      if (wordmarkRef.current) {
        const letters = wordmarkRef.current.querySelectorAll('.char');
        tl.fromTo(
          letters,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: 'silk',
          },
          1.0
        );
      }

      // 4. Iris expands to reveal the page
      tl.to(
        containerRef.current,
        {
          clipPath: 'circle(150% at 50% 50%)',
          duration: 1.2,
          ease: 'linen',
        },
        '+=0.1'
      );

      // Fade out container
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [shouldRender, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] bg-ink flex flex-col items-center justify-center text-ivory overflow-hidden select-none"
      style={{ clipPath: 'circle(100% at 50% 50%)' }}
    >
      {/* Central 6-blade Aperture Monogram */}
      <div className="relative flex flex-col items-center">
        <svg
          ref={bladesRef}
          viewBox="0 0 100 100"
          className="w-20 h-20 text-champagne fill-none stroke-champagne stroke-[1.25] mb-8"
        >
          {/* 6 Iris Blades */}
          <circle cx="50" cy="50" r="46" strokeOpacity="0.4" />
          <path d="M50 4 A46 46 0 0 1 96 50 L58 50 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M96 50 A46 46 0 0 1 73 90 L50 58 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M73 90 A46 46 0 0 1 27 90 L42 58 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M27 90 A46 46 0 0 1 4 50 L42 50 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M4 50 A46 46 0 0 1 27 10 L50 42 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M27 10 A46 46 0 0 1 73 10 L58 42 Z" fill="currentColor" fillOpacity="0.15" />
        </svg>

        {/* Masked NAZAR wordmark */}
        <div ref={wordmarkRef} className="overflow-hidden flex items-center justify-center space-x-2">
          {['N', 'A', 'Z', 'A', 'R'].map((letter, i) => (
            <span
              key={i}
              className="char font-cormorant text-4xl md:text-5xl font-light tracking-[0.2em] inline-block text-ivory"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Counter in DM Mono */}
        <div className="mt-6 flex items-center space-x-3 font-mono text-xs tracking-wide-mono text-champagne">
          <span ref={counterRef}>000</span>
          <span className="opacity-40">/ 100</span>
        </div>
      </div>
    </div>
  );
}
