'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { brand } from '@/content/brand';
import { MenuOverlay } from '@/components/layout/MenuOverlay';
import { SoundToggle } from '@/components/layout/SoundToggle';

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let isVisible = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only trigger hide/show after scrolling down past 120px
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current && isVisible) {
          // Scrolling down -> hide nav
          gsap.to(nav, { y: '-100%', duration: 0.4, ease: 'power2.out' });
          isVisible = false;
        } else if (currentScrollY < lastScrollY.current && !isVisible) {
          // Scrolling up -> show nav
          gsap.to(nav, { y: '0%', duration: 0.4, ease: 'power2.out' });
          isVisible = true;
        }
      } else {
        // At top -> always show
        gsap.to(nav, { y: '0%', duration: 0.3, ease: 'power2.out' });
        isVisible = true;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-40 px-6 sm:px-10 py-6 flex items-center justify-between pointer-events-none transition-transform"
      >
        {/* Logo / Brand Lockup (Left) */}
        <Link
          href="/"
          className="pointer-events-auto group flex items-baseline space-x-2 text-ivory mix-blend-difference"
        >
          <span className="font-cormorant text-2xl sm:text-3xl font-light tracking-tight-display">
            {brand.name}
          </span>
          <span className="font-devanagari text-xs sm:text-sm text-champagne">
            {brand.hindi}
          </span>
        </Link>

        {/* Actions (Right): Sound + Menu trigger */}
        <div className="pointer-events-auto flex items-center space-x-4 sm:space-x-8">
          <SoundToggle />

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="group flex items-center space-x-3 px-4 py-2 rounded-full border border-champagne/40 bg-ink/30 backdrop-blur-md text-ivory hover:border-champagne hover:bg-ink/60 transition-all duration-300"
          >
            <span className="font-mono text-[11px] uppercase tracking-wide-mono text-sand group-hover:text-champagne transition-colors">
              Menu
            </span>

            {/* Aperture 6-blade icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-champagne stroke-current fill-none stroke-[1.5] group-hover:rotate-45 transition-transform duration-500 ease-out"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2 L17 12 L12 22 L7 12 Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Full-screen Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
