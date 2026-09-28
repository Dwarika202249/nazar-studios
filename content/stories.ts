export type Category = 'Palace' | 'Beach' | 'Forest' | 'Haveli' | 'Fusion';

export interface Img {
  src: string;
  alt: string;
  w: number;
  h: number;
  focal?: [number, number];
  blurDataURL?: string;
}

export interface Chapter {
  key: string;
  title: string;
  hindi: string;
  tint: string;
  lead: Img;
  images: Img[];
  caption: string;
}

export interface Story {
  slug: string;
  couple: string;
  city: string;
  venue: string;
  date: string;
  tradition: string;
  category: Category;
  cover: Img;
  intro: string;
  accent: string;
  chapters: Chapter[];
  quote: { text: string; by: string };
  film?: { poster: Img; src: string; runtime: string };
  credits: { role: string; name: string }[];
}

export const stories: Story[] = [
  {
    slug: 'anaya-rohan',
    couple: 'Anaya & Rohan',
    city: 'Udaipur, Rajasthan',
    venue: 'Lakeside Palace',
    date: 'February 2026',
    tradition: 'Rajasthani Royal',
    category: 'Palace',
    accent: '#C9A46A',
    cover: {
      src: '/images/stories/anaya-rohan/cover.webp',
      alt: 'Anaya & Rohan standing on a lakeside marble courtyard at dusk',
      w: 1600,
      h: 2000,
    },
    intro:
      'A marble courtyard at dusk, three hundred oil lamps, and a bride who walked slower than the music.',
    quote: {
      text: 'We forgot they were there. Then we watched the film and cried in the first minute.',
      by: 'Anaya & Rohan',
    },
    film: {
      poster: {
        src: '/images/stories/anaya-rohan/film-poster.webp',
        alt: 'Anaya & Rohan feature film poster',
        w: 1920,
        h: 1080,
      },
      src: '/video/anaya-rohan-trailer.mp4',
      runtime: '12:40',
    },
    credits: [
      { role: 'Planner', name: 'Ivory & Ember Events' },
      { role: 'Florals', name: 'Marigold Society' },
      { role: 'Makeup', name: 'Studio Sindh' },
      { role: 'Film & Photo', name: 'Team NAZAR' },
    ],
    chapters: [
      {
        key: 'haldi',
        title: 'The Yellow Garden',
        hindi: 'हल्दी',
        tint: '#1C150A',
        lead: {
          src: '/images/stories/anaya-rohan/haldi-lead.webp',
          alt: 'Turmeric splashing in sunlight amidst cousins laughing',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/anaya-rohan/haldi-01.webp',
            alt: 'Bride laughing with turmeric on cheeks',
            w: 1200,
            h: 1600,
          },
          {
            src: '/images/stories/anaya-rohan/haldi-02.webp',
            alt: 'Hands dripping in marigold paste',
            w: 1200,
            h: 800,
          },
        ],
        caption: 'Turmeric, laughter, cousins with no mercy.',
      },
      {
        key: 'pheras',
        title: 'The Seven Vows',
        hindi: 'फेरे',
        tint: '#1A0C08',
        lead: {
          src: '/images/stories/anaya-rohan/pheras-lead.webp',
          alt: 'Couple holding hands around sacred fire',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/anaya-rohan/pheras-01.webp',
            alt: 'Sacred fire glow reflecting in bride eyes',
            w: 1200,
            h: 800,
          },
          {
            src: '/images/stories/anaya-rohan/pheras-02.webp',
            alt: 'Father tying the knot',
            w: 1200,
            h: 1600,
          },
        ],
        caption: 'Seven promises. One held breath.',
      },
      {
        key: 'vidaai',
        title: 'The Departure',
        hindi: 'विदाई',
        tint: '#0C0A10',
        lead: {
          src: '/images/stories/anaya-rohan/vidaai-lead.webp',
          alt: 'Tearful embrace between mother and daughter',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/anaya-rohan/vidaai-01.webp',
            alt: 'Car door closing under night lanterns',
            w: 1200,
            h: 800,
          },
        ],
        caption: 'The hardest, softest goodbye.',
      },
    ],
  },
  {
    slug: 'simran-jaspreet',
    couple: 'Simran & Jaspreet',
    city: 'Delhi-NCR',
    venue: 'Heritage Farmhouse',
    date: 'December 2025',
    tradition: 'Sikh Anand Karaj & Big Sangeet',
    category: 'Fusion',
    accent: '#B3261E',
    cover: {
      src: '/images/stories/simran-jaspreet/cover.webp',
      alt: 'Simran & Jaspreet laughing under fairy lights',
      w: 1600,
      h: 2000,
    },
    intro:
      'Four days, one dhol player who never slept, and a father who danced for the first time in ten years.',
    quote: {
      text: "Our sangeet was chaos. Nazar turned it into a movie I'd pay to watch again.",
      by: 'Simran & Jaspreet',
    },
    film: {
      poster: {
        src: '/images/stories/simran-jaspreet/film-poster.webp',
        alt: 'Simran & Jaspreet sangeet trailer poster',
        w: 1920,
        h: 1080,
      },
      src: '/video/simran-jaspreet-trailer.mp4',
      runtime: '2:15',
    },
    credits: [
      { role: 'Planner', name: 'Shaadi Soul Co.' },
      { role: 'Dhol & Music', name: 'Bulleya Collective' },
      { role: 'Makeup', name: 'Glamour House' },
      { role: 'Film & Photo', name: 'Team NAZAR' },
    ],
    chapters: [
      {
        key: 'sangeet',
        title: 'The Electric Night',
        hindi: 'संगीत',
        tint: '#22080D',
        lead: {
          src: '/images/stories/simran-jaspreet/sangeet-lead.webp',
          alt: 'Direct flash shot of family dancing furiously',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/simran-jaspreet/sangeet-01.webp',
            alt: 'Groom carried on shoulders',
            w: 1200,
            h: 800,
          },
        ],
        caption: 'Where the family becomes a dance floor.',
      },
      {
        key: 'anand-karaj',
        title: 'Sacred Silence',
        hindi: 'आनंद कारज',
        tint: '#14110E',
        lead: {
          src: '/images/stories/simran-jaspreet/ceremony-lead.webp',
          alt: 'Morning sunlight streaming through the Gurdwara windows',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/simran-jaspreet/ceremony-01.webp',
            alt: 'Couple bowing together in devotion',
            w: 1200,
            h: 1600,
          },
        ],
        caption: 'The quiet before the world woke up.',
      },
    ],
  },
  {
    slug: 'lakshmi-arvind',
    couple: 'Lakshmi & Arvind',
    city: 'Kumarakom, Kerala',
    venue: 'Backwater Resort',
    date: 'August 2025',
    tradition: 'Kerala Hindu',
    category: 'Forest',
    accent: '#16211B',
    cover: {
      src: '/images/stories/lakshmi-arvind/cover.webp',
      alt: 'Lakshmi in gold kasavu saree and Arvind in traditional mundu by Kerala backwaters',
      w: 1600,
      h: 2000,
    },
    intro: 'It rained during the muhurtham. Everyone stayed. Nobody minded.',
    quote: {
      text: 'They understood every ritual before we explained it. Nothing felt staged.',
      by: 'Lakshmi & Arvind',
    },
    credits: [
      { role: 'Planner', name: 'Backwater Weddings' },
      { role: 'Florals', name: 'Mogra & Greens' },
      { role: 'Film & Photo', name: 'Team NAZAR' },
    ],
    chapters: [
      {
        key: 'muhurtham',
        title: 'Rain on Lotus',
        hindi: 'मुहूर्तम',
        tint: '#0C1611',
        lead: {
          src: '/images/stories/lakshmi-arvind/lead.webp',
          alt: 'Gentle raindrops falling around the temple mandap',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/lakshmi-arvind/rain-01.webp',
            alt: 'Banana leaf feast setup in rain',
            w: 1200,
            h: 800,
          },
        ],
        caption: 'Rain on the mandap. Jasmine in the hair.',
      },
    ],
  },
  {
    slug: 'zoya-imran',
    couple: 'Zoya & Imran',
    city: 'Lucknow, Uttar Pradesh',
    venue: 'Old-City Haveli',
    date: 'November 2025',
    tradition: 'Muslim Nikah',
    category: 'Haveli',
    accent: '#2A0C14',
    cover: {
      src: '/images/stories/zoya-imran/cover.webp',
      alt: 'Zoya & Imran seated in a candlelit haveli courtyard',
      w: 1600,
      h: 2000,
    },
    intro: "Candles in every arch, and a hush that fell just before 'qubool hai'.",
    quote: {
      text: 'The candlelit nikah looks exactly like it felt. Impossible to describe, easy to feel.',
      by: 'Zoya & Imran',
    },
    credits: [
      { role: 'Planner', name: 'Nawabi Stories' },
      { role: 'Decor', name: 'Velvet & Rose' },
      { role: 'Film & Photo', name: 'Team NAZAR' },
    ],
    chapters: [
      {
        key: 'nikah',
        title: 'Candlelit Arches',
        hindi: 'निकाह',
        tint: '#1C0A10',
        lead: {
          src: '/images/stories/zoya-imran/nikah-lead.webp',
          alt: 'Zoya behind the sheer floral curtain',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/zoya-imran/nikah-01.webp',
            alt: 'Signing the nikahnama in soft candlelight',
            w: 1200,
            h: 800,
          },
        ],
        caption: 'Three words that reshape a life.',
      },
    ],
  },
  {
    slug: 'riya-daniel',
    couple: 'Riya & Daniel',
    city: 'North Goa',
    venue: 'Beach & Church Courtyard',
    date: 'March 2026',
    tradition: 'Hindu–Christian Fusion',
    category: 'Beach',
    accent: '#E8CB93',
    cover: {
      src: '/images/stories/riya-daniel/cover.webp',
      alt: 'Riya & Daniel walking along the Arabian Sea shore at golden sunset',
      w: 1600,
      h: 2000,
    },
    intro: 'Two families, two rituals, one sunset that refused to end.',
    quote: {
      text: 'Two cultures, one beach, zero awkward posing. Best decision of the whole wedding.',
      by: 'Riya & Daniel',
    },
    credits: [
      { role: 'Planner', name: 'Goa Coastal Affairs' },
      { role: 'Sound & Music', name: 'Sunset Acoustics' },
      { role: 'Film & Photo', name: 'Team NAZAR' },
    ],
    chapters: [
      {
        key: 'sunset-vows',
        title: 'The Golden Tide',
        hindi: 'सांझ',
        tint: '#16130B',
        lead: {
          src: '/images/stories/riya-daniel/vows-lead.webp',
          alt: 'Exchanging rings against ocean spray and orange sky',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/riya-daniel/beach-01.webp',
            alt: 'Barefoot on sand dancing at twilight',
            w: 1200,
            h: 800,
          },
        ],
        caption: 'Where two currents become one river.',
      },
    ],
  },
  {
    slug: 'tara-vihaan',
    couple: 'Tara & Vihaan',
    city: 'Uttarakhand',
    venue: 'Himalayan Forest Lodge',
    date: 'October 2025',
    tradition: 'Intimate Forest Elopement',
    category: 'Forest',
    accent: '#2D3A30',
    cover: {
      src: '/images/stories/tara-vihaan/cover.webp',
      alt: 'Tara & Vihaan standing in pine fog with mountain silhouettes',
      w: 1600,
      h: 2000,
    },
    intro: 'Forty people, one bonfire, and vows spoken in breath you could see.',
    quote: {
      text: 'Forty guests, one fire, and the most honest photographs we own.',
      by: 'Tara & Vihaan',
    },
    film: {
      poster: {
        src: '/images/stories/tara-vihaan/film-poster.webp',
        alt: 'Forty Breaths film poster',
        w: 1920,
        h: 1080,
      },
      src: '/video/tara-vihaan-film.mp4',
      runtime: '6:05',
    },
    credits: [
      { role: 'Lodge', name: 'Pine & Peak Retreat' },
      { role: 'Acoustics', name: 'Fireside Strings' },
      { role: 'Film & Photo', name: 'Team NAZAR' },
    ],
    chapters: [
      {
        key: 'bonfire',
        title: 'Forty Breaths',
        hindi: 'अग्नि',
        tint: '#111814',
        lead: {
          src: '/images/stories/tara-vihaan/bonfire-lead.webp',
          alt: 'Guests wrapped in pashmina shawls around mountain bonfire',
          w: 1600,
          h: 2000,
        },
        images: [
          {
            src: '/images/stories/tara-vihaan/bonfire-01.webp',
            alt: 'Couple laughing in chilly pine air',
            w: 1200,
            h: 800,
          },
        ],
        caption: 'Forty people, one fire, zero pretense.',
      },
    ],
  },
];
