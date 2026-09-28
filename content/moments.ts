export interface Moment {
  id: string;
  index: string;
  title: string;
  hindi: string;
  oneLiner: string;
  description: string;
  image: string;
  alt: string;
}

export const moments: Moment[] = [
  {
    id: 'haldi',
    index: '01',
    title: 'Haldi',
    hindi: 'हल्दी',
    oneLiner: 'Turmeric, laughter, cousins with no mercy.',
    description:
      'Yellow paste flying through midday sunlight, cold water buckets, and laughter that echoes across the courtyard.',
    image: '/images/moments/haldi.webp',
    alt: 'Cousins splashing turmeric water in joyful morning sun',
  },
  {
    id: 'mehendi',
    index: '02',
    title: 'Mehendi',
    hindi: 'मेहंदी',
    oneLiner: 'Quiet hands. Loud gossip.',
    description:
      'Intricate henna cones drawing leaves and stories on palms while aunts trade secrets and chai turns cold.',
    image: '/images/moments/mehendi.webp',
    alt: 'Bride hands being adorned with intricate dark henna',
  },
  {
    id: 'sangeet',
    index: '03',
    title: 'Sangeet',
    hindi: 'संगीत',
    oneLiner: 'Where the family becomes a dance floor.',
    description:
      'Rehearsed choreographies dissolving into midnight mayhem under blinding direct flash and thunderous dhol rhythms.',
    image: '/images/moments/sangeet.webp',
    alt: 'Couple dancing energetically surrounded by cheering family',
  },
  {
    id: 'baraat',
    index: '04',
    title: 'Baraat',
    hindi: 'बरात',
    oneLiner: 'The street belongs to him for one hour.',
    description:
      'Smoke flares, brass bands, and friends hoisting the groom high into the evening air before the gates open.',
    image: '/images/moments/baraat.webp',
    alt: 'Groom on vintage car surrounded by celebrating friends and red flares',
  },
  {
    id: 'pheras',
    index: '05',
    title: 'Pheras',
    hindi: 'फेरे',
    oneLiner: 'Seven promises. One held breath.',
    description:
      'The sacred fire casting embers onto gold zari, Sanskrit chants quieting the thousand guests, and two lives binding forever.',
    image: '/images/moments/pheras.webp',
    alt: 'Sacred fire embers illuminating couple hands tied together',
  },
  {
    id: 'vidaai',
    index: '06',
    title: 'Vidaai',
    hindi: 'विदाई',
    oneLiner: 'The hardest, softest goodbye.',
    description:
      'Hands throwing rice over the head, a father’s wet shoulder, and the quiet dignity of a door closing into a new dawn.',
    image: '/images/moments/vidaai.webp',
    alt: 'Emotional hug between father and bride at dawn',
  },
  {
    id: 'reception',
    index: '07',
    title: 'Reception',
    hindi: 'रिसेप्शन',
    oneLiner: 'Candles down. Music up.',
    description:
      'Velvet dinner jackets, clinking champagne flutes, quiet whispered glances across the room, and an embrace on the dark lawn.',
    image: '/images/moments/reception.webp',
    alt: 'Candlelit long tables with couple sharing a quiet private toast',
  },
];
