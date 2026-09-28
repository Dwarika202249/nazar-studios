'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
  cursor?: 'view' | 'play' | 'drag';
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  imageClassName = '',
  aspectRatio = '4/5',
  cursor = 'view',
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(
    containerRef,
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Wrapper clip reveal
      tl.fromTo(
        containerRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'silk',
        }
      );

      // Inner image scale settle
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'linen',
          },
          0
        );
      }
    },
    [prefersReducedMotion]
  );

  return (
    <div
      ref={containerRef}
      data-cursor={cursor}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: fill ? undefined : aspectRatio,
        clipPath: prefersReducedMotion ? undefined : 'inset(100% 0% 0% 0%)',
      }}
    >
      <div className="w-full h-full relative overflow-hidden">
        {fill ? (
          <Image
            ref={imageRef}
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transform-gpu ${imageClassName}`}
          />
        ) : (
          <Image
            ref={imageRef}
            src={src}
            alt={alt}
            width={width || 1200}
            height={height || 1500}
            priority={priority}
            className={`w-full h-full object-cover transform-gpu ${imageClassName}`}
          />
        )}
      </div>
    </div>
  );
}
