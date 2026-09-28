'use client';

import React, { useState, useEffect, useRef } from 'react';

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    // Check local storage preference
    const saved = localStorage.getItem('nazar_sound_enabled');
    if (saved === 'true') {
      // Audio cannot autoplay before user interaction per browser policy
      // So keep state false until user interaction or toggle
    }
  }, []);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3); // Warm subtle ambient
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Lowpass Filter for candlelit warm tone
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
        filter.connect(masterGain);

        // Tanpura / meditative drone frequencies (A2 = 110Hz, E3 = 164.8Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(108, ctx.currentTime);
        osc1.connect(filter);
        osc1.start();
        osc1Ref.current = osc1;

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(162, ctx.currentTime);
        osc2.connect(filter);
        osc2.start();
        osc2Ref.current = osc2;

        setIsPlaying(true);
        localStorage.setItem('nazar_sound_enabled', 'true');
      } catch {
        // Fallback if Web Audio is unsupported
        setIsPlaying(true);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 1
        );
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
        }, 1100);
      }
      setIsPlaying(false);
      localStorage.setItem('nazar_sound_enabled', 'false');
    }
  };

  return (
    <button
      onClick={toggleSound}
      aria-label="Toggle Ambient Audio"
      aria-pressed={isPlaying}
      className="group flex items-center space-x-2 text-sand/80 hover:text-champagne transition-colors"
    >
      {/* Sound wave icon animation */}
      <span className="flex items-center space-x-0.5 h-3">
        <span
          className={`w-0.5 bg-champagne rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3 animate-pulse' : 'h-1 opacity-40'
          }`}
        />
        <span
          className={`w-0.5 bg-champagne rounded-full transition-all duration-300 ${
            isPlaying ? 'h-2 animate-pulse delay-75' : 'h-1 opacity-40'
          }`}
        />
        <span
          className={`w-0.5 bg-champagne rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3.5 animate-pulse delay-150' : 'h-1 opacity-40'
          }`}
        />
      </span>

      <span className="font-mono text-[11px] uppercase tracking-wide-mono">
        {isPlaying ? 'Sound [On]' : 'Sound [Off]'}
      </span>
    </button>
  );
}
