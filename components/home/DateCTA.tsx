'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function DateCTA() {
  const [selectedDate, setSelectedDate] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [statusResult, setStatusResult] = useState<{
    status: 'open' | 'limited' | 'booked';
    message: string;
  } | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    if (!val) {
      setStatusResult(null);
      return;
    }

    setIsChecking(true);
    setStatusResult(null);

    // Simulate 1.2s aperture calculation
    setTimeout(() => {
      setIsChecking(false);
      // Deterministic calculation based on date day number
      const day = parseInt(val.split('-')[2] || '1', 10);
      if (day % 3 === 0) {
        setStatusResult({
          status: 'limited',
          message: 'Two slots left around that weekend. Let’s talk soon.',
        });
      } else if (day % 7 === 0) {
        setStatusResult({
          status: 'booked',
          message: 'That specific date is booked — but nearby dates are open.',
        });
      } else {
        setStatusResult({
          status: 'open',
          message: 'That date is open. Let’s keep it that way.',
        });
      }
    }, 1200);
  };

  return (
    <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-ink text-ivory border-t border-smoke overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <span className="font-mono text-xs uppercase tracking-wide-mono text-champagne block">
          Live Calendar · Availability Check
        </span>

        <h2 className="font-cormorant text-5xl sm:text-7xl md:text-8xl font-light tracking-tight-display text-ivory leading-none">
          Tell us the date.
        </h2>

        <p className="font-cormorant italic text-2xl sm:text-3xl text-sand max-w-xl mx-auto">
          We’ll tell you the truth.
        </p>

        {/* Date Input Card */}
        <div className="pt-6 max-w-md mx-auto">
          <div className="relative border border-champagne/40 bg-ink/70 backdrop-blur-md rounded-full p-2 flex items-center shadow-2xl">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              aria-label="Select wedding date"
              className="w-full bg-transparent px-6 py-3 font-mono text-sm text-ivory outline-none cursor-pointer [color-scheme:dark]"
            />
          </div>

          {/* Aperture Check Spinner */}
          {isChecking && (
            <div className="pt-6 flex items-center justify-center space-x-3 text-champagne font-mono text-xs animate-pulse">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none animate-spin">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <path d="M12 2 L17 12 L12 22 L7 12 Z" strokeWidth="1.5" />
              </svg>
              <span>Checking calendar database...</span>
            </div>
          )}

          {/* Result Card */}
          {statusResult && !isChecking && (
            <div className="mt-6 p-6 border rounded-sm bg-ink/90 backdrop-blur-md text-center space-y-4 animate-in fade-in zoom-in-95 duration-300 border-champagne/60">
              <div className="flex items-center justify-center space-x-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    statusResult.status === 'open'
                      ? 'bg-champagne animate-ping'
                      : statusResult.status === 'limited'
                      ? 'bg-amber-400'
                      : 'bg-sindoor'
                  }`}
                />
                <span className="font-mono text-xs uppercase tracking-wide text-champagne">
                  Status: {statusResult.status.toUpperCase()}
                </span>
              </div>

              <p className="font-cormorant text-2xl font-light text-ivory">
                {statusResult.message}
              </p>

              <div className="pt-2">
                <Link
                  href={`/enquire?date=${selectedDate}`}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-champagne bg-champagne text-ink font-mono text-xs uppercase tracking-wider hover:bg-gold-hi transition-colors"
                >
                  <span>Begin Inquiry for this Date</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
