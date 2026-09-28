'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // duration in seconds
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 25,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(
    containerRef,
    () => {
      if (prefersReducedMotion || !trackRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 2;

      const tl = gsap.to(track, {
        x: reverse ? totalWidth : -totalWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });

      // React to scroll velocity
      let lastScrollY = window.scrollY;
      const onScroll = () => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;

        // Briefly speed up animation based on scroll velocity
        gsap.to(tl, {
          timeScale: 1 + Math.min(Math.abs(delta) * 0.05, 3),
          duration: 0.3,
          onComplete: () => {
            gsap.to(tl, { timeScale: 1, duration: 0.6 });
          },
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    },
    [speed, reverse, prefersReducedMotion]
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
    >
      <div ref={trackRef} className="inline-flex w-max will-change-transform">
        <div className="inline-flex items-center space-x-12 shrink-0">{children}</div>
        <div className="inline-flex items-center space-x-12 shrink-0 pl-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
