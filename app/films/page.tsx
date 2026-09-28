'use client';

import React, { useState } from 'react';
import { films, Film } from '@/content/films';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';

export default function FilmsPage() {
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const { pauseScroll, resumeScroll } = useSmoothScroll();

  const openTheater = (film: Film) => {
    setActiveFilm(film);
    pauseScroll();
  };

  const closeTheater = () => {
    setActiveFilm(null);
    resumeScroll();
  };

  return (
    <>
      <main className="w-full min-h-screen bg-ink text-ivory pt-36 pb-32 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-6 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
              Cinematic Archive
            </span>

            <SplitReveal
              as="h1"
              className="font-cormorant text-5xl sm:text-7xl md:text-8xl font-light tracking-tight-display text-ivory"
            >
              Films
            </SplitReveal>

            <p className="font-cormorant italic text-2xl sm:text-3xl text-sand max-w-xl leading-relaxed">
              We shoot and finish every celebration like a feature documentary. Moving portraits, soundscapes, and sacred speech.
            </p>
          </div>

          {/* Stacked 16:9 Film Cards */}
          <div className="space-y-16 pt-4">
            {films.map((film, idx) => (
              <article
                key={film.id}
                onClick={() => openTheater(film)}
                data-cursor="play"
                className="group relative w-full aspect-video sm:aspect-[21/9] overflow-hidden border border-smoke/60 hover:border-champagne transition-all duration-500 cursor-pointer bg-ink/80 select-none"
              >
                {/* Film Poster Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${film.poster})`,
                    backgroundColor: '#16080C',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent transition-opacity group-hover:opacity-70" />

                {/* Top Corner Meta */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between font-mono text-xs tracking-wide-mono text-sand/80 pointer-events-none">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sindoor animate-pulse" />
                    <span>0{idx + 1} · {film.category}</span>
                  </div>

                  <span className="px-3 py-1 rounded-full border border-champagne/40 bg-ink/70 text-champagne">
                    {film.runtime}
                  </span>
                </div>

                {/* Center / Bottom Title Lockup */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                  <div className="space-y-2">
                    <h2 className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light text-ivory group-hover:text-champagne transition-colors">
                      {film.title}
                    </h2>
                    <p className="font-mono text-xs text-sand/70 tracking-wider">
                      {film.couple} · {film.location}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 text-champagne font-mono text-xs uppercase tracking-wide">
                    <span>Watch Film</span>
                    <span className="w-8 h-8 rounded-full border border-champagne flex items-center justify-center">
                      ▶
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Fullscreen Film Player Modal */}
      {activeFilm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] bg-ink/95 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-xl animate-in fade-in duration-300"
        >
          <button
            onClick={closeTheater}
            aria-label="Close Theater"
            className="absolute top-6 right-6 z-20 flex items-center space-x-2 text-sand hover:text-champagne font-mono text-xs uppercase tracking-wide-mono transition-colors"
          >
            <span>Close [esc]</span>
            <div className="w-8 h-8 rounded-full border border-smoke flex items-center justify-center">
              ✕
            </div>
          </button>

          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden border border-smoke shadow-2xl flex items-center justify-center">
            <video
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              poster={activeFilm.poster}
            >
              <source src={activeFilm.src} type="video/mp4" />
              Your browser does not support high-definition video playback.
            </video>
          </div>

          <div className="mt-4 font-mono text-xs text-sand/70 text-center tracking-wide">
            {activeFilm.title} — {activeFilm.couple} ({activeFilm.runtime})
          </div>
        </div>
      )}
    </>
  );
}
