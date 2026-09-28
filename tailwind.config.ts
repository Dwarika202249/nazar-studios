import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0908',
          70: 'rgba(11, 9, 8, 0.7)',
        },
        velvet: '#2A0C14',
        forest: '#16211B',
        ivory: '#F3ECE0',
        sand: '#D9CDB8',
        champagne: '#C9A46A',
        'gold-hi': '#E8CB93',
        sindoor: '#B3261E',
        smoke: 'rgba(243, 236, 224, 0.12)',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        manrope: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'SFMono-Regular', 'Menlo', 'monospace'],
        devanagari: ['var(--font-devanagari)', 'serif'],
      },
      fontSize: {
        'fluid-hero': 'clamp(3.5rem, 11vw, 12rem)',
        'fluid-h1': 'clamp(2.6rem, 6.5vw, 6.5rem)',
        'fluid-h2': 'clamp(2rem, 4vw, 4rem)',
        'fluid-body': 'clamp(0.95rem, 1.05vw, 1.1rem)',
        'fluid-label': '0.72rem',
      },
      letterSpacing: {
        'tight-display': '-0.02em',
        'wide-mono': '0.18em',
      },
      lineHeight: {
        generous: '1.7',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        velvet: 'cubic-bezier(0.65, 0, 0.35, 1)',
        linen: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
