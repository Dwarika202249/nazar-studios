'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Story, Img } from '@/content/stories';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { WordScrub } from '@/components/motion/WordScrub';
import { Lightbox } from '@/components/stories/Lightbox';
import { LineDraw } from '@/components/motion/LineDraw';

export function StoryDetailClient({
  story,
  nextStory,
}: {
  story: Story;
  nextStory: Story;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Collect all images in this story for continuous lightbox viewing
  const allImages: Img[] = [
    story.cover,
    ...story.chapters.flatMap((c) => [c.lead, ...c.images]),
  ];

  const openLightboxAt = (img: Img) => {
    const idx = allImages.findIndex((item) => item.src === img.src);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <main className="w-full bg-ink text-ivory min-h-screen">
      {/* 1. Fullscreen Cover Hero */}
      <section className="relative w-full h-screen min-h-[640px] flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden">
        {/* Background Cover Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${story.cover.src})`,
            backgroundColor: story.accent || '#12080A',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>

        {/* Top Meta Tag */}
        <div className="relative z-10 pt-20 flex items-center justify-between font-mono text-xs tracking-wide-mono text-sand/80">
          <Link
            href="/stories"
            className="hover:text-champagne transition-colors flex items-center space-x-2"
          >
            <span>←</span>
            <span>All Stories</span>
          </Link>

          <span className="uppercase px-3 py-1 rounded-full border border-champagne/40 bg-ink/60 text-champagne">
            {story.category}
          </span>
        </div>

        {/* Center / Bottom Couple Names & Venue */}
        <div className="relative z-10 max-w-5xl space-y-4">
          <SplitReveal
            as="h1"
            className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight-display text-ivory"
          >
            {story.couple}
          </SplitReveal>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm text-sand/80 tracking-wide-mono">
            <span>{story.venue}</span>
            <span>·</span>
            <span>{story.city}</span>
            <span>·</span>
            <span className="text-champagne">{story.date}</span>
          </div>
        </div>
      </section>

      {/* 2. Intro Paragraph */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 md:px-24 max-w-4xl mx-auto text-center space-y-6">
        <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
          The Wedding Chronicle
        </span>
        <p className="font-cormorant italic text-3xl sm:text-4xl md:text-5xl font-light text-sand leading-relaxed">
          “{story.intro}”
        </p>
      </section>

      {/* 3. Scrollytelling Chapters */}
      <div className="space-y-32 md:space-y-48">
        {story.chapters.map((chapter, cIdx) => (
          <section
            key={chapter.key}
            className="py-20 px-6 sm:px-12 lg:px-20 transition-colors duration-700"
            style={{
              backgroundColor: chapter.tint || '#0B0908',
            }}
          >
            <div className="max-w-7xl mx-auto space-y-16">
              {/* Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-smoke pb-6 gap-4">
                <div className="flex items-baseline space-x-6">
                  <span className="font-mono text-xs sm:text-sm text-champagne">
                    Chapter 0{cIdx + 1}
                  </span>
                  <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-ivory">
                    {chapter.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-devanagari text-xl sm:text-2xl text-sand/60">
                    {chapter.hindi}
                  </span>
                  <span className="font-mono text-xs text-sand/60 italic">
                    {chapter.caption}
                  </span>
                </div>
              </div>

              {/* Chapter Images Editorial Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Large Lead Image (7 cols) */}
                <div
                  onClick={() => openLightboxAt(chapter.lead)}
                  data-cursor="view"
                  className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden border border-smoke hover:border-champagne transition-all duration-500 cursor-pointer group bg-ink"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${chapter.lead.src})`,
                      backgroundColor: '#1C0A10',
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 font-mono text-[11px] text-sand/80 bg-ink/70 px-3 py-1 rounded-sm w-fit backdrop-blur-sm">
                    {chapter.lead.alt}
                  </div>
                </div>

                {/* Supporting Images (5 cols) */}
                <div className="lg:col-span-5 flex flex-col space-y-8">
                  {chapter.images.map((subImg, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => openLightboxAt(subImg)}
                      data-cursor="view"
                      className="relative aspect-[3/2] sm:aspect-[4/3] overflow-hidden border border-smoke/60 hover:border-champagne transition-all duration-500 cursor-pointer group bg-ink"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${subImg.src})`,
                          backgroundColor: '#140E0A',
                        }}
                      />
                      <div className="absolute bottom-3 left-3 font-mono text-[10px] text-sand/80 bg-ink/70 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                        {subImg.alt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 4. Full-Width Pull Quote */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 md:px-24 bg-ink border-t border-smoke">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            A Note from {story.couple}
          </span>

          <WordScrub
            as="blockquote"
            className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light italic leading-snug text-ivory"
          >
            {story.quote.text}
          </WordScrub>

          <p className="font-mono text-xs uppercase tracking-wide-mono text-champagne">
            — {story.quote.by}
          </p>

          <LineDraw className="max-w-xs mx-auto mt-8" />
        </div>
      </section>

      {/* 5. Editorial Film Block (if present) */}
      {story.film && (
        <section className="py-24 px-6 sm:px-12 lg:px-20 border-t border-smoke bg-velvet/40">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-smoke pb-4 font-mono text-xs tracking-wide-mono text-sand/80">
              <span className="text-champagne uppercase">Featured Cinema</span>
              <span>Runtime: {story.film.runtime}</span>
            </div>

            <div
              data-cursor="play"
              className="relative aspect-video w-full overflow-hidden border border-champagne/40 bg-ink cursor-pointer group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${story.film.poster.src})`,
                  backgroundColor: '#0F090B',
                }}
              />
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors" />

              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full border border-champagne bg-ink/70 flex items-center justify-center text-champagne group-hover:scale-110 transition-transform">
                  ▶
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-ivory">
                  Watch {story.couple}’s Film
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Editorial Credits Table */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 border-t border-smoke bg-ink">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            Creative & Vendor Credits
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs tracking-wide-mono border-t border-smoke/60 pt-6">
            {story.credits.map((credit, i) => (
              <div key={i} className="space-y-1">
                <span className="text-sand/50 uppercase block text-[10px]">
                  {credit.role}
                </span>
                <span className="text-ivory font-medium block">
                  {credit.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Next Story Teaser */}
      <section className="relative py-28 px-6 sm:px-12 lg:px-20 border-t border-smoke overflow-hidden bg-forest/30 group">
        <Link
          href={`/stories/${nextStory.slug}`}
          data-cursor="view"
          className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer"
        >
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
              Next Chronicle →
            </span>
            <h3 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-light text-ivory group-hover:text-champagne transition-colors">
              {nextStory.couple}
            </h3>
            <p className="font-mono text-xs text-sand/70">
              {nextStory.venue} · {nextStory.city}
            </p>
          </div>

          <div className="w-36 h-48 border border-smoke group-hover:border-champagne transition-colors overflow-hidden shrink-0 bg-ink relative">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${nextStory.cover.src})`,
                backgroundColor: nextStory.accent || '#1E1410',
              }}
            />
          </div>
        </Link>
      </section>

      {/* Shared Lightbox Component */}
      <Lightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % allImages.length)
        }
      />
    </main>
  );
}
