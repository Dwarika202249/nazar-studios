'use client';

import React from 'react';
import { Hero } from '@/components/home/Hero';
import { Manifesto } from '@/components/home/Manifesto';
import { FeaturedStories } from '@/components/home/FeaturedStories';
import { Showreel } from '@/components/home/Showreel';
import { TheEdit } from '@/components/home/TheEdit';
import { MomentsList } from '@/components/home/MomentsList';
import { Numbers } from '@/components/home/Numbers';
import { Testimonials } from '@/components/home/Testimonials';
import { Process } from '@/components/home/Process';
import { InvestmentTeaser } from '@/components/home/InvestmentTeaser';
import { DateCTA } from '@/components/home/DateCTA';
import { PressMarquee } from '@/components/home/PressMarquee';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-ink">
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Manifesto Scrub Section */}
      <Manifesto />

      {/* 4. Featured Stories Horizontal Pinned Scroll */}
      <FeaturedStories />

      {/* 5. Fullscreen Showreel Section */}
      <Showreel />

      {/* 6. The Edit Before / After Frame Comparison */}
      <TheEdit />

      {/* 7. Signature Ritual Moments List */}
      <MomentsList />

      {/* 8. Numerical Legacy Highlights on Ivory Paper */}
      <Numbers />

      {/* 9. Couples Testimonials Cross-Fading */}
      <Testimonials />

      {/* 10. Four-Step Process Methodology */}
      <Process />

      {/* 11. Investment Teaser Tier Cards */}
      <InvestmentTeaser />

      {/* 12. Interactive Date Availability Checker */}
      <DateCTA />

      {/* 13. Media Citations Press Marquee */}
      <PressMarquee />
    </main>
  );
}
