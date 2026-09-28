'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsTouch } from '@/hooks/useIsTouch';
import { brand } from '@/content/brand';
import { GoldDustCanvas } from '@/components/webgl/GoldDustCanvas';
import { SplitReveal } from '@/components/motion/SplitReveal';

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  const [jaipurTime, setJaipurTime] = useState<string>('');
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  // Live Jaipur clock
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());
      setJaipurTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGsapContext(
    containerRef,
    () => {
      if (prefersReducedMotion) return;

      // 1. Mouse parallax for subtle depth on desktop
      if (!isTouch && containerRef.current) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPercent = (clientX / window.innerWidth - 0.5) * 24;
          const yPercent = (clientY / window.innerHeight - 0.5) * 24;

          if (bgImageRef.current) {
            gsap.to(bgImageRef.current, {
              x: xPercent * 0.5,
              y: yPercent * 0.5,
              duration: 1.2,
              ease: 'power2.out',
            });
          }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }

      // 2. Scroll scrub: background scales up and darkens, wordmark spreads out
      if (containerRef.current && bgImageRef.current && wordmarkRef.current) {
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        scrubTl.to(
          bgImageRef.current,
          {
            scale: 1.15,
            filter: 'brightness(0.35)',
            ease: 'none',
          },
          0
        );

        scrubTl.to(
          wordmarkRef.current,
          {
            letterSpacing: '0.25em',
            opacity: 0.1,
            y: 80,
            ease: 'none',
          },
          0
        );

        if (scrollCueRef.current) {
          scrubTl.to(
            scrollCueRef.current,
            {
              opacity: 0,
              y: 20,
              ease: 'none',
            },
            0
          );
        }
      }
    },
    [prefersReducedMotion, isTouch]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden bg-ink select-none"
    >
      {/* Background Cinematic Atmosphere */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 40%, rgba(42, 12, 20, 0.45) 0%, rgba(11, 9, 8, 0.85) 75%), url("/images/hero/hero-stills-01.webp")',
          backgroundColor: '#0B0908',
        }}
      />

      {/* Radial Vignette & Warm Light Leak */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,9,8,0.85)_100%)] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-champagne/10 rounded-full blur-3xl pointer-events-none mix-blend-screen" />

      {/* Floating Gold Dust Particulate Engine */}
      <GoldDustCanvas particleCount={50} className="opacity-50" />

      {/* Top Meta Bar */}
      <div className="relative z-10 pt-16 flex items-center justify-between text-xs font-mono tracking-wide-mono text-sand/80">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sindoor animate-pulse" />
          <span>Jaipur · {jaipurTime || '11:42 PM'}</span>
        </div>

        <div className="hidden sm:block text-center text-champagne/90">
          {brand.descriptor}
        </div>

        <div className="text-right">
          <span>{brand.bookingStatus}</span>
        </div>
      </div>

      {/* Center Emotional Headline */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center space-y-4 pt-12">
        <div className="overflow-hidden">
          <SplitReveal
            as="h1"
            className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight-display text-ivory leading-[1.08]"
          >
            Seen by the heart.
          </SplitReveal>
        </div>

        <div className="overflow-hidden">
          <SplitReveal
            as="p"
            delay={0.25}
            className="font-cormorant italic text-3xl sm:text-5xl md:text-6xl text-champagne leading-[1.1]"
          >
            Kept forever.
          </SplitReveal>
        </div>

        <p className="font-manrope text-xs sm:text-sm text-sand/70 uppercase tracking-widest pt-4">
          Director-led luxury wedding films & photography · Worldwide
        </p>
      </div>

      {/* Bottom Area: Massive Wordmark & Scroll Indicator */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Enormous NAZAR Wordmark */}
        <h2
          ref={wordmarkRef}
          className="font-cormorant text-[20vw] leading-none font-light tracking-tighter text-ivory mix-blend-difference select-none pointer-events-none transition-all duration-300"
        >
          NAZAR
        </h2>

        {/* Floating Scroll Cue */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-4 flex flex-col items-center space-y-2 pointer-events-none text-sand/60"
        >
          {/* Rotating Aperture Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-champagne stroke-current fill-none stroke-[1.25] animate-spin [animation-duration:12s]"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2 L17 12 L12 22 L7 12 Z" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
