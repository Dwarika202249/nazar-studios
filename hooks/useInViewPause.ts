'use client';

import { useState, useEffect, RefObject } from 'react';

export function useInViewPause(
  ref: RefObject<HTMLElement | null>,
  threshold = 0.1
): boolean {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isInView;
}
