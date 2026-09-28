import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# NAZAR — Luxury Wedding Films & Photography (Demo Flagship)
> "Seen by the heart. Kept forever." (जो दिल ने देखा, वो हमेशा रहा।)

## Brand Positioning
NAZAR is a luxury, director-led wedding film and photography studio based in Jaipur, Rajasthan, documenting celebrations worldwide. We specialize in emotional, cinematic, and candid legacy storytelling for families.

## Foundational Philosophy: "The Three Quiet Rules"
1. Be present, not everywhere.
2. Direct less, notice more.
3. Finish like a film.

## Service Offerings & Pricing Tiers
- Kahani (Story): From ₹85,000 — 1 Lead photographer, up to 8 hours, 350+ photographs, 3-min highlight film.
- Katha (Saga): From ₹1,85,000 — Photographer + cinematographer, up to 2 days, 700+ photos, 8-min cinematic film, drone, fine-art album.
- Mahakatha (Epic): From ₹4,50,000 — Full crew of 5, multi-day destination coverage, feature film 15–20 min, luxury albums.

## Primary Destinations
Jaipur, Udaipur, Jodhpur, Kerala backwaters, Goa, Uttarakhand Himalayas, Bali, Dubai, Lake Como, and worldwide.

## Studio Details
- Founders: Aarav Mehra (Director/Cinematographer) & Ishita Rao (Lead Photographer)
- Studio Location: Jaipur, Rajasthan, India
- Website: https://nazar.studio
- Note: This is an ultra-premium flagship demo website created for pitch and portfolio demonstration purposes. All client names and imagery are fictional or AI-generated demo assets.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
