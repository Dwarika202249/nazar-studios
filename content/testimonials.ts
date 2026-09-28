export interface Testimonial {
  id: string;
  quote: string;
  couple: string;
  location: string;
  tradition: string;
  image: string;
  signatureSvgPath?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'anaya-rohan',
    quote:
      'We forgot they were there. Then we watched the film and cried in the first minute. Every frame feels like a memory we can actually hold.',
    couple: 'Anaya & Rohan',
    location: 'Lakeside Palace, Udaipur',
    tradition: 'Rajasthani Royal',
    image: '/images/stories/anaya-rohan/thumb.webp',
  },
  {
    id: 'simran-jaspreet',
    quote:
      "Our sangeet was chaos. Nazar turned it into a movie I'd pay to watch again in a theatre. The energy, the flash, the raw joy—it's all there.",
    couple: 'Simran & Jaspreet',
    location: 'Farmhouse, Delhi-NCR',
    tradition: 'Sikh Anand Karaj & Big Sangeet',
    image: '/images/stories/simran-jaspreet/thumb.webp',
  },
  {
    id: 'lakshmi-arvind',
    quote:
      'They understood every ritual before we explained it. When it rained during the muhurtham, they did not flinch; they made it look poetic.',
    couple: 'Lakshmi & Arvind',
    location: 'Backwater Resort, Kerala',
    tradition: 'Kerala Hindu',
    image: '/images/stories/lakshmi-arvind/thumb.webp',
  },
  {
    id: 'zoya-imran',
    quote:
      'The candlelit nikah looks exactly like it felt. Impossible to describe, easy to feel. Aarav and Ishita are magicians with natural light.',
    couple: 'Zoya & Imran',
    location: 'Old-City Haveli, Lucknow',
    tradition: 'Muslim Nikah',
    image: '/images/stories/zoya-imran/thumb.webp',
  },
  {
    id: 'riya-daniel',
    quote:
      'Two cultures, one beach, zero awkward posing. Best decision of the whole wedding. Our families from Mumbai and London still talk about the film.',
    couple: 'Riya & Daniel',
    location: 'North Goa',
    tradition: 'Hindu–Christian Fusion',
    image: '/images/stories/riya-daniel/thumb.webp',
  },
  {
    id: 'tara-vihaan',
    quote:
      'Forty guests, one fire, and the most honest photographs we own. In the mountain fog, they captured the quiet breath of our vows.',
    couple: 'Tara & Vihaan',
    location: 'Uttarakhand Himalayas',
    tradition: 'Intimate Forest Elopement',
    image: '/images/stories/tara-vihaan/thumb.webp',
  },
];
