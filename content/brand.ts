export interface Founder {
  name: string;
  role: string;
  bio: string;
  portrait: string;
}

export interface Rule {
  number: string;
  title: string;
  desc: string;
}

export interface Stat {
  value: number | string;
  suffix?: string;
  label: string;
}

export interface BrandConfig {
  name: string;
  hindi: string;
  tagline: [string, string];
  hindiTagline: string;
  descriptor: string;
  city: string;
  country: string;
  timezone: string;
  bookingStatus: string;
  established: number;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    instagram: string;
    youtube: string;
    vimeo: string;
  };
  seo: {
    title: string;
    description: string;
  };
  manifesto: string;
  threeRules: Rule[];
  craftNote: string;
  stats: Stat[];
  founders: Founder[];
  team: { name: string; role: string }[];
  features: {
    preloader: boolean;
    sound: boolean;
    webgl: boolean;
    journal: boolean;
    films: boolean;
    dateCheck: boolean;
  };
  demo: boolean;
}

export const brand: BrandConfig = {
  name: 'NAZAR',
  hindi: 'नज़र',
  tagline: ['Seen by the heart.', 'Kept forever.'],
  hindiTagline: 'जो दिल ने देखा, वो हमेशा रहा।',
  descriptor: 'Wedding Films & Photography',
  city: 'Jaipur',
  country: 'Worldwide',
  timezone: 'Asia/Kolkata',
  bookingStatus: 'Now booking 2027–28',
  established: 2015,
  contact: {
    email: 'hello@nazar.studio',
    phone: '+91 98290 00000',
    whatsapp: 'https://wa.me/919829000000',
    instagram: 'https://instagram.com/nazar.studio',
    youtube: 'https://youtube.com/@nazarstudio',
    vimeo: 'https://vimeo.com/nazarstudio',
  },
  seo: {
    title: 'NAZAR — Luxury Wedding Films & Photography | Jaipur & Worldwide (Demo)',
    description:
      'Cinematic, candid wedding photography and films by NAZAR. Director-led storytelling across India and destination weddings. (Demo studio.)',
  },
  manifesto:
    "Weddings are the last place where real cinema still happens. Once. No retakes. A father's hands shaking as he ties the last knot, the silence before the pheras, a grandmother laughing in the wrong direction at exactly the right time. We don't stage that. We wait for it. And then we finish it like a film, so you can feel it again in twenty years.",
  threeRules: [
    {
      number: '01',
      title: 'Be present, not everywhere.',
      desc: "We're the calm in the room.",
    },
    {
      number: '02',
      title: 'Direct less, notice more.',
      desc: 'Light, gesture, silence.',
    },
    {
      number: '03',
      title: 'Finish like a film.',
      desc: 'Every wedding is graded, scored and edited as a story.',
    },
  ],
  craftNote: 'Hybrid film + digital. Prime lenses. Flash after dark. Natural light before it.',
  stats: [
    { value: 11, label: 'years of stories' },
    { value: '480+', label: 'weddings documented' },
    { value: 14, label: 'countries' },
    { value: '1,200+', label: 'hours of film delivered' },
  ],
  founders: [
    {
      name: 'Aarav Mehra',
      role: 'Director & Cinematographer',
      bio: 'Aarav directs and shoots the films. A documentary filmmaker turned wedding director who treats every celebration as an unrepeatable cinema moment.',
      portrait: '/images/about/aarav-mehra.webp',
    },
    {
      name: 'Ishita Rao',
      role: 'Lead Photographer',
      bio: 'Ishita leads still photography, specializing in natural light, gestures, and the intimate quiet in between rituals.',
      portrait: '/images/about/ishita-rao.webp',
    },
  ],
  team: [
    { name: 'Aarav Mehra', role: 'Director & Cinematographer' },
    { name: 'Ishita Rao', role: 'Lead Photographer' },
    { name: 'Kabir Sethi', role: 'Editor & Colourist' },
    { name: 'Naina Joshi', role: 'Producer' },
  ],
  features: {
    preloader: true,
    sound: true,
    webgl: true,
    journal: false,
    films: true,
    dateCheck: true,
  },
  demo: true, // Discloses demo AI imagery & prevents external production indexing
};
