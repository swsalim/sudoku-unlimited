import type { MetadataRoute } from 'next';

import { Difficulty } from '@/types';

import { getStaticDailyDates, getTodayDailyIso } from '@/lib/daily/puzzle-store';
import { GUIDE_PUBLICATION_DATE, guideRegistry, guideSlugs } from '@/lib/guides/registry';
import { absoluteUrl } from '@/lib/utils';

const CLASSIC_DIFFICULTIES = [
  Difficulty.EASY,
  Difficulty.MEDIUM,
  Difficulty.HARD,
  Difficulty.EXPERT,
  Difficulty.MASTER,
  Difficulty.EXTREME,
] as const;

const PRINTABLE_DIFFICULTIES = [
  Difficulty.EASY,
  Difficulty.MEDIUM,
  Difficulty.HARD,
  Difficulty.EXPERT,
] as const;

const KIDS_SIZES = ['4x4', '6x6'] as const;

const DEFAULT_PRIORITY = 0.7;

function entry(
  path: string,
  options?: {
    lastModified?: string | Date;
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: options?.lastModified ?? new Date(),
    changeFrequency: options?.changeFrequency ?? 'daily',
    priority: DEFAULT_PRIORITY,
  };
}

/**
 * Keep one data source from taking down `/sitemap.xml`.
 * A failure while listing guides or daily URLs drops that section and still returns the rest.
 */
export function safeSitemapEntries(
  source: string,
  load: () => MetadataRoute.Sitemap,
): MetadataRoute.Sitemap {
  try {
    return load();
  } catch (error) {
    console.error(`[sitemap] failed to build ${source} entries`, error);
    return [];
  }
}

/** Published daily puzzle, archive, and month URLs (evaluated at request time). */
export function getDailySitemapEntries(): MetadataRoute.Sitemap {
  const publishedDailyDates = getStaticDailyDates();
  const today = getTodayDailyIso();
  const entries: MetadataRoute.Sitemap = [entry('/daily'), entry('/daily/archive')];

  const monthKeys = new Set(publishedDailyDates.map((d) => d.slice(0, 7)));
  for (const ym of monthKeys) {
    const [y, m] = ym.split('-');
    entries.push(
      entry(`/daily/${y}/${m}`, {
        lastModified: `${today}T00:00:00.000Z`,
      }),
    );
  }

  for (const iso of publishedDailyDates) {
    entries.push(
      entry(`/daily/${iso}`, {
        lastModified: `${iso}T00:00:00.000Z`,
        changeFrequency: 'never',
      }),
    );
  }

  return entries;
}

/**
 * Guide URLs come from the in-memory registry (slug + dateModified).
 * Do not read `content/guides` here: those files are not traced into the
 * dynamic sitemap function, and a missing file 500s the whole response.
 */
export function getGuideSitemapEntries(): MetadataRoute.Sitemap {
  return guideSlugs.map((slug) =>
    entry(`/guides/${slug}`, {
      lastModified: guideRegistry[slug]?.dateModified ?? GUIDE_PUBLICATION_DATE,
    }),
  );
}

/** Static marketing and play routes (no filesystem or archive access). */
export function getCoreSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    entry('/'),
    entry('/about'),
    entry('/guides'),
    entry('/kids-sudoku'),
    entry('/killer-sudoku'),
    entry('/printable'),
    entry('/sudoku-solver'),
  ];

  for (const difficulty of CLASSIC_DIFFICULTIES) {
    entries.push(entry(`/${difficulty.toLowerCase()}`));
  }

  for (const difficulty of CLASSIC_DIFFICULTIES) {
    entries.push(entry(`/killer-sudoku/${difficulty.toLowerCase()}`));
  }

  for (const difficulty of PRINTABLE_DIFFICULTIES) {
    entries.push(entry(`/printable/${difficulty.toLowerCase()}`));
  }

  for (const size of KIDS_SIZES) {
    entries.push(entry(`/kids-sudoku/${size}`));
  }

  return entries;
}

/** Static site routes plus guides; daily URLs come from {@link getDailySitemapEntries}. */
export function getStaticSitemapEntries(): MetadataRoute.Sitemap {
  return [...getCoreSitemapEntries(), ...getGuideSitemapEntries()];
}

export function getFullSitemapEntries(): MetadataRoute.Sitemap {
  return [
    ...safeSitemapEntries('static pages', getCoreSitemapEntries),
    ...safeSitemapEntries('guides', getGuideSitemapEntries),
    ...safeSitemapEntries('daily', getDailySitemapEntries),
  ];
}
