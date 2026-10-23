import type { MetadataRoute } from 'next';

import { getFullSitemapEntries } from '@/lib/sitemap/entries';

/**
 * Recompute daily puzzle URLs on each request so the current UTC day appears
 * without redeploying. Guide URLs are taken from the registry module, not disk.
 */
export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  return getFullSitemapEntries();
}
