'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { navItems, socialLinks } from '@/content/nav';
import { brand } from '@/content/brand';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linksContainerRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const pathname = usePathname();
  const { pauseScroll, resumeScroll } = useSmoothScroll();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Pause / resume scroll
  useEffect(() => {
    if (isOpen) {
      pauseScroll();
    } else {
      resumeScroll();
    }
  }, [isOpen, pauseScroll, resumeScroll]);

  // Animation timeline for open/close
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isOpen) {
      gsap.to(container, {
        clipPath: 'circle(150% at calc(100% - 4rem) 3rem)',
        duration: 0.9,
        ease: 'velvet',
      });

      if (linksContainerRef.current) {
        const linkItems = linksContainerRef.current.querySelectorAll('.menu-link-item');
        gsap.fromTo(
          linkItems,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: 'silk',
            delay: 0.25,
          }
        );
      }
    } else {
      gsap.to(container, {
        clipPath: 'circle(0% at calc(100% - 4rem) 3rem)',
        duration: 0.7,
        ease: 'velvet',
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className={`fixed inset-0 z-50 bg-ink text-ivory flex flex-col justify-between p-8 md:p-16 lg:p-24 transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ clipPath: 'circle(0% at calc(100% - 4rem) 3rem)' }}
    >
      {/* Top Bar with Close button */}
      <div className="flex items-center justify-between w-full border-b border-smoke pb-6">
        <div className="flex items-center space-x-3">
          <span className="font-cormorant text-2xl tracking-tight-display font-light">
            NAZAR
          </span>
          <span className="font-devanagari text-champagne text-sm">
            {brand.hindi}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Menu"
          className="group flex items-center space-x-3 text-champagne hover:text-ivory transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-wide-mono">
            Close [esc]
          </span>
          <div className="w-8 h-8 rounded-full border border-champagne/40 flex items-center justify-center group-hover:border-champagne transition-colors">
            <span className="text-sm leading-none">✕</span>
          </div>
        </button>
      </div>

      {/* Main Content: Giant Links on Left, Interactive Image Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
        {/* Navigation Links (7 cols) */}
        <div ref={linksContainerRef} className="lg:col-span-7 flex flex-col space-y-4 md:space-y-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <div
                key={item.href}
                className="menu-link-item group flex items-baseline space-x-4 md:space-x-8"
                onMouseEnter={() => setActivePreview(item.previewImage || null)}
                onMouseLeave={() => setActivePreview(null)}
              >
                <span className="font-mono text-xs md:text-sm text-champagne/60 group-hover:text-champagne transition-colors">
                  {item.index}
                </span>

                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight-display transition-all duration-300 ${
                    isActive
                      ? 'text-champagne italic'
                      : 'text-ivory group-hover:translate-x-3 group-hover:text-champagne'
                  }`}
                >
                  {item.label}
                </Link>

                {item.hindi && (
                  <span className="hidden sm:inline font-devanagari text-sm md:text-lg text-sand/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.hindi}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Image Preview (5 cols, desktop only) */}
        <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
          <div
            ref={previewRef}
            className="w-72 h-96 relative border border-champagne/30 overflow-hidden bg-forest/40 transition-all duration-500 ease-out"
          >
            {activePreview ? (
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
                style={{ backgroundImage: `url(${activePreview})` }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="font-cormorant text-2xl italic text-sand/60">
                  {brand.tagline[0]}
                </span>
                <span className="font-cormorant text-2xl italic text-champagne mt-1">
                  {brand.tagline[1]}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Footer Meta Row */}
      <div className="border-t border-smoke pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono tracking-wide-mono text-sand/70">
        <div>
          <span className="text-champagne block mb-1">Location</span>
          {brand.city} · Worldwide
        </div>

        <div>
          <span className="text-champagne block mb-1">Availability</span>
          {brand.bookingStatus}
        </div>

        <div className="flex space-x-6 md:justify-end">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-champagne transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
