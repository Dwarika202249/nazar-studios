'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const [blurAmount, setBlurAmount] = useState(12);

  const handleMouseMove = (e: React.MouseEvent) => {
    const distFromCenter = Math.hypot(
      e.clientX - window.innerWidth / 2,
      e.clientY - window.innerHeight / 2
    );
    const maxDist = window.innerWidth / 2;
    const newBlur = Math.max(0, Math.min(16, (distFromCenter / maxDist) * 16));
    setBlurAmount(newBlur);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[600px] bg-ink text-ivory flex flex-col items-center justify-center p-6 text-center overflow-hidden select-none"
    >
      {/* Background Cinematic Image that sharpens with cursor physics */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 ease-out"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(11,9,8,0.5) 0%, rgba(11,9,8,0.95) 90%), url("/images/stories/anaya-rohan/cover.webp")',
          filter: `blur(${blurAmount}px)`,
          transform: 'scale(1.05)',
        }}
      />

      <div className="relative z-10 max-w-xl space-y-6">
        <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
          Error 404 · Focal Drift
        </span>

        <h1 className="font-cormorant text-6xl sm:text-8xl font-light tracking-tight-display text-ivory">
          Out of focus.
        </h1>

        <p className="font-cormorant italic text-2xl text-sand">
          This page wandered off mid-frame. Move your cursor to adjust the lens.
        </p>

        <div className="pt-6">
          <Button href="/" variant="primary">
            Bring Me Back into Focus
          </Button>
        </div>
      </div>
    </main>
  );
}
