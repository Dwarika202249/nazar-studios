'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsTouch } from '@/hooks/useIsTouch';

type CursorVariant = 'default' | 'hover' | 'view' | 'play' | 'drag' | 'text' | 'hidden';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    // Hide cursor completely on touch devices or reduced motion
    if (isTouch || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // quickTo setters for 60fps performance
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const { clientX, clientY } = e;
      setDotX(clientX);
      setDotY(clientY);
      setRingX(clientX);
      setRingY(clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect target elements and set cursor variant
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor');
        if (val === 'view') {
          setCursorVariant('view');
          setCursorLabel('VIEW');
          return;
        }
        if (val === 'play') {
          setCursorVariant('play');
          setCursorLabel('PLAY');
          return;
        }
        if (val === 'drag') {
          setCursorVariant('drag');
          setCursorLabel('DRAG');
          return;
        }
      }

      // Check standard links / interactive buttons
      if (
        target.closest('a, button, [role="button"]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setCursorVariant('hover');
        setCursorLabel('');
        return;
      }

      // Check form inputs
      if (target.closest('input, textarea') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorVariant('text');
        setCursorLabel('');
        return;
      }

      setCursorVariant('default');
      setCursorLabel('');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouch, prefersReducedMotion, isVisible]);

  if (isTouch || prefersReducedMotion) return null;

  // Determine ring size and styling based on variant
  let ringStyle = 'w-10 h-10 border border-champagne/80';
  let dotStyle = 'w-2 h-2 bg-champagne';

  if (cursorVariant === 'hover') {
    ringStyle = 'w-14 h-14 border border-champagne bg-champagne/10 scale-125';
    dotStyle = 'w-1 h-1 bg-champagne/40';
  } else if (cursorVariant === 'view' || cursorVariant === 'play' || cursorVariant === 'drag') {
    ringStyle = 'w-24 h-24 border border-champagne bg-ink/80 text-champagne backdrop-blur-sm';
    dotStyle = 'opacity-0 scale-0';
  } else if (cursorVariant === 'text') {
    ringStyle = 'w-1 h-6 border-none bg-champagne rounded-none';
    dotStyle = 'opacity-0';
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Lagging Ring / Lens Container */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center pointer-events-none transition-all duration-300 ease-out ${ringStyle}`}
      >
        {(cursorVariant === 'view' || cursorVariant === 'play' || cursorVariant === 'drag') && (
          <span
            ref={textRef}
            className="font-mono text-[11px] uppercase tracking-wide-mono font-medium text-champagne select-none"
          >
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Immediate Tracking Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-100 ${dotStyle}`}
      />
    </div>
  );
}
