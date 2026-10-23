import type { MetadataRoute } from 'next';

import { getFullSitemapEntries } from '@/lib/sitemap/entries';

/** Recompute daily puzzle URLs on each request so new UTC days appear without redeploying. */
export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  return getFullSitemapEntries();
}
