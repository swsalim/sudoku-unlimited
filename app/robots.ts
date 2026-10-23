import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/*.json$',
        '/*_buildManifest.js$',
        '/*_middlewareManifest.js$',
        '/*_ssgManifest.js$',
      ],
    },
    host: absoluteUrl(),
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
