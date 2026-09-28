'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Img } from '@/content/stories';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';

interface LightboxProps {
  images: Img[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const { pauseScroll, resumeScroll } = useSmoothScroll();
  const currentImg = images[currentIndex];

  useEffect(() => {
    if (isOpen) {
      pauseScroll();
    } else {
      resumeScroll();
    }
  }, [isOpen, pauseScroll, resumeScroll]);

  // Keyboard controls: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentImg) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      className="fixed inset-0 z-[110] bg-ink/95 flex flex-col justify-between p-6 sm:p-10 backdrop-blur-xl animate-in fade-in duration-300 select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-smoke pb-4">
        <span className="font-mono text-xs text-champagne tracking-wide-mono">
          {currentIndex + 1} / {images.length}
        </span>

        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="flex items-center space-x-2 text-sand hover:text-champagne font-mono text-xs uppercase tracking-wide-mono transition-colors"
        >
          <span>Close [esc]</span>
          <div className="w-8 h-8 rounded-full border border-smoke flex items-center justify-center">
            ✕
          </div>
        </button>
      </div>

      {/* Main Image Viewport with Nav Arrows */}
      <div className="relative w-full max-w-6xl mx-auto h-[70vh] flex items-center justify-center">
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full border border-smoke/80 bg-ink/60 text-champagne flex items-center justify-center hover:border-champagne hover:scale-110 transition-all font-mono text-lg"
          >
            ←
          </button>
        )}

        {/* Center Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={currentImg.src}
            alt={currentImg.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full border border-smoke/80 bg-ink/60 text-champagne flex items-center justify-center hover:border-champagne hover:scale-110 transition-all font-mono text-lg"
          >
            →
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <div className="text-center font-mono text-xs text-sand/80 tracking-wide border-t border-smoke/40 pt-4">
        {currentImg.alt}
      </div>
    </div>
  );
}
