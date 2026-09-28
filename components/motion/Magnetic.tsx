'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsTouch } from '@/hooks/useIsTouch';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // max offset in px (default 12px)
  className?: string;
}

export function Magnetic({ children, strength = 12, className = '' }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouch();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // Restrict offset within strength bounds
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const radius = width; // Activation area

      if (dist < radius) {
        xTo((deltaX / radius) * strength);
        yTo((deltaY / radius) * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, isTouch, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={`inline-block transform-gpu ${className}`}>
      {children}
    </div>
  );
}
