import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';

// Only register plugins in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, Flip, Observer);

  // Define global eases from docs/05-animation-motion-spec.md
  CustomEase.create('silk', '0.22, 1, 0.36, 1'); // default reveal (expo-out like)
  CustomEase.create('velvet', '0.65, 0, 0.35, 1'); // in-out for transitions
  CustomEase.create('linen', '0.16, 1, 0.3, 1'); // long settle for images
}

export { gsap, ScrollTrigger, CustomEase, Flip, Observer };
export default gsap;
