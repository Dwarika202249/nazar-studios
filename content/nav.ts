export interface NavItem {
  label: string;
  href: string;
  hindi?: string;
  index: string;
  previewImage?: string;
}

export const navItems: NavItem[] = [
  {
    label: 'Stories',
    href: '/stories',
    hindi: 'कहानियाँ',
    index: '01',
    previewImage: '/images/stories/anaya-rohan/cover.webp',
  },
  {
    label: 'Films',
    href: '/films',
    hindi: 'फ़िल्में',
    index: '02',
    previewImage: '/images/films/showreel-poster.webp',
  },
  {
    label: 'About',
    href: '/about',
    hindi: 'हमारे बारे में',
    index: '03',
    previewImage: '/images/about/aarav-mehra.webp',
  },
  {
    label: 'Investment',
    href: '/investment',
    hindi: 'निवेश',
    index: '04',
    previewImage: '/images/details/rings.webp',
  },
  {
    label: 'Enquire',
    href: '/enquire',
    hindi: 'संपर्क',
    index: '05',
    previewImage: '/images/stories/zoya-imran/cover.webp',
  },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/nazar.studio' },
  { label: 'Vimeo', href: 'https://vimeo.com/nazarstudio' },
  { label: 'YouTube', href: 'https://youtube.com/@nazarstudio' },
  { label: 'WhatsApp', href: 'https://wa.me/919829000000' },
];
