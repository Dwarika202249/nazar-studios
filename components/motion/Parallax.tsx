'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // positive = scroll up faster, negative = scroll slower
  className?: string;
}

export function Parallax({ children, speed = 1, className = '' }: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(
    targetRef,
    () => {
      if (prefersReducedMotion || !targetRef.current) return;

      const yOffset = speed * 60; // 60px scrub range proportional to speed

      gsap.fromTo(
        targetRef.current,
        { y: yOffset },
        {
          y: -yOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: targetRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    [speed, prefersReducedMotion]
  );

  return (
    <div ref={targetRef} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
}
