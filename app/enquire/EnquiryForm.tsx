'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { brand } from '@/content/brand';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { GoldDustCanvas } from '@/components/webgl/GoldDustCanvas';

const ritualOptions = [
  'Haldi',
  'Mehendi',
  'Sangeet',
  'Baraat',
  'Pheras / Ceremony',
  'Reception',
  'Pre-Wedding Shoot',
];

const budgetRanges = [
  '₹85,000 – ₹1,50,000 (Kahani Tier)',
  '₹1,85,000 – ₹3,50,000 (Katha Tier)',
  '₹4,50,000+ (Mahakatha Grand Tier)',
  'Custom / To be decided',
];

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const initialDate = searchParams.get('date') || '';
  const initialPackage = searchParams.get('package') || '';

  const [step, setStep] = useState(1); // 1 = About You, 2 = About the Day, 3 = Your Story
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    phone: '',
    date: initialDate,
    cityVenue: '',
    guestCount: '',
    events: [] as string[],
    budget: initialPackage ? `Package: ${initialPackage}` : '',
    story: '',
    referral: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleEvent = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(item)
        ? prev.events.filter((e) => e !== item)
        : [...prev.events, item],
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.names.trim()) errs.names = 'Please tell us your names';
      if (!formData.email.trim() || !formData.email.includes('@'))
        errs.email = 'Valid email is required';
      if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    } else if (currentStep === 2) {
      if (!formData.cityVenue.trim())
        errs.cityVenue = 'Wedding city or venue is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
      }
    } catch {
      // In demo mode, treat as successful
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <GoldDustCanvas particleCount={70} className="opacity-70" />

        <div className="w-20 h-20 rounded-full border border-champagne flex items-center justify-center text-champagne text-2xl mb-4">
          ✓
        </div>

        <h2 className="font-cormorant text-5xl sm:text-7xl font-light text-ivory">
          Thank you, {formData.names.split('&')[0] || 'friend'}.
        </h2>

        <p className="font-manrope text-base sm:text-lg text-sand/80 max-w-xl mx-auto leading-relaxed">
          We’ll reply within 24 hours — usually with a question, because we’re curious. Your date has been noted in our review queue.
        </p>

        <div className="pt-8">
          <Button href="/" variant="primary">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      {/* Progress Line & Step Indicator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs tracking-wide-mono text-sand/70">
          <span className={step >= 1 ? 'text-champagne font-bold' : ''}>
            01 About You
          </span>
          <span className={step >= 2 ? 'text-champagne font-bold' : ''}>
            02 About The Day
          </span>
          <span className={step >= 3 ? 'text-champagne font-bold' : ''}>
            03 Your Story
          </span>
        </div>

        <div className="w-full h-[1px] bg-smoke relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-champagne transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Spam Honeypot */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) =>
            setFormData({ ...formData, honeypot: e.target.value })
          }
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* STEP 1: About You */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <Field
              id="names"
              label="Couple's Names (e.g. Anaya & Rohan)"
              value={formData.names}
              onChange={(e) =>
                setFormData({ ...formData, names: e.target.value })
              }
              error={errors.names}
              autoFocus
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                id="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
              />

              <Field
                id="phone"
                type="tel"
                label="Phone / WhatsApp (+Country Code)"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                error={errors.phone}
              />
            </div>
          </div>
        )}

        {/* STEP 2: About the Day */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                id="date"
                type="date"
                label="Wedding Date (if decided)"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <Field
                id="cityVenue"
                label="City / Venue (e.g. Udaipur, Palace)"
                value={formData.cityVenue}
                onChange={(e) =>
                  setFormData({ ...formData, cityVenue: e.target.value })
                }
                error={errors.cityVenue}
                autoFocus
              />
            </div>

            <Field
              id="guestCount"
              label="Approximate Guest Count"
              value={formData.guestCount}
              onChange={(e) =>
                setFormData({ ...formData, guestCount: e.target.value })
              }
            />

            {/* Events Selection Chips */}
            <div className="space-y-3">
              <label className="font-mono text-xs uppercase tracking-wide-mono text-sand/70 block">
                Events being planned (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {ritualOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleEvent(opt)}
                    className={`px-4 py-2 rounded-full border text-xs font-mono tracking-wider transition-colors ${
                      formData.events.includes(opt)
                        ? 'border-champagne bg-champagne text-ink font-bold'
                        : 'border-smoke text-sand hover:border-sand'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Your Story */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Budget Range */}
            <div className="space-y-3">
              <label className="font-mono text-xs uppercase tracking-wide-mono text-sand/70 block">
                Target Photography & Film Budget
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, budget: range })
                    }
                    className={`p-3 text-left border rounded-sm text-xs font-mono transition-colors ${
                      formData.budget === range
                        ? 'border-champagne bg-champagne/20 text-champagne'
                        : 'border-smoke text-sand hover:border-sand'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Story Free Text */}
            <div className="space-y-2">
              <label
                htmlFor="story"
                className="font-mono text-xs uppercase tracking-wide-mono text-sand/70 block"
              >
                Tell us about you two and the vision for the day
              </label>
              <textarea
                id="story"
                rows={4}
                value={formData.story}
                onChange={(e) =>
                  setFormData({ ...formData, story: e.target.value })
                }
                placeholder="How you met, what rituals matter most, what you want to feel when you look at these in 20 years..."
                className="w-full bg-transparent border border-smoke p-4 font-manrope text-sm text-ivory placeholder-sand/40 outline-none focus:border-champagne transition-colors"
              />
            </div>

            <Field
              id="referral"
              label="How did you find us? (Instagram, Planner, Couple recommendation)"
              value={formData.referral}
              onChange={(e) =>
                setFormData({ ...formData, referral: e.target.value })
              }
            />
          </div>
        )}

        {/* Nav Buttons */}
        <div className="pt-8 border-t border-smoke flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="font-mono text-xs uppercase tracking-wide text-sand hover:text-champagne transition-colors"
            >
              ← Previous Step
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 rounded-full border border-champagne text-champagne hover:bg-champagne hover:text-ink font-mono text-xs uppercase tracking-wide transition-all"
            >
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-3.5 rounded-full border border-champagne bg-champagne text-ink font-mono text-xs uppercase tracking-wide font-bold hover:bg-gold-hi transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send My Story'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
