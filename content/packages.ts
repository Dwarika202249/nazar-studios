export interface PackageItem {
  id: string;
  name: string;
  hindi: string;
  tagline: string;
  price: string;
  priceNumeric: number;
  highlighted?: boolean;
  coverage: string;
  team: string;
  deliverables: string[];
}

export interface AddOn {
  name: string;
  desc: string;
  price: string;
}

export const packages: PackageItem[] = [
  {
    id: 'kahani',
    name: 'Kahani',
    hindi: 'कहानी',
    tagline: 'The intimate, focused documentation of your core day.',
    price: '₹85,000',
    priceNumeric: 85000,
    coverage: 'Up to 8 hours coverage',
    team: '1 Lead Photographer',
    deliverables: [
      '350+ hand-graded high-resolution photographs',
      '3-minute cinematic highlight film',
      'Private online gallery with full download access',
      '4-week delivery guarantee',
      'Full printing rights',
    ],
  },
  {
    id: 'katha',
    name: 'Katha',
    hindi: 'कथा',
    tagline: 'The complete cinematic & photographic saga. Our most chosen experience.',
    price: '₹1,85,000',
    priceNumeric: 185000,
    highlighted: true,
    coverage: 'Up to 2 days coverage (Mehendi / Sangeet + Pheras)',
    team: 'Lead Photographer + Director of Cinematography + Assistant',
    deliverables: [
      '700+ hand-graded photographs',
      '8-minute cinematic wedding film (4K)',
      'Same-day teaser for family & social',
      'Licensed aerial drone coverage',
      '1 Bespoke linen fine-art album (12x12, 40 pages)',
      'Delivered in custom walnut archival box',
    ],
  },
  {
    id: 'mahakatha',
    name: 'Mahakatha',
    hindi: 'महाकथा',
    tagline: 'The multi-day grand celebration documented without compromise.',
    price: 'From ₹4,50,000',
    priceNumeric: 450000,
    coverage: 'Multi-day, multi-event destination coverage',
    team: 'Full director-led crew of 5 (2 Cinema, 2 Stills, 1 Audio/Drone)',
    deliverables: [
      '1,500+ curated and finished master photographs',
      'Full feature film (15–20 minutes) scored & color-graded',
      'Director’s cut teaser + vertical reels package',
      '2 Fine-art luxury albums + 2 parent gift albums',
      'Full raw archive on encrypted hard drive',
      'Domestic travel & stay included across India',
    ],
  },
];

export const addOns: AddOn[] = [
  {
    name: 'Pre-Wedding Story Session',
    desc: 'Half-day relaxed shoot in Jaipur or location of choice with vintage 35mm film.',
    price: '₹35,000',
  },
  {
    name: 'Same-Day Edit Film',
    desc: 'A 2-minute film edited on-site and screened live at the reception.',
    price: '₹40,000',
  },
  {
    name: 'Parent Gift Albums (Set of 2)',
    desc: 'Matching 8x8 linen hardcover replicas of your main wedding album.',
    price: '₹25,000',
  },
  {
    name: 'Super 8mm Vintage Film Roll',
    desc: 'Authentic Kodak Super 8 film footage digitized with grain and organic drift.',
    price: '₹30,000',
  },
];
