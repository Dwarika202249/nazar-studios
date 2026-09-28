'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface WordScrubProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'blockquote';
  className?: string;
}

export function WordScrub({
  children,
  as: Component = 'p',
  className = '',
}: WordScrubProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const words = children.split(' ');

  useGsapContext(
    containerRef,
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const wordSpans = containerRef.current.querySelectorAll('.scrub-word');

      gsap.fromTo(
        wordSpans,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.6,
          },
        }
      );
    },
    [children, prefersReducedMotion]
  );

  return (
    <Component
      ref={containerRef as any}
      className={className}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="scrub-word inline-block mr-[0.28em] transition-colors"
          style={{ opacity: prefersReducedMotion ? 1 : 0.18 }}
          aria-hidden="true"
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
