'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';

export function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timecode, setTimecode] = useState('00:00:12:08');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { pauseScroll, resumeScroll } = useSmoothScroll();

  // Timecode counter simulation
  useEffect(() => {
    let frame = 8;
    let sec = 12;
    const interval = setInterval(() => {
      frame++;
      if (frame > 24) {
        frame = 0;
        sec++;
      }
      const fStr = frame.toString().padStart(2, '0');
      const sStr = sec.toString().padStart(2, '0');
      setTimecode(`00:00:${sStr}:${fStr}`);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Handle ESC key to exit video
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPlaying) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const openModal = () => {
    setIsPlaying(true);
    pauseScroll();
  };

  const closeModal = () => {
    setIsPlaying(false);
    resumeScroll();
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <section className="relative w-full h-[85vh] min-h-[580px] bg-ink text-ivory flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden">
        {/* Background Film Poster with Zoom Hover */}
        <div
          onClick={openModal}
          data-cursor="play"
          className="absolute inset-0 bg-cover bg-center cursor-pointer group transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(11,9,8,0.3) 0%, rgba(11,9,8,0.85) 90%), url("/images/films/showreel-poster.webp")',
            backgroundColor: '#0D080A',
          }}
        >
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(243,236,224,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
        </div>

        {/* Top Header Row */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono tracking-wide-mono text-sand/80">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-sindoor animate-ping" />
            <span className="text-champagne uppercase">Showreel 2026</span>
          </div>

          <div className="tabular-nums text-champagne/90">
            {timecode}
          </div>
        </div>

        {/* Center Play Button & Title */}
        <div
          onClick={openModal}
          data-cursor="play"
          className="relative z-10 max-w-2xl mx-auto text-center space-y-4 cursor-pointer select-none"
        >
          <div className="w-20 h-20 mx-auto rounded-full border border-champagne/50 flex items-center justify-center bg-ink/50 backdrop-blur-sm group-hover:scale-110 group-hover:border-champagne transition-all duration-500">
            {/* Play Triangle Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-champagne fill-champagne translate-x-0.5"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light tracking-tight-display">
            The Cinema of Us
          </h2>

          <p className="font-mono text-xs uppercase tracking-wide-mono text-sand/70">
            Press play. Turn the lights down. · 3:12
          </p>
        </div>

        {/* Bottom Timecode & Technical Notes */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-wide-mono text-sand/60 border-t border-smoke/40 pt-4">
          <span>Kodak Portra + 4K Cinema Raw</span>
          <span>16:9 Aspect Ratio</span>
        </div>
      </section>

      {/* Fullscreen Video Modal Overlay */}
      {isPlaying && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] bg-ink/95 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-xl animate-in fade-in duration-300"
        >
          <button
            onClick={closeModal}
            aria-label="Close Showreel"
            className="absolute top-6 right-6 z-20 flex items-center space-x-2 text-sand hover:text-champagne font-mono text-xs uppercase tracking-wide-mono transition-colors"
          >
            <span>Close [esc]</span>
            <div className="w-8 h-8 rounded-full border border-smoke flex items-center justify-center">
              ✕
            </div>
          </button>

          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden border border-smoke/60 shadow-2xl flex items-center justify-center">
            {/* Video Player */}
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              poster="/images/films/showreel-poster.webp"
            >
              <source src="/video/showreel.mp4" type="video/mp4" />
              Your browser does not support high-definition video playback.
            </video>
          </div>

          <div className="mt-4 font-mono text-xs text-sand/60 tracking-wide text-center">
            NAZAR Showreel 2026 · Jaipur · Worldwide
          </div>
        </div>
      )}
    </>
  );
}
