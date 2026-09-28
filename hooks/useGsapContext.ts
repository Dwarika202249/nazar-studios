'use client';

import { useLayoutEffect, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

// In Next.js SSR, useLayoutEffect warns, so fallback to useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useGsapContext(
  scope: React.RefObject<Element | null> | React.MutableRefObject<Element | null>,
  contextFn: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const isMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    if (!scope.current) return;

    // Check if motion is globally disabled via env
    if (process.env.NEXT_PUBLIC_DISABLE_MOTION === '1') return;

    const ctx = gsap.context((self) => {
      contextFn(self);
    }, scope);

    return () => {
      ctx.revert();
    };
  }, deps);
}
