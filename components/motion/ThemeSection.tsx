'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type ThemeMode = 'ink' | 'velvet' | 'forest' | 'ivory';

const themeColors: Record<ThemeMode, { bg: string; text: string }> = {
  ink: { bg: '#0B0908', text: '#F3ECE0' },
  velvet: { bg: '#2A0C14', text: '#F3ECE0' },
  forest: { bg: '#16211B', text: '#F3ECE0' },
  ivory: { bg: '#F3ECE0', text: '#0B0908' },
};

interface ThemeSectionProps {
  children: React.ReactNode;
  theme?: ThemeMode;
  className?: string;
  id?: string;
}

export function ThemeSection({
  children,
  theme = 'ink',
  className = '',
  id,
}: ThemeSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(
    sectionRef,
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const targetTheme = themeColors[theme];

      // Interpolate background color smoothly on scroll enter
      gsap.to(sectionRef.current, {
        backgroundColor: targetTheme.bg,
        color: targetTheme.text,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 0.5,
        },
      });
    },
    [theme, prefersReducedMotion]
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      data-theme={theme}
      className={`relative transition-colors duration-500 ${className}`}
      style={{
        backgroundColor: themeColors[theme].bg,
        color: themeColors[theme].text,
      }}
    >
      {children}
    </section>
  );
}
