export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How far in advance should we book?',
    answer:
      'Ideally 9–12 months in advance for peak wedding season (October to March), and 6 months for summer or monsoon dates. Because we deliberately limit our work to approximately 40 weddings a year, dates reserve quickly.',
  },
  {
    id: 'faq-2',
    question: 'Do you travel across India and internationally?',
    answer:
      'Yes, continually. From Udaipur and Kerala to Bali, Lake Como, and Dubai. Domestic travel is inclusive in the Mahakatha package; for Katha and Kahani, exact travel and logistics are itemized transparently with zero markup.',
  },
  {
    id: 'faq-3',
    question: 'Will you direct us or let us be during the wedding?',
    answer:
      'Mostly, we let you be. We believe weddings are not fashion shoots; they are real, unrepeatable life events. We only gently guide you when evening light, veil placement, or family positioning benefits from a subtle whisper.',
  },
  {
    id: 'faq-4',
    question: 'Do you shoot film or digital?',
    answer:
      'Both. We shoot a hybrid workflow: high-end cinema digital cameras paired with vintage Leica and Zeiss prime lenses, alongside 35mm and medium-format analog film rolls for key portraits and moments.',
  },
  {
    id: 'faq-5',
    question: 'Can we choose the music for our film?',
    answer:
      'We curate the score collaboratively. We listen to the artists and classical ragas you love, then license bespoke music from indie composers and sound libraries so your film can be shared worldwide without copyright issues.',
  },
  {
    id: 'faq-6',
    question: 'How long is the delivery timeframe?',
    answer:
      'Teaser frames and vertical edits arrive within 48 hours for Katha and Mahakatha. Full curated photo galleries are delivered within 4 weeks. Master cinematic films are color-graded and delivered in 8–10 weeks.',
  },
  {
    id: 'faq-7',
    question: 'Do you cover all traditions, rituals, and regional customs?',
    answer:
      'Yes. Over 11 years we have documented Hindu, Sikh Anand Karaj, Muslim Nikah, Christian, Parsi, and cross-cultural fusion celebrations. We thoroughly study your timeline and speak with elders beforehand.',
  },
  {
    id: 'faq-8',
    question: 'How do payments and reservations work?',
    answer:
      'A 30% retainer reserves your date on our calendar upon contract signing. 40% is due 30 days prior to the first event, and the remaining 30% is due upon final delivery of your high-resolution film and gallery.',
  },
];
