import Lenis from 'lenis';

export function createLenisInstance(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Parameters tuned according to docs/05-animation-motion-spec.md
  return new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
    infinite: false,
  });
}
