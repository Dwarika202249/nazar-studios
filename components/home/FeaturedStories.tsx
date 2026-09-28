'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsTouch } from '@/hooks/useIsTouch';
import { stories } from '@/content/stories';

export function FeaturedStories() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(1);

  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  useGsapContext(
    triggerRef,
    () => {
      if (prefersReducedMotion || isTouch || !trackRef.current || !triggerRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth + 160;

      // Pinned Horizontal Scroll with GSAP ScrollTrigger
      const pinTween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update bottom progress bar width
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
            // Update active index indicator (1 to 6)
            const idx = Math.min(
              stories.length,
              Math.floor(self.progress * stories.length) + 1
            );
            setActiveStoryIdx(idx);
          },
        },
      });

      // Internal image counter-parallax
      const cardImages = track.querySelectorAll('.card-inner-img');
      cardImages.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: 1,
            },
          }
        );
      });
    },
    [prefersReducedMotion, isTouch]
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-velvet text-ivory overflow-hidden transition-colors"
    >
      <div ref={triggerRef} className="h-screen w-full flex flex-col justify-between p-6 sm:p-12 md:p-16">
        {/* Section Header */}
        <div className="flex items-end justify-between max-w-7xl w-full mx-auto pb-4 border-b border-smoke">
          <div>
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block mb-2">
              Portfolio · Stories
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light tracking-tight-display">
              Six weddings. Six ways of feeling.
            </h2>
          </div>

          <Link
            href="/stories"
            className="hidden sm:inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-wide-mono text-champagne hover:text-ivory transition-colors"
          >
            <span>All Stories</span>
            <span>→</span>
          </Link>
        </div>

        {/* Horizontal Cards Track */}
        <div className="relative w-full my-auto overflow-x-auto lg:overflow-visible no-scrollbar">
          <div
            ref={trackRef}
            className="flex items-center space-x-8 sm:space-x-12 py-4 pl-4 sm:pl-8 w-max will-change-transform"
          >
            {stories.map((story, i) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                data-cursor="view"
                className="group relative w-[280px] sm:w-[360px] md:w-[420px] aspect-[4/5] overflow-hidden border border-smoke/60 hover:border-champagne transition-all duration-500 shrink-0 bg-ink/70"
              >
                {/* Image Frame with Counter Parallax */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="card-inner-img absolute inset-0 -left-[10%] w-[120%] h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${story.cover.src})`,
                      backgroundColor: story.accent || '#16080C',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
                </div>

                {/* Card Meta Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between pointer-events-none">
                  {/* Top: Chapter index */}
                  <div className="flex items-center justify-between font-mono text-xs tracking-wide-mono text-champagne">
                    <span>0{i + 1}</span>
                    <span className="uppercase text-[11px] px-2.5 py-0.5 rounded-full border border-champagne/40 bg-ink/60">
                      {story.category}
                    </span>
                  </div>

                  {/* Bottom: Couple & Venue */}
                  <div className="space-y-2 transform-gpu transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-ivory font-light group-hover:text-champagne transition-colors">
                      {story.couple}
                    </h3>
                    <p className="font-manrope text-xs text-sand/80 line-clamp-2">
                      {story.intro}
                    </p>
                    <div className="pt-2 flex items-center space-x-2 font-mono text-[10px] text-champagne/80 tracking-widest uppercase">
                      <span>{story.venue}</span>
                      <span>·</span>
                      <span>{story.city}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Scroll Progress Bar & Counter */}
        <div className="max-w-7xl w-full mx-auto pt-6 flex items-center justify-between text-xs font-mono tracking-wide-mono text-sand/70">
          <div className="flex items-center space-x-4">
            <span className="text-champagne">
              0{activeStoryIdx} / 0{stories.length}
            </span>
            <div className="w-48 h-[1px] bg-smoke relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-champagne transition-all duration-100"
                style={{ width: `${(activeStoryIdx / stories.length) * 100}%` }}
              />
            </div>
          </div>

          <span className="hidden sm:inline text-sand/50">
            Drag or scroll horizontally
          </span>
        </div>
      </div>
    </section>
  );
}
