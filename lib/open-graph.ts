import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

export const openGraphImages: NonNullable<Metadata['openGraph']>['images'] = [
  {
    url: siteConfig.openGraph.image,
    width: siteConfig.openGraph.width,
    height: siteConfig.openGraph.height,
    alt: siteConfig.openGraph.imageAlt,
  },
];

export const twitterImages = {
  card: 'summary_large_image' as const,
  images: [siteConfig.openGraph.image],
};
