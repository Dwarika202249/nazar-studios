'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  end,
  prefix = '',
  suffix = '',
  duration = 2.0,
  className = '',
}: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(
    containerRef,
    () => {
      if (!numberRef.current) return;

      if (prefersReducedMotion) {
        numberRef.current.innerText = `${prefix}${end.toLocaleString()}${suffix}`;
        return;
      }

      const counter = { val: 0 };

      gsap.to(counter, {
        val: end,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = `${prefix}${Math.floor(counter.val).toLocaleString()}${suffix}`;
          }
        },
      });
    },
    [end, prefix, suffix, duration, prefersReducedMotion]
  );

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      <span ref={numberRef} className="tabular-nums">
        {prefersReducedMotion ? `${prefix}${end.toLocaleString()}${suffix}` : '0'}
      </span>
    </div>
  );
}
