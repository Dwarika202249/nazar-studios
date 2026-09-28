import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { EnquiryForm } from './EnquiryForm';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { brand } from '@/content/brand';

export const metadata: Metadata = {
  title: 'Enquire & Check Availability | NAZAR',
  description:
    'Begin your story with NAZAR. Check date availability and share your wedding details with our director-led studio.',
};

export default function EnquirePage() {
  return (
    <main className="w-full min-h-screen bg-ink text-ivory pt-36 pb-32 px-6 sm:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
            Jaipur · Worldwide · {brand.bookingStatus}
          </span>

          <SplitReveal
            as="h1"
            className="font-cormorant text-5xl sm:text-7xl md:text-8xl font-light tracking-tight-display text-ivory"
          >
            Begin your story.
          </SplitReveal>

          <p className="font-cormorant italic text-2xl sm:text-3xl text-sand max-w-xl mx-auto leading-relaxed">
            Tell us about the day. We’ll reply within 24 hours.
          </p>

          <div className="pt-2">
            <a
              href={brand.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-mono text-champagne hover:underline tracking-wide"
            >
              <span>Prefer WhatsApp direct message? Click here →</span>
            </a>
          </div>
        </div>

        {/* Guided 3-Step Inquiry Form with Suspense for URL params */}
        <Suspense fallback={<div className="text-center font-mono text-xs text-sand/60">Loading inquiry calendar...</div>}>
          <EnquiryForm />
        </Suspense>
      </div>
    </main>
  );
}
