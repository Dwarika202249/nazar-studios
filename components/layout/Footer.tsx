'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { brand } from '@/content/brand';
import { navItems, socialLinks } from '@/content/nav';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';
import { GoldDustCanvas } from '@/components/webgl/GoldDustCanvas';

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const [jaipurTime, setJaipurTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setJaipurTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-ink text-ivory pt-24 pb-12 px-6 sm:px-12 lg:px-20 border-t border-smoke overflow-hidden">
      {/* Background ambient gold dust */}
      <GoldDustCanvas particleCount={30} className="opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section: Inquiry invitation & quick contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-smoke">
          <div className="md:col-span-6 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne">
              Begin your story
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight-display">
              {brand.tagline[0]} <br />
              <span className="italic text-sand">{brand.tagline[1]}</span>
            </h2>
          </div>

          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <p className="font-manrope text-sm sm:text-base text-sand/80 max-w-md leading-relaxed">
              We shoot approximately 40 weddings a year, worldwide. Tell us the date, the city, and the feeling you are chasing.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/enquire"
                className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full border border-champagne text-champagne hover:bg-champagne hover:text-ink font-mono text-xs uppercase tracking-wide-mono transition-all duration-300"
              >
                <span>Check Availability</span>
                <span>→</span>
              </Link>

              <a
                href={brand.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full border border-smoke text-sand hover:text-ivory hover:border-champagne/40 font-mono text-xs uppercase tracking-wide-mono transition-colors"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Information Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-xs font-mono tracking-wide-mono">
          <div>
            <span className="text-champagne block mb-4 uppercase">Navigation</span>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sand/80 hover:text-champagne transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-champagne block mb-4 uppercase">Connect</span>
            <ul className="space-y-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sand/80 hover:text-champagne transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-champagne block mb-4 uppercase">Current Presence</span>
            <p className="text-sand/80 leading-relaxed">
              {brand.city} · Studio Studio <br />
              Shooting in: Udaipur <br />
              <span className="text-champagne mt-2 inline-block">
                Jaipur Time: {jaipurTime || '11:42 PM IST'}
              </span>
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="text-champagne block mb-4 uppercase">Status</span>
              <p className="text-sand/80">{brand.bookingStatus}</p>
            </div>

            <button
              onClick={() => scrollTo(0)}
              aria-label="Back to top"
              className="mt-6 md:mt-0 flex items-center space-x-2 text-sand/60 hover:text-champagne transition-colors w-fit"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>

        {/* Giant NAZAR Wordmark Curtain Reveal */}
        <div className="py-12 border-t border-smoke/60 text-center select-none overflow-hidden">
          <h1 className="font-cormorant text-[16vw] font-light leading-none tracking-tight text-smoke/30 hover:text-champagne/40 transition-colors duration-700 cursor-default">
            NAZAR
          </h1>
        </div>

        {/* Bottom Disclosures & Credits */}
        <div className="pt-6 border-t border-smoke/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-wide-mono text-sand/60">
          <div>
            Demo imagery is AI-generated. © {new Date().getFullYear()} NAZAR Studio (fictional).
          </div>
          <div>
            All traditions respected · Hybrid Film & Digital
          </div>
        </div>
      </div>
    </footer>
  );
}
