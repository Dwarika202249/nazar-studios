'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed noise tile dimension
    const size = 128;
    canvas.width = size;
    canvas.height = size;

    let animationFrameId: number;
    let lastTime = 0;
    const interval = 1000 / 8; // 8fps film cadence

    const generateNoise = () => {
      const imgData = ctx.createImageData(size, size);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        // Random grayscale noise with alpha
        const shade = (Math.random() * 255) | 0;
        buffer32[i] = (255 << 24) | (shade << 16) | (shade << 8) | shade;
      }

      ctx.putImageData(imgData, 0, 0);
    };

    // Initial noise generate
    generateNoise();

    // If reduced motion, keep static noise
    if (prefersReducedMotion) return;

    const loop = (time: number) => {
      if (time - lastTime >= interval) {
        lastTime = time;
        generateNoise();
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-repeat opacity-[0.06] mix-blend-overlay"
        style={{
          imageRendering: 'pixelated',
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}
