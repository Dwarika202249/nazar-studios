export interface Film {
  id: string;
  title: string;
  couple: string;
  location: string;
  runtime: string;
  category: 'Feature' | 'Trailer' | 'Teaser' | 'Showreel';
  poster: string;
  src: string;
  description: string;
}

export const films: Film[] = [
  {
    id: 'showreel-2026',
    title: 'NAZAR Showreel 2026',
    couple: 'Flagship Showcase',
    location: 'Jaipur · Udaipur · Kerala · Goa',
    runtime: '3:12',
    category: 'Showreel',
    poster: '/images/films/showreel-poster.webp',
    src: '/video/showreel.mp4',
    description:
      'A compilation of raw tears, breathless laughter, and golden dust across 14 countries.',
  },
  {
    id: 'anaya-rohan-feature',
    title: 'The Palace at Dusk',
    couple: 'Anaya & Rohan',
    location: 'Lakeside Palace, Udaipur',
    runtime: '12:40',
    category: 'Feature',
    poster: '/images/films/anaya-rohan-poster.webp',
    src: '/video/anaya-rohan.mp4',
    description:
      'Three hundred oil lamps, marble archways, and a bride who walked slower than the music.',
  },
  {
    id: 'simran-jaspreet-trailer',
    title: 'The Electric Sangeet',
    couple: 'Simran & Jaspreet',
    location: 'Delhi-NCR',
    runtime: '2:15',
    category: 'Trailer',
    poster: '/images/films/simran-jaspreet-poster.webp',
    src: '/video/simran-jaspreet.mp4',
    description:
      'Four days, direct flash, and a father who danced for the first time in ten years.',
  },
  {
    id: 'tara-vihaan-breaths',
    title: 'Forty Breaths',
    couple: 'Tara & Vihaan',
    location: 'Uttarakhand Himalayas',
    runtime: '6:05',
    category: 'Feature',
    poster: '/images/films/tara-vihaan-poster.webp',
    src: '/video/tara-vihaan.mp4',
    description:
      'Forty guests, one bonfire, and vows spoken in chilly pine air that you could see.',
  },
];
