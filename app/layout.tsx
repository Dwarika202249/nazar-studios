import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, DM_Mono } from 'next/font/google';
import './globals.css';

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
  description: 'Seen by the heart. Kept forever. Director-led luxury wedding films and photography documenting the feeling of your day.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${dmMono.variable} dark`}>
      <body className="bg-ink text-ivory antialiased selection:bg-champagne selection:text-ink min-h-screen">
        {children}
      </body>
    </html>
  );
}
