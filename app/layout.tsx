import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, DM_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { GrainOverlay } from '@/components/layout/GrainOverlay';
import { Cursor } from '@/components/layout/Cursor';
import { Preloader } from '@/components/layout/Preloader';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NAZAR — Luxury Wedding Films & Photography | Jaipur & Worldwide (Demo)',
  description:
    'Seen by the heart. Kept forever. Director-led luxury wedding films and photography documenting the feeling of your day.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${dmMono.variable} dark`}
      suppressHydrationWarning
    >
      <body
        className="bg-ink text-ivory antialiased selection:bg-champagne selection:text-ink min-h-screen relative flex flex-col justify-between overflow-x-hidden"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-champagne focus:text-ink focus:font-mono focus:text-xs focus:rounded-full"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <GrainOverlay />
          <Nav />
          <div id="main-content" className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
