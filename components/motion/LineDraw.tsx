'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LineDrawProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  color?: string;
}

export function LineDraw({
  orientation = 'horizontal',
  className = '',
  color = '#C9A46A',
}: LineDrawProps) {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(
    containerRef,
    () => {
      if (prefersReducedMotion || !lineRef.current) return;

      const isVertical = orientation === 'vertical';

      gsap.fromTo(
        lineRef.current,
        isVertical ? { scaleY: 0 } : { scaleX: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 0.5,
          },
        }
      );
    },
    [orientation, prefersReducedMotion]
  );

  const isVertical = orientation === 'vertical';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${
        isVertical ? 'w-[1px] h-full' : 'h-[1px] w-full'
      } bg-smoke/40 ${className}`}
    >
      <div
        ref={lineRef}
        className={`absolute inset-0 ${isVertical ? 'origin-top' : 'origin-left'}`}
        style={{
          backgroundColor: color,
          transform: prefersReducedMotion ? undefined : isVertical ? 'scaleY(0)' : 'scaleX(0)',
        }}
      />
    </div>
  );
}
