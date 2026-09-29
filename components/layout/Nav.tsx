'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { MenuOverlay } from '@/components/layout/MenuOverlay';
import { Logo } from '@/components/ui/Logo';

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
        className="fixed top-0 left-0 w-full z-40 px-6 sm:px-10 py-5 sm:py-6 flex items-center justify-between pointer-events-none transition-transform"
      >
        {/* Bespoke Logo Lockup (Left) */}
        <div className="pointer-events-auto mix-blend-difference">
          <Logo variant="full" />
        </div>

        {/* Action: Menu trigger (Right) */}
        <div className="pointer-events-auto flex items-center">
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="group flex items-center space-x-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-champagne/40 bg-ink/40 backdrop-blur-md text-ivory hover:border-champagne hover:bg-ink/70 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
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
