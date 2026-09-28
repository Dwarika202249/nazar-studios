'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { stories, Category } from '@/content/stories';
import { Chip } from '@/components/ui/Chip';
import { SplitReveal } from '@/components/motion/SplitReveal';

const categories: ('All' | Category)[] = [
  'All',
  'Palace',
  'Beach',
  'Forest',
  'Haveli',
  'Fusion',
];

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');

  const filteredStories =
    selectedCategory === 'All'
      ? stories
      : stories.filter((s) => s.category === selectedCategory);

  return (
    <main className="w-full min-h-screen bg-ink text-ivory pt-36 pb-32 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="space-y-6 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            Archive · 2025–2026
          </span>

          <SplitReveal
            as="h1"
            className="font-cormorant text-5xl sm:text-7xl md:text-8xl font-light tracking-tight-display text-ivory"
          >
            Stories
          </SplitReveal>

          <p className="font-cormorant italic text-2xl sm:text-3xl text-sand max-w-2xl leading-relaxed">
            Six weddings. Six ways of feeling. Each documented as a singular, unrepeatable cinema narrative.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-b border-smoke pb-8">
          <span className="font-mono text-xs text-sand/60 mr-2 uppercase tracking-wide">
            Filter:
          </span>
          {categories.map((cat) => (
            <Chip
              key={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Chip>
          ))}
        </div>

        {/* Contact Sheet Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 pt-4">
          {filteredStories.map((story, idx) => {
            // Asymmetric layout spans (7 cols and 5 cols alternating)
            const isWide = idx % 3 === 0;
            const colSpan = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <article
                key={story.slug}
                className={`${colSpan} group relative flex flex-col justify-between`}
              >
                <Link
                  href={`/stories/${story.slug}`}
                  data-cursor="view"
                  className="block relative w-full aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden border border-smoke/60 hover:border-champagne transition-all duration-500 bg-forest/30"
                >
                  {/* Image Container with Hover Scale */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${story.cover.src})`,
                      backgroundColor: story.accent || '#1A0C08',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-300 group-hover:opacity-75" />

                  {/* Corner Chapter Badge */}
                  <div className="absolute top-4 left-4 font-mono text-xs text-champagne tracking-wide-mono bg-ink/70 px-3 py-1 rounded-full border border-champagne/30 backdrop-blur-sm">
                    Story 0{idx + 1}
                  </div>

                  <div className="absolute top-4 right-4 font-mono text-[10px] uppercase text-sand/80 bg-ink/70 px-3 py-1 rounded-full border border-smoke backdrop-blur-sm">
                    {story.category}
                  </div>

                  {/* Overlay Meta Details */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-2 pointer-events-none">
                    <h2 className="font-cormorant text-3xl sm:text-4xl text-ivory font-light group-hover:text-champagne transition-colors">
                      {story.couple}
                    </h2>
                    <p className="font-manrope text-xs text-sand/80 line-clamp-2">
                      {story.intro}
                    </p>
                  </div>
                </Link>

                {/* Bottom Caption Row */}
                <div className="pt-4 flex items-center justify-between text-xs font-mono tracking-wide-mono text-sand/70">
                  <span>{story.venue}</span>
                  <span className="text-champagne">{story.date}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
