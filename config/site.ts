import { SiteConfig } from '@/types';

import { absoluteUrl } from '@/lib/utils';

export const siteConfig: SiteConfig = {
  title: 'RGB to Pantone Converter',
  description:
    'Get instant, accurate Pantone matches for your RGB colors. Perfect for designers, printers & creative professionals who need reliable color conversions.',
  siteName: 'RGB Pantone',
  url: new URL(absoluteUrl()),
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Banner for rgbtopantone.com',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
};
