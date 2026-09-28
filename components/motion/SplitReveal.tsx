'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SplitRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

export function SplitReveal({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  stagger = 0.04,
  triggerOnScroll = true,
}: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Split text into words while keeping spaces
  const words = children.split(' ');

  useGsapContext(
    containerRef,
    () => {
      if (prefersReducedMotion) return;

      const wordSpans = containerRef.current?.querySelectorAll('.split-word-inner');
      if (!wordSpans || wordSpans.length === 0) return;

      const animProps: gsap.TweenVars = {
        y: '0%',
        opacity: 1,
        duration: 1.0,
        stagger,
        delay,
        ease: 'silk',
      };

      if (triggerOnScroll) {
        gsap.fromTo(
          wordSpans,
          { y: '110%', opacity: 0 },
          {
            ...animProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else {
        gsap.fromTo(wordSpans, { y: '110%', opacity: 0 }, animProps);
      }
    },
    [children, delay, stagger, triggerOnScroll, prefersReducedMotion]
  );

  return (
    <Component
      ref={containerRef as any}
      className={`${className} overflow-hidden`}
      aria-label={children}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.25em] align-bottom"
          aria-hidden="true"
        >
          <span className="split-word-inner inline-block transform-gpu">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
